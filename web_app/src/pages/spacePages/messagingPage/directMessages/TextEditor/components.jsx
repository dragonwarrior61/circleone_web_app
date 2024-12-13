import React from "react";
import AddCircle from "@mui/icons-material/AddCircle";
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import "./textEditor.scss";
import {
  CodeBlockIcon,
  CodeIcon,
  ItalicIcon,
  QuoteIcon,
} from "../iconImports.jsx";

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={`blockButton ${active && "active"}`}
    />
  ),
);

const Icon = ({ format }) => {
  const renderIcon = () => {
    switch (format) {
      case "add":
        return <AddCircle />;
      case "bold":
        return <FormatBoldIcon />;
      case "italic":
        return <ItalicIcon />;
      case "underline":
        return <FormatUnderlinedIcon fontSize="small" />;
      case "strikethrough":
        return <StrikethroughSIcon fontSize="small"  />;
      case "block-quote":
        return <QuoteIcon />;
      case "numbered-list":
        return <FormatListNumberedIcon fontSize="small" />;
      case "bulleted-list":
        return <FormatListBulletedIcon fontSize="small"/>;
      case "code":
        return <CodeIcon fontSize="small" />;
      case "code-block":
        return <CodeBlockIcon />;
      default:
        return null;
    }
  };

  return renderIcon();
};

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} data-test-id="menu" ref={ref} className="menu" />
));

export { Button, Icon, Toolbar };