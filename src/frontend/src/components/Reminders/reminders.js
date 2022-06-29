import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";

const Reminders = (props) => {
  return (
    <>
      <Header></Header>
      <div>
        <h2 class="mt-5 ml-5 mb-4"> Your reminders</h2>

        <div>
        <Link className={"btn btn-block btn-success mb-5 ml-5 mt-3"} to={"/reminders/add"}>Add new reminder</Link>
        </div>

        {props.reminders.map((term) => {
          return (
            //                 <div>
            //                      <p>_______________________________________________</p>
            //                      <b><p>Name of medication:</p></b>
            //                     <p>{term.name}</p>
            //                     <b><p>Quantity:</p></b>
            //                     <p>{term.quantity}</p>
            //                     <b><p>Time to take:</p></b>
            //                     <p>{term.publish_time}</p>

            //                     <br/>
            //                      <Link title={"View"}
            //    onClick={() => props.onView(term.id)}
            //     to={`/reminder/${term.id}`}
            //    >
            //     View reminder
            // </Link> <br/> <br/>
            // <button title={"Delete"}
            //    onClick={() => props.onDelete(term.id)}>
            //     Delete
            // </button>
            // <br/> <br/>
            // <Link className={"btn btn-info "}
            //       onClick={() => props.onEdit(term.id)}
            //       to={`/posts/edit/${term.id}`}>
            //     Edit
            // </Link>

            //                 </div>

            <div class="card ml-5" style={{ width: "30rem" }}>
              <div class="card-body">
                <h5 class="card-title mb-5">{term.name}</h5>
                <h6 class="card-subtitle mb-2 mt-3 text-muted">
                  <b>
                    <p>Quantity:</p>
                  </b>
                  <p>{term.quantity}</p>
                  <b>
                    <p>Time to take:</p>
                  </b>
                  <p>{term.publish_time}</p>
                  <b>
                    <p>Start date:</p>
                  </b>
                  <p>{term.start_date}</p>
                  <b>
                    <p>End date:</p>
                  </b>
                  <p>{term.end_date}</p>
                </h6>

                <button
                  title={"Delete"}
                  onClick={() => props.onDelete(term.id)}
                  class="btn btn-danger mr-5"
                >
                  Delete
                </button>
                <Link
                  className={"btn btn-info "}
                  onClick={() => props.onEdit(term.id)}
                  to={`/reminders/edit/${term.id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      
    </>
  );
};

export default Reminders;
