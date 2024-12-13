import "./task.scss";

const Task = ({ task, listId }) => {

  const onDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("listId", listId);
  };

  return (
    <div
      className="to_do_list_items"
      draggable="true"
      onDragStart={onDragStart}
    >
      <div className="to_do_select">
        <input type="checkbox" id={task.id} className="custom_checkbox" />
        <label htmlFor={task.id} className="checkbox_custom_label"></label>
        <span>{task.text}</span>
      </div>
      <div className="to_do_description">
        <p>
          Lorem ipsum dolor sit amet consectetur. Fermentum tellus etiam
          ullamcorper.
        </p>
      </div>
    </div>
  );
};

export default Task;