import React, { useState } from "react";

import { isEmpty, map } from "lodash";
import Swal from "sweetalert2";
import shortid from "shortid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (isEmpty(task)) {
      console.log("Empty");
      sendMessage(
        "warning",
        "Warning",
        "You must enter a description.",
        false,
        true
      );
      return;
    }
    /*console.log('Task');*/

    const newTask = {
      id: shortid.generate(),
      name: task,
    };

    setTasks([...tasks, newTask]);

    setTask("");

    sendMessage(
      "success",
      "information",
      "Task added sucessfully.",
      true,
      false
    );
  };

  const sendMessage = (msgType, msgTitle, msgText, timer, confirmButton) => {
    const swalProperty = {
      icon: msgType,
      title: msgTitle,
      html: msgText,
      timer: timer == true ? 1000 : null,
      showConfirmButton: confirmButton,
    };

    Swal.fire(swalProperty);
  };

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>

      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Taks list</h4>

          <ul className="list-group">

            {tasks.map((task) => (

              <li className="list-group-item" key={task.id}>
                <span className="lead"><i className="text-success far fa-check-circle"></i> {task.name}</span>
                <a className="btn btn-outline-danger btn-sm float-right mx-2">
                  <i className="far fa-trash-alt"></i>
                </a>
                <a className="btn btn-outline-warning btn-sm float-right">
                  <i className="far fa-edit"></i>
                </a>
              </li>

            ))}
          </ul>
        </div>

        <div className="col-md-4">
          <h4 className="text-center">Form</h4>

          <form id="frmTaks" method="post" onSubmit={addTask}>
            <input
              className="form-control mb-2"
              type="text"
              onChange={(element) => setTask(element.target.value)}
              placeholder="Enter the task name"
              value={task}
            />
            <button
              className="btn btn-outline-success btn-sm float-right"
              type="submit"
            >
              <i className="fas fa-plus-circle"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
