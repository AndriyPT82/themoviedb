import React from "react";
import './Comment.scss';

export const Comment = ({ comment, name, email }) => {

  return (
    <li className="comment">
      <p className="comment__text">{comment}</p>
      <span className="comment__user-info">
        <span>{name}</span>
        <span>{email}</span>
      </span>

    </li>
  )
}

