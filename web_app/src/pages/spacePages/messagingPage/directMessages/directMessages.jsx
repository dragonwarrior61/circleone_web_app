import "./directMessages.scss";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilState } from "recoil";
import { dmHistoryState } from "../../../../atom";
import Avatar from "../../../../components/userProfiles/avatarProfile";
import EmojiReactor from "../messageReactions/messageReactions";
import twemoji from "twemoji";
import TextEditor, { hasFewerThan10Emojis } from "./TextEditor/textEditor";
import rehypeRaw from "rehype-raw";

const DirectMessages = () => {
  const [dmHistory] = useRecoilState(dmHistoryState);
  const messageSectionRef = useRef(null);

  useEffect(() => {
    messageSectionRef.current?.scrollTo(
      0,
      messageSectionRef.current.scrollHeight,
    );
  }, [dmHistory]);

  const [reactions, setReactions] = useState([]);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const addReaction = (emoji, index) => {
    const updatedReactions = [...reactions];

    if (!updatedReactions[index]) {
      updatedReactions[index] = [];
    }

    if (!updatedReactions[index].includes(emoji)) {
      updatedReactions[index].push(emoji);
    }
    setReactions(updatedReactions);
  };

  const removeReaction = (emoji, index) => {
    const updatedReactions = [...reactions];

    const emojiIndex = updatedReactions[index].indexOf(emoji);
    if (emojiIndex !== -1) {
      updatedReactions[index].splice(emojiIndex, 1);
    }

    setReactions(updatedReactions);
  };

  function formatMentionedText(message) {
    return message
    // const mentionRegex = /@(\w+)/g;
    // return message.replace(mentionRegex, (match) => {
    //   return `[${match}](#mention "mention")`;
    // });
  }

  /*   const onMentionClick = (event) => {
    const { clientX, clientY } = event;
    const offsetX = 200;
    const offsetY = 150;
    //Initial position
    let newX = clientX + offsetX;
    let newY = clientY + offsetY;
    //Window dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    //UserHover dimensions
    const userHoverWidth = 300;
    const userHoverHeight = 150;

    if (newX + userHoverWidth > screenWidth) {
      newX = clientX - userHoverWidth;
    }
    if (newY + userHoverHeight > screenHeight) {
      newY = clientY - userHoverHeight;
    }

    setClickPosition({ x: newX, y: newY });
    setShowComponent(true);
  }; */

  return (
    <div className="messaging_container content_box">
      <div className="message_wrapper">
        <div className="message_interface">
          <div className="center_box">
            <div className="message_section" ref={messageSectionRef}>
              {dmHistory.map((message, index) => (
                <div
                  key="{item.id}"
                  className="one_message "
                  onMouseEnter={() => setHoveredMessage(index)}
                >
                  <div className="message_info">
                    <Avatar
                      size="small"
                      showStatusIcon={false}
                    />
                    <span className="user_name">Luis O.</span>
                  </div>
                  <ReactMarkdown
                    key="index.id"
                    rehypePlugins={[rehypeRaw]}
                    className="message_context"
                    components={{
                      a: ({ node, href, ...props }) => {
                        if (props.title === "mention") {
                          return (
                            <div className="mentioned">{props.children}</div>
                          );
                        }
                        return <a {...props} href={href}>{props.children}</a>;
                      },
                      u: ({ node, ...props }) => {
                        return <u {...props}>{props.children}</u>
                      },
                      p: ({ node, ...props }) => {
                        const emojiRegex = /\p{Emoji}/gu;
                        if (props?.children) {
                          const isEmoji = emojiRegex.test(props?.children[0])
                          if (props?.children[0] && isEmoji && hasFewerThan10Emojis(props.children[0])) {
                            return <p {...props} style={{ fontSize: '40px' }} />
                          }
                          if (typeof props?.children[0] === 'string' && props.children[0]?.includes('http')) {
                            return <a href={props.children[1].props.href} {...props} />
                          }
                        }
                        return <p {...props} />;
                      },
                      code: ({ node, ...props }) => {
                        return <pre style={{ display: 'inline' }} {...props}>
                          <code>{props.children}</code>
                        </pre>
                      },
                      pre: ({ node, ...props }) => {
                        return <pre {...props}>
                          <code>{props.children}</code>
                        </pre>
                      },
                      s: ({ node, ...props }) => {
                        return <s {...props} />
                      },
                    }}
                  >
                    {formatMentionedText(message)}
                  </ReactMarkdown>

                  <div className="reactions_row">
                    {reactions[index] && reactions[index].length > 0 ? (
                      <div className="reactions_container">
                        {reactions[index]?.map((reaction, rIndex) => (
                          <span
                            key={rIndex}
                            className="reaction"
                            onClick={() => removeReaction(reaction, index)}
                            dangerouslySetInnerHTML={{
                              __html: twemoji.parse(reaction),
                            }}
                          />
                        ))}
                      </div>
                    ) : null}

                    {hoveredMessage === index && (
                      <EmojiReactor
                        onReact={(emoji) => addReaction(emoji, index)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="input_section">
              <TextEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;