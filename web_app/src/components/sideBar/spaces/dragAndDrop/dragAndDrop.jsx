import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DroppableContainer from "./droppableContainer";

const DragAndDrop = ({ handleCategoryAddition }) => {
  const [dropdowns, setDropdowns] = useState([
    {
      id: "dropdown-1",
      title: "Staff pages",
      items: [
        { id: "item-1", name: "General chat", icon: "ForumRoundedIcon" },
        { id: "item-2", name: "Top 10 Games", icon: "ArticleRoundedIcon" },
        { id: "item-3", name: "Staff leaderboard", icon: "LeaderboardRoundedIcon" },
        { id: "item-4", name: "Website", icon: "LinkRoundedIcon" },
      ],
    },
    {
      id: "dropdown-3",
      title: "Staff pages",
      items: [
        { id: "item-9", name: "General chat", icon: "ForumRoundedIcon" },
        { id: "item-10", name: "Homework", icon: "ArticleRoundedIcon" },
        { id: "item-11", name: "Staff leaderboard", icon: "LeaderboardRoundedIcon" },
        { id: "item-12", name: "Website", icon: "LinkRoundedIcon" },
      ],
    },
    {
      id: "dropdown-4",
      title: "VIP pages",
      items: [
        { id: "item-13", name: "General chat 1", icon: "ForumRoundedIcon" },
        { id: "item-14", name: "Meet the team", icon: "ArticleRoundedIcon" },
        { id: "item-15", name: "Staff leaderboard 1", icon: "LeaderboardRoundedIcon" },
        { id: "item-16", name: "Website 1", icon: "LinkRoundedIcon" },
      ],
    },
  ]);
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    // Reordering dropdown containers
    if (type === "DROPDOWN") {
      const reorderedDropdowns = Array.from(dropdowns);
      const [removed] = reorderedDropdowns.splice(source.index, 1);
      reorderedDropdowns.splice(destination.index, 0, removed);
      setDropdowns(reorderedDropdowns);
      return;
    }

    // Reordering items within the same dropdown
    if (source.droppableId === destination.droppableId) {
      const dropdownIndex = dropdowns.findIndex(
        (d) => d.id === source.droppableId,
      );
      const items = Array.from(dropdowns[dropdownIndex].items);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      const newDropdowns = [...dropdowns];
      newDropdowns[dropdownIndex].items = items;
      setDropdowns(newDropdowns);
      return;
    }

    // Moving items between different dropdowns
    const sourceDropdownIndex = dropdowns.findIndex(
      (d) => d.id === source.droppableId,
    );
    const destDropdownIndex = dropdowns.findIndex(
      (d) => d.id === destination.droppableId,
    );

    const sourceItems = Array.from(dropdowns[sourceDropdownIndex].items);
    const [removed] = sourceItems.splice(source.index, 1);

    const destItems = Array.from(dropdowns[destDropdownIndex].items);
    destItems.splice(destination.index, 0, removed);

    const newDropdowns = [...dropdowns];
    newDropdowns[sourceDropdownIndex].items = sourceItems;
    newDropdowns[destDropdownIndex].items = destItems;

    setDropdowns(newDropdowns);
  };

  const pinnedPages = dropdowns.slice(0, 1);
  const unpinnedPages = dropdowns.slice(1, 3);
  const renderComponent = (pages, title) => {
    return (
      <>
        <div className="space_bar_cat">
          <span>{title}</span>
        </div>
        {pages.map((dropdown, index) => (
          <Draggable
            key={dropdown.id}
            draggableId={`container-${dropdown.id}`}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`draggable-item ${snapshot.isDragging ? "dragging" : ""}`}
              >
                <DroppableContainer
                  key={dropdown.id}
                  id={dropdown.id}
                  title={dropdown.title}
                  items={dropdown.items}
                  setItems={(newItems) => {
                    const newDropdowns = [...dropdowns];
                    const dropdownIndex = newDropdowns.findIndex(
                      (d) => d.id === dropdown.id,
                    );
                    newDropdowns[dropdownIndex].items = newItems;
                    setDropdowns(newDropdowns);
                  }}
                  handleCategoryAddition={() =>
                    handleCategoryAddition(dropdown.id)
                  }
                />
              </div>
            )}
          </Draggable>
        ))}
      </>
    );
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="list_container space_channel_content_box">
        <Droppable droppableId={"container"} type="DROPDOWN">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${snapshot.isDraggingOver ? "dragging-over" : ""}`}
            >
              {renderComponent(pinnedPages, "Pinned Pages")}
              {renderComponent(unpinnedPages, "Shared Pages")}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
