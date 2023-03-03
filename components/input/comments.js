import { useEffect, useState, useContext} from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const { eventID } = props;
  const notificationContext = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, SetComments] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (showComments) {
      setShowLoader(true);
      fetch(`/api/comments/${eventID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShowLoader(false);
          SetComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationContext.showNotification({
      title: 'Adding Comment',
      message: 'Your comment is currently being stored',
      status: 'pending'
    });
    // send data to API
    fetch(`/api/comments/${eventID}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        return response.json().then((data)=>{
          throw new Error(data.message || 'Something went wrong');
        })
      })
      .then((data) => {
        console.log(data);
        notificationContext.showNotification({
          title: 'Success',
          message: 'Your comment was saved',
          status: 'success'
        });
      })
      .catch((error)=>{
        notificationContext.showNotification({
          title: 'Error',
          message: error.message,
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !showLoader && <CommentList items={comments}/>}
      {showComments && showLoader && <p>Loading....</p>}
    </section>
  );
}

export default Comments;
