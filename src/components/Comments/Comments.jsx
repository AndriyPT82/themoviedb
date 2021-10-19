import React, { Fragment, useEffect, useState } from "react";
import './Comments.scss';
import { CommentForm } from "../CommentForm";
import { Comment } from "../Comment";

export const Comments = ({ setTagsList, comments = [], setOpenComments }) => {

  const [openedForm, setOpenedForm] = useState(false)

  useEffect(() => {
    setTagsList(state => ({ ...state, comments: true }))
    return () => setTagsList(state => ({ ...state, comments: false }))
  }, [])

  return (
    <div className="comments">
      <span
        className="comments__closer"
        onClick={() => setOpenComments(false)}
      >
        &#x2715;
      </span>
      <ul className="comments__text">
        {
          !comments.length
            ? <h2>No Comments</h2>
            : comments.map(comment => (
              <React.Fragment key={comment.id}>
                <Comment {...comment} />
              </React.Fragment>
            ))
        }
      </ul>
      <button
        className="comments__opener"
        onClick={() => setOpenedForm(!openedForm)}
      >
        {openedForm ? 'Close Form' : 'Send Comment'}
      </button>
      {openedForm && <CommentForm openedForm={openedForm} />}
    </div>
  )
}

