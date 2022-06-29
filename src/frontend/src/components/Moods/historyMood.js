import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";

const HistoryMood = (props) => {

    const exportMoodHistory = ()=> {
        props.onExportHistoryMood();
    }
  
    return (
      <>
        <Header></Header>
{/* 
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div> */}
<br></br><br></br>
<h1 class="ml-5">Mood history</h1>
<br>
</br>
<a href="/moods" class="btn btn-primary ml-5">
                    Add new mood
                  </a>
                  
                  <button type='button' class="btn btn-warning ml-5" onClick={exportMoodHistory}>Export mood history</button> 

                  <br></br><br></br><br></br>
        {props.historyMoods.map((term) => {
          return (
            <>
              {/* <p>_______________________________________________</p>
                                    <b> <p>{term.mood}</p> </b>
                                     <p>{term.date_time}</p>
                                     <p>{term.description}</p> */}
              <div class="card ml-5 mr-5">
                <div class="card-body">
                  <h5 class="card-title">{term.mood}</h5>
                  <p class="card-text">
                  {term.description}
                  </p>
                  <b><p>Published at: {term.date_time}</p></b>
                  
                </div>
              </div>
            </>
          );
        })}
        <br></br>
        <br></br>
        {/* <Link className={"btn btn-info "}
                      onClick={() => props.onEdit(term.id)}
                      to={`/posts/edit/${term.id}`}>
                    Edit
                </Link> */}
      </>
    );
  }


export default HistoryMood;