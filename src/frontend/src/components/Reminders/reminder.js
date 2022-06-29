import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";

const Reminder = (props) => {
  return (
    <>
    <Header></Header>
      <div>
      <p>{props.reminder.name}</p>
        <b>
          <p>{props.reminder.quantity}</p>
        </b>
        <p>{props.reminder.start_date}</p>
        <p>{props.reminder.end_date}</p>
        <p>{props.reminder.publish_time}</p>

      </div>
    </>
  );
};



export default Reminder;