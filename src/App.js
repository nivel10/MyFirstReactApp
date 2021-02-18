import React from "react";

function App() {
  return (
    <div className="container mt-5">
      <h1>Tasks</h1>

      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Taks list</h4>

          <ul className="list-group">

            <li className="list-group-item">
              <spa className="lead">Task name</spa>
              <a className="btn btn-outline-danger btn-sm float-right mx-2"><i class="far fa-trash-alt"></i></a>
              <a className="btn btn-outline-warning btn-sm float-right"><i class="far fa-edit"></i></a>
            </li>

          </ul>
        </div>

        <div className="col-md-4">
          <h4 className="text-center">Form</h4>

          <form id="frmTaks" method="post">
            <input className="form-control mb-2" type="text" placeholder="Enter the task name" />
            <button className="btn btn-outline-success btn-sm float-right" type="submit"><i class="fas fa-plus-circle"></i></button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
