import "./App.css";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterBtn from "./components/FilterBtn";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const addTask = (name) => {
    if (name === "") return;
    const newTask = {
      id: `task-${nanoid()}`,
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const taskList = tasks
    .filter(props.FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = props.FILTER_NAMES.map((name) => (
    <FilterBtn
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const countString = `${tasks.length} ${
    tasks.length === 1 ? "task" : "tasks"
  } remaining`;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
    console.log(JSON.parse(localStorage.getItem("todos")));
  }, [tasks]);

  return (
    <div className="todoapp">
      <h1>#Todo</h1>
      <div className="filters btn-group stack-exception flex">{filterList}</div>
      <Form addTask={addTask} />
      <h2 id="list-heading">User task: {countString}</h2>
      <div
        role="list"
        className="todo-list stack-large stack-exception"
      >
        {taskList}
      </div>
    </div>
  );
}

export default App;
