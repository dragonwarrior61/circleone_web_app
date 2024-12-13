import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableItem from "./draggableItem";
import "./dragnAndDrop.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

const DroppableContainer = ({ title, items, id, handleCategoryAddition }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Droppable droppableId={id} type="ITEM">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`dropdown ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
        >
          <button className="dropdown_button" onClick={toggleDropdown}>
            {isOpen ? (
              <ExpandMoreIcon
                style={{ marginRight: "6px" }}
                sx={{ fontSize: 19 }}
              />
            ) : (
              <ExpandLessIcon
                style={{ marginRight: "6px" }}
                sx={{ fontSize: 19 }}
              />
            )}

            {title}
            <AddIcon
              style={{ position: "absolute", right: 6 }}
              sx={{ fontSize: 19 }}
              onClick={handleCategoryAddition}
            />
          </button>
          {isOpen && (
            <div className="dropdown_content">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`draggable-item ${snapshot.isDragging ? "dragging" : ""}`}
                    >
                      <DraggableItem item={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableContainer;
