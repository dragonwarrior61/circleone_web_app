import Picker from "@emoji-mart/react";
import EmojiEmoticonsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import Prism from "prismjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  createEditor,
  Editor,
  Node,
  Range,
  Element as SlateElement,
  Text,
  Transforms,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";

import { Button, Icon, Toolbar } from "./components";
import ImagesPreview from "./ImagesPreview/ImagesPreview";
import "./textEditor.scss";
import { uploadFilesRequest } from "./uploadImages";
import { toast } from "react-toastify";
import { dmHistoryState, messageState, sentMessageState } from "../../../../../atom";
import DragDropFiles from "../../../../../components/modals/fileUpload/fileUpload";

export const hasFewerThan10Emojis = (text) => {
  const emojiRegex = /\p{Emoji}/gu;
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[~`!@#$%^&*()_\-+={}\\[\]|\\:;"'<>,.?\\/]/;
  const whitespaceRegex = /^\s*$/;
  const emojis = text.match(emojiRegex) || [];
  const emojiCount = emojis.length;

  const containsForbiddenCharacters =
    letterRegex.test(text) ||
    numberRegex.test(text) ||
    specialCharRegex.test(text) ||
    whitespaceRegex.test(text);

  return emojiCount < 10 && !containsForbiddenCharacters;
}

Prism.languages.insertBefore("markdown", "prolog", {
  url: {
    pattern: /(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?/i,
    lookbehind: true,
    inside: {
      url: /^https?:\/\//i,
    },
  },
  "code-block": {
    pattern: /```[\s\S]*?```/,
    lookbehind: true,
    inside: {
      punctuation: /^```|```$/,
    },
  },
  code: {
    pattern: /``.+?``|`[^`\n]+`/,
    lookbehind: true,
    inside: {
      punctuation: /^`|`$/,
    },
  },
  underline: {
    pattern: /(^|[^\\])__(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?__/,
    lookbehind: true,
    inside: {
      punctuation: /^__|__$/,
    },
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: true,
    inside: {
      punctuation: /^\*\*|^__|\*\*$|__$/,
    },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: true,
    inside: {
      punctuation: /^[*_]|[*_]$/,
    },
  },
  strikethrough: {
    pattern: /(^|[^\\])(~~)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: true,
    inside: {
      punctuation: /^~~|~~$/,
    },
  },
});

["bold", "italic", "underline", "strikethrough"].forEach(function (style) {
  if (Prism.languages.markdown[style]) {
    Prism.languages.markdown[style].inside.url = Prism.util.clone(
      Prism.languages.markdown.url,
    );
  }
});
if (Prism.languages.markdown["code-block"]) {
  Prism.languages.markdown["code-block"].inside.url = Prism.util.clone(
    Prism.languages.markdown.url,
  );
}

const LIST_TYPES = ["numbered-list", "bulleted-list", "code-block"];

const TextEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);
  const [, setLastSentMessage] = useRecoilState(sentMessageState);
  const [, setDmHistory] = useRecoilState(dmHistoryState);
  const [, setMessage] = useRecoilState(messageState);
  const [typing, setTyping] = useState(false);
  const submitButtonRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const decorate = useCallback(([node, path]) => {
    const ranges = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        if (token.type === "underline") {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start + 2 },
            focus: { path, offset: end - 2 },
          });
        } else {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          });
        }
      }
      start = end;
    }
    return ranges;
  }, []);

  const insertEmoji = (emoji) => {
    const { selection } = editor;
    if (selection && !Range.isCollapsed(selection)) {
      Transforms.select(editor, { offset: 0, path: [0, 0] });
    }
    Transforms.insertText(editor, emoji.native);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (typing) {
      const timer = setTimeout(() => {
        setTyping(false);
        submitButtonRef.current.focus();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [typing]);

  function transformText(text) {
    const regex = /\b([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})\b/g;
    const underlineRegex = /__[^_]+__|\\_\\_.*?\\_\\_/g;
    let transformed = text;
    if (underlineRegex.test(transformed)) {
      transformed = text.replace(underlineRegex, (match) => {
        return `<u>${match.slice(2, -2)}</u>`;
      });
    }

    transformed = transformed.replace(regex, (match) => {
      return `[${match}](https://${match})`;
    });

    const inlineCodeRegex = /`[^`\n]+`/g;
    const codeBlockRegex = /```[\s\S]*?```/g;
    if (codeBlockRegex.test(transformed)) {
      transformed = transformed.replace(codeBlockRegex, (match) => {
        const removeBackticksRegex = /```|`/g;
        const withoutCodeBlocks = match.replace(removeBackticksRegex, "");
        return `<pre><code>${withoutCodeBlocks.replace(/\n/g, "<br />")}</code></pre>`;
      });
    }

    if (inlineCodeRegex.test(transformed)) {
      transformed = transformed.replace(codeBlockRegex, (match) => {
        const removeInlineCodeRegex = /`[^`\n]+`/g;
        const withoutCodeBlocks = match.replace(removeInlineCodeRegex, "");
        return `<pre><code>${withoutCodeBlocks.replace(/\n/g, "<br />")}</code></pre>`;
      });
    }

    const strikethroughRegex = /~~[^~]+~~/g;
    if (strikethroughRegex.test(transformed)) {
      transformed = transformed.replace(strikethroughRegex, (match) => {
        const removeBackticks = /~~([^~]+)~~/g;
        return `<s>${match.replace(removeBackticks, "$1")}</s>`;
      });
    }

    return transformed.replace(/\n/g, "<br />");
  }

  const transformToList = (node) => {
    if (node.type === "bulleted-list") {
      const list = node.children
        .map((child) => `<li>${child.children.map((child) => child.text)}</li>`)
        .join("");
      return `<ul>${list}</ul>`;
    }

    if (node.type === "numbered-list") {
      const list = node.children
        .map((child) => `<li>${child.children.map((child) => child.text)}</li>`)
        .join("");
      return `<ol>${list}</ol>`;
    }
  }

  const getPlainText = (nodes) => {
    if (LIST_TYPES.includes(nodes[0].type)) {
      const list = transformToList(nodes[0]);
      return list;
    }

    return nodes
      .map((n) => {
        return transformText(Node.string(n));
      })
      .join("\n");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const convertListToSingleParagraph = (format) => {
    // Get all the list items
    const listItems = [];
    value[0].children.forEach((node) => {
      if (node.type === "list-item") {
        listItems.push(...node.children.map((child) => child.text).join(""));
      }
    });
    const newParagraph = {
      type: "paragraph",
      children: [{ text: listItems.join("") }],
    };
    Transforms.setNodes(
      editor,
      { type: "paragraph" },
      {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "list-item",
        split: true,
      },
    );
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
      split: true,
    });
    Transforms.insertNodes(editor, newParagraph, { at: [0] });
  };

  const removeActiveBlock = (event) => {
    value.forEach((val, index) => {
      if (LIST_TYPES.includes(val.type)) {
        event.preventDefault();
        const removeBulletedLists = (format) => {
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === format,
            split: true,
          });

          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
            split: true,
          });
        };
        val.children.forEach(() => {
          removeBulletedLists(val.type);
        });
        const newParagraph = {
          type: "paragraph",
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, newParagraph, { at: [0] });
      } else {
        Transforms.unwrapNodes(editor, {
          at: [index],
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type),
          split: true,
        });

        const newProperties = {
          type: "paragraph",
        };
        Transforms.setNodes(editor, newProperties);
      }
    })
  };

  const clearEditor = (event) => {
    removeActiveBlock(event);
    Transforms.select(editor, {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    });
    Transforms.removeNodes(editor);
  };

  const uploadImages = () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("images", file);
    }
    uploadFilesRequest(formData).then(() => setFiles([]));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const content = getPlainText(value);

    if (content?.length) {
      setValue(initialValue);
      setMessage(content);
      setLastSentMessage(content);
      setDmHistory((prevHistory) => [...prevHistory, content]);
      clearEditor(event);
      Transforms.insertNodes(
        editor,
        { children: [{ text: "" }] },
        { at: [editor.children.length] },
      );
      Transforms.select(editor, { offset: 0, path: [0, 0] });
      uploadImages();
      return;
    }

    if (files.length) {
      uploadImages();
    }
  };

  const onKeyDown = (event) => {
    const isListTypeActive =
      isBlockActive(editor, LIST_TYPES[0]) ||
      isBlockActive(editor, LIST_TYPES[1]);
    if (event.shiftKey && event.key === "Enter" && !isListTypeActive) {
      event.preventDefault();
      const { selection } = editor;

      if (selection && !Range.isCollapsed(selection)) {
        Transforms.insertText(editor, "\n", { at: selection });
        return;
      }
      Transforms.insertText(editor, "\n");
      return;
    }
    if (event.key === "Enter" && !isListTypeActive) {
      handleSubmit(event);
    }

    const activeBlock = value.find((val) => LIST_TYPES.includes(val.type));
    if (activeBlock && event.key.toUpperCase() === "DELETE") {
      removeActiveBlock(event);
    }

    if (activeBlock && event.key === "Backspace") {
      if (activeBlock.children.length && activeBlock.children.length === 1) {
        const format = activeBlock.type;
        const listItem = activeBlock.children[0];

        if (!listItem.children[0].text) {
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === format,
            split: true,
          });
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
            split: true,
          });
          const newParagraph = {
            type: "paragraph",
            children: [{ text: "" }],
          };
          Transforms.insertNodes(editor, newParagraph, { at: [0] });
          const { selection } = editor;
          
          if (selection && !Range.isCollapsed(selection)) {
            Transforms.select(editor, { offset: 0, path: [0, 0] });
          }
        }
      }
    }
  };

  const emojis = ["😊", "😂", "😍", "👍", "😢"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const onFileSelected = (file) => {
    const alreadyUploaded = files.find(
      (uploadedFile) => uploadedFile.name === file.name,
    );
    if (alreadyUploaded) {
      toast.error(`${file.name} is already uploaded.`, { toastId: file.name });
      return;
    }

    if (files.length >= 10) {
      toast.error(
        `You can only add up to 10 attachments to a single message. Please remove some attachments before adding more.`,
        {
          toastId: "filesLimit",
        },
      );
      return;
    }
    setFiles((prevFiles) => {
      if (prevFiles.length >= 10) {
        toast.error(
          `You can only add up to 10 attachments to a single message. Please remove some attachments before adding more.`,
          {
            toastId: "filesLimit",
          },
        );
        return prevFiles;
      }
      return [...prevFiles, file];
    });
  };

  const onDeleteFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <form className={"form"} onSubmit={handleSubmit} onKeyDown={onKeyDown}>
      {!!files.length && (
        <ImagesPreview files={files} onDeleteFile={onDeleteFile} />
      )}
      {isModalOpen && (
        <div className="uploadOverlay">
          <DragDropFiles
            onClose={() => setIsModalOpen(false)}
            onFileSelected={onFileSelected}
          />
        </div>
      )}
      <Slate
        editor={editor}
        initialValue={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          if (showEmojiPicker) {
            setShowEmojiPicker(false);
          }
        }}
      >
        <Toolbar>
          <Button onClick={() => setIsModalOpen(true)}>
            <Icon format="add" />
          </Button>
          <div className="spanLine" />
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underline" />
          <MarkButton format="strikethrough" icon="format_strikethrough" />
          <BlockButton format="block-quote" icon="format_quote" />
          <div className="spanLine" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <div className="spanLine" />
          <MarkButton format="code" icon="code" />
          <MarkButton format="code-block" icon="code-block" />
          <div className="spanLine" />
          {emojis.map((emoji) => (
            <Button
              key={emoji}
              onMouseDown={(event) => {
                event.preventDefault();
                insertEmoji({ native: emoji });
              }}
            >
              {emoji}
            </Button>
          ))}
        </Toolbar>
        <div className="wrapp">
          <div className="span">
            <Button style={{marginRight: 0}}
              active={showEmojiPicker}
              onMouseDown={(event) => {
                event.preventDefault();
                setShowEmojiPicker(!showEmojiPicker);
              }}
            >
              <EmojiEmoticonsIcon style={{ verticalAlign: top }}/>
            </Button>
            {showEmojiPicker && (
              <Picker onEmojiSelect={insertEmoji} set="twitter" />
            )}
          </div>
          <Editable
            className="editor"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            onFocus={() => setShowEmojiPicker(false)}
            placeholder="Just say something..."
          />
        </div>
        <div style={{ display: "flex", alignSelf: "flex-end", justifyContent: "flex-end" }}>
          <IconButton className="sendButton" type="submit" ref={submitButtonRef}>
            Send <SendIcon fontSize="16px" />
          </IconButton>
        </div>
      </Slate>
    </form>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  if (isActive) {
    return;
  }

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  const newProperties = {
    type: isActive
      ? "paragraph"
      : format === "code-block"
        ? "code-block"
        : LIST_TYPES.includes(format)
          ? "list-item"
          : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && LIST_TYPES.includes(format)) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }

  if (format === "code-block" && !isActive) {
    const { selection } = editor;
    let text = "";

    if (selection && !Range.isCollapsed(selection)) {
      text = Editor.string(editor, selection);
    }

    const codeBlock = {
      type: "code-block",
      children: [{ text: `\`\`\`${text}\`\`\`` }],
    };

    Transforms.insertNodes(editor, codeBlock);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  const { selection } = editor;

  const markSyntax = {
    bold: "**",
    italic: "*",
    underline: "__",
    strikethrough: "~~",
    code: "`",
    "code-block": "```",
  };

  if ((selection && Range.isCollapsed(selection)) || !selection) {
    const newText =
      format === "codeBlock"
        ? `${markSyntax[format]}\n${markSyntax[format]}`
        : `${markSyntax[format]} ${markSyntax[format]}`;

    Transforms.insertText(editor, newText, {
      at: selection ? selection : { offset: 0, path: [0, 0] },
    });

    if (format === "code" || format === "codeBlock") {
      Transforms.move(editor);
    }
    return;
  }

  const [start, end] = Range.edges(selection);
  const text = Editor.string(editor, { anchor: start, focus: end });

  if (!isActive) {
    // Add the Markdown syntax
    const newText =
      format === "codeBlock"
        ? `${markSyntax[format]}\n${text}\n${markSyntax[format]}`
        : `${markSyntax[format]}${text}${markSyntax[format]}`;

    Transforms.insertText(editor, newText, { at: selection });
  }

  Editor.removeMark(editor, format);
};

