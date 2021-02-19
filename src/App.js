import React, { useState, useEffect } from "react";

import { isEmpty, size } from "lodash";
import Swal from "sweetalert2";
/*import shortid from "shortid";*/

import TasksLogo from "./images/Tasks.png";
import {
  addDocument,
  deleteDocumentById,
  getCollection,
  updateDocumentbyId,
} from "./dataBase/actions";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [idTask, setIdTask] = useState("");

  const successColor = "#53a451";
  const warningColor = "#f7c244";
  const oneSecond = 1000;
  const tenSecond = 10000;

  /* Load page */
  useEffect(() => {
    (async () => {
      sendMessage(
        "info",
        "Information",
        "Procesing please wait...",
        tenSecond,
        false,
        true
      );

      const result = await getCollection("tasks");
      if (result.statusResponse) {
        setTasks(result.data);
        Swal.close();
      } else {
        sendMessage("error", "Error", result.error, null, true, false);
        console.log(result);
      }
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    if (isEmpty(task)) {
      sendMessage(
        "warning",
        "Warning",
        "You must enter a description.",
        null,
        true,
        false
      );
      isValid = false;
    }
    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }
    /*console.log('Task');*/

    sendMessage(
      "info",
      "Information",
      "Procesing please wait...",
      tenSecond,
      false,
      true
    );

    const result = await addDocument("tasks", { name: task });
    if (!result.statusResponse) {
      sendMessage("error", "Error", result.error, null, true, false);
      return;
    }

    /*const newTask = {
      id: shortid.generate(),
      name: task,
    };*/

    /*setTasks([...tasks, newTask]);*/
    setTasks([...tasks, { id: result.data.id, name: task }]);
    setTask("");

    sendMessage(
      "success",
      "information",
      "Task added sucessfully.",
      oneSecond,
      false,
      false
    );
  };

  const saveTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    sendMessage(
      "info",
      "Information",
      "Procesing please wait...",
      tenSecond,
      false,
      true
    );

    const resul = await updateDocumentbyId("tasks", idTask, { name: task });
    if (!resul.statusResponse) {
      sendMessage("error", "Error", resul.error, null, true, false);
      return;
    }

    const editedTasks = tasks.map((item) =>
      item.id === idTask ? { id: idTask, name: task } : item
    );
    setTasks(editedTasks);

    if (idTask !== "") {
      setEditMode(false);
      setIdTask("");
      setTask("");
    }

    sendMessage(
      "success",
      "Information",
      "Task edited successfully.",
      oneSecond,
      false,
      false
    );
  };

  const editTask = (taskEdit) => {
    setEditMode(true);
    setIdTask(taskEdit.id);
    setTask(taskEdit.name);
  };

  const deleteTask = async (id) => {
    sendMessage(
      "info",
      "Information",
      "Procesing please wait...",
      tenSecond,
      false,
      true
    );

    const result = await deleteDocumentById("tasks", id);

    if (!result.statusResponse) {
      sendMessage("error", "Error", result.error, null, true, false);
      return;
    }

    const tasksFilter = tasks.filter((task) => task.id !== id);
    setTasks(tasksFilter);

    sendMessage(
      "success",
      "Information",
      "Task deleted successfully.",
      oneSecond,
      false,
      false
    );
  };

  const taskDeleteShowModal = (task) => {
    const swalProperty = {
      icon: "warning",
      title: "Are you shure delete this?",
      html: "Task: <b>" + task.name + "</b>",
      timer: null,
      confirmButtonColor: warningColor,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonColor: successColor,
      cancelButtonText: "No",
    };

    Swal.fire(swalProperty).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task.id);
      }
    });
  };

  const sendMessage = (
    msgType,
    msgTitle,
    msgText,
    timer,
    confirmButton,
    timerProgressBar
  ) => {
    const swalProperty = {
      icon: msgType,
      title: msgTitle,
      html: msgText,
      timer: timer !== null ? timer : null,
      showConfirmButton: confirmButton,
      timerProgressBar: timerProgressBar,
    };

    Swal.fire(swalProperty);
  };

  return (
    <div className="container mt-5">
      <h2>
        <img src={TasksLogo} alt="Task" height="70px" width="70px" /> Tasks
      </h2>

      <hr />

      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Taks list</h4>

          {size(tasks) > 0 ? (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">
                    <i className="text-success far fa-check-circle"></i>{" "}
                    {task.name}
                  </span>
                  <button
                    className={
                      editMode
                        ? "btn btn-outline-danger btn-sm float-right mx-2 disabled"
                        : "btn btn-outline-danger btn-sm float-right mx-2"
                    }
                    onClick={() => taskDeleteShowModal(task)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <button
                    className={
                      editMode
                        ? "btn btn-outline-warning btn-sm float-right disabled"
                        : "btn btn-outline-warning btn-sm float-right"
                    }
                    onClick={() => editTask(task)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <li className="list-group-item">
              <i className="text-warning fas fa-exclamation-triangle"></i> No
              tasks have been added yet.
            </li>
          )}
        </div>

        <div className="col-md-4">
          <h4 className="text-center">{editMode ? "Edit Task" : "Add task"}</h4>

          <form
            id="frmTaks"
            method="post"
            onSubmit={editMode ? saveTask : addTask}
          >
            <input
              className="form-control mb-2"
              type="text"
              onChange={(element) => setTask(element.target.value)}
              placeholder="Enter the task name"
              value={task}
            />
            <button
              className={
                editMode
                  ? "btn btn-outline-primary btn-sm float-right"
                  : "btn btn-outline-success btn-sm float-right"
              }
              type="submit"
            >
              <i
                className={editMode ? "fas fa-save" : "fas fa-plus-circle"}
              ></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
