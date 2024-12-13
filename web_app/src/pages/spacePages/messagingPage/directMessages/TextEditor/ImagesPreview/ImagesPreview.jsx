import ImagePreview from "./ImagePreview/ImagePreview";
import "./imagesPreview.scss";

const ImagesPreview = ({ files, onDeleteFile }) => {
  return (
    <div className="imagesPreview">
      <div className="imagesPreviewContainer">
        {files.map((file) => (
          <ImagePreview key={file.name} onDeleteFile={onDeleteFile} file={file} />
        ))}
      </div>
    </div>
  );
};

export default ImagesPreview;
