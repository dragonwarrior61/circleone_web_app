import "./ImagePreview.scss";
import { ReactComponent as DeleteIcon } from "./delete.svg";
import { ReactComponent as EditIcon } from "./edit.svg";
import { ReactComponent as EyeIcon } from "./eye.svg";

const ImagePreview = ({ onDeleteFile, file }) => {
  const handleDelete = () => {
    onDeleteFile(file.name);
  };

  const src = URL.createObjectURL(file);

  return (
    <div className="image">
      <div>
        <img alt={file.name} src={src} />
        <div className="icons">
          <button>
            <EyeIcon />
          </button>
          <button>
            <EditIcon />
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <span>{file.name}</span>
    </div>
  );
};

export default ImagePreview;
