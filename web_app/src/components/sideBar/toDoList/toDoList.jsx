import { Fragment, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./toDoList.scss";
import SearchBar from "../includes/searchBar";
import Task from "./task/task";

const formatListId = (listId) => {
  return listId
    .split("")
    .map((char, index) =>
      index !== 0 && char === char.toUpperCase() ? ` ${char}` : char,
    )
    .join("");
};

const ToDoList = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [tasks, setTasks] = useState({
    Todo: [
      { id: "task1", text: "Task 1" },
      { id: "task2", text: "Task 2" },
    ],
    InProgress: [{ id: "task3", text: "Task 3" }],
    Complete: [{ id: "task4", text: "Task 4" }],
  });

  const [visibility, setVisibility] = useState({
    Todo: true,
    InProgress: true,
    Complete: true,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, listId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const oldListId = e.dataTransfer.getData("listId");

    const task = tasks[oldListId].find((t) => t.id === taskId);

    const newTasks = {
      ...tasks,
      [oldListId]: tasks[oldListId].filter((t) => t.id !== taskId),
      [listId]: [...tasks[listId], task],
    };

    setTasks(newTasks);
  };

  const toggleVisibility = (listId) => {
    setVisibility((prevState) => ({
      ...prevState,
      [listId]: !prevState[listId],
    }));
  };

  const handleSearch = (event) => {
    const val = event.target.value;
    const bel = document.getElementsByClassName("scrollable")[0];
    val ? bel.classList.add("hidden") : bel.classList.remove("hidden");

    if (props.pageType !== "todoList") {
      setSearchTerm(val);
    }
  };

  return (
    <Fragment>
      <div className={`input-group input-group-for-${props.pageType}`}>
        <div
          className="input-group-text"
          style={{
            cursor: "pointer",
          }}
        >
          <SearchRoundedIcon />
        </div>
        <SearchBar
          placeholder={props.searchHolder}
          className="form-control server_search"
          value={searchTerm}
          onInput={handleSearch}
        />
      </div>
      <div className="to_do_bar">
        <div className="line"></div>
        {Object.entries(tasks).map(([listId, listTasks]) => (
          <div
            key={listId}
            className="to_do_list"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, listId)}
          >
            <div className="to_do_list_subtitles">
              {listId !== "Complete" && (
                <AddCircleIcon className="add_icon" alt="add-icon" />
              )}
              <span>{formatListId(listId)}</span>
              <ExpandMoreIcon className={`dropdown_icon ${
                  visibility[listId] ? "" : "rotate-icon"
                }`} alt="dropdown"
                onClick={() => toggleVisibility(listId)} />
            </div>
            {visibility[listId] &&
              listTasks.map((task) => (
                <Task key={task.id} task={task} listId={listId} />
              ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ToDoList;