export const isBlockActive = (editor, format, blockType = "type") => {
  if (!editor) return false;
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    }),
  );
  return !!match;
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  const style = {
    textAlign: element.align,
    width: "100%",
    lineHeight: "1em",
    margin: "0",
  };
  switch (element.type) {
    case "code-block":
      return (
        <pre style={{ padding: "8px" }} {...attributes}>
          <code>{children}</code>
        </pre>
      );
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          <li>{children}</li>
        </ul>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "link":
      return (
        <a
          {...attributes}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    case "paragraph":
      if (
        element.children[0].text &&
        hasFewerThan10Emojis(element.children[0].text) &&
        !element.children[0].text.includes("`")
      ) {
        return (
          <p style={{ ...style, fontSize: 40 }} {...attributes} title="emoji">
            {children}
          </p>
        );
      }
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
    default:
      if (
        element.children[0].text &&
        hasFewerThan10Emojis(element.children[0].text) &&
        !element.children[0].text.includes("`")
      ) {
        return (
          <p style={{ ...style, fontSize: 40 }} {...attributes} title="emoji">
            {children}
          </p>
        );
      }
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.url) {
    children = (
      <a {...attributes} className="link">
        {children}
      </a>
    );
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf["code-block"]) {
    children = (
      <pre style={{ padding: "8px", width: "100%" }} {...attributes}>
        <code>{children}</code>
      </pre>
    );
  }

  if (leaf.code && !leaf["code-block"]) {
    children = (
      <pre style={{ display: "inline", padding: "8px" }} {...attributes}>
        <code>{children}</code>
      </pre>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = (
      <u style={{ textDecorationThickness: "1px", textUnderlineOffset: "0px" }}>
        {children}
      </u>
    );
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={false}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon format={format}>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={false}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon format={format}>{icon}</Icon>
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default TextEditor;