import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import './CommentForm.scss';
import { CommentsContext } from '../Movie';

const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const CommentForm = ({ openedForm }) => {

  const [errors, setError] = useState({
    name: '',
    email: '',
    comment: '',
  })
  const [state, setState] = useState({
    name: '',
    email: '',
    comment: '',
  })

  const setComments = useContext(CommentsContext);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setError(errors => ({ ...errors, [name]: '' }))

    setState(state => ({ ...state, [name]: value }))


  }
  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (value.length < 4 || name === 'email' && !emailValidator.test(value)) {
      console.log(emailValidator.test(value), name);
      const title = name === 'email' ? 'not valid' : 'min length errors';
      setError(errors => ({ ...errors, [name]: title }));
    }
  }
  const handleButtonState = () => {
    const hasError = Object.values(errors).some(error => !!error);
    const notValid = Object.values(state).some(state => !state);

    return hasError || notValid;
  }
  const handleSubmit = () => {
    const id = uuidv4()
    const newComment = { id, ...state }

    // console.log(newComment);
    setComments(comments => ([...comments, newComment]))
    setState({
      name: '',
      email: '',
      comment: '',
    })
  }

  const { name, email, comment } = state;
  return (
    <div className={classNames(
      'comment-form',
      { 'comment-form--opened': openedForm }
    )}>
      <div className="comment-form__textarea">
        <span className="comment-form__input-title">
          {`Comment: ${errors.comment}`}
        </span>
        <textarea
          name="comment"
          className={classNames(
            "comment-form__text-field",
            { "error": !!errors.comment }
          )}
          rows="5"
          value={comment}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>

      </div>

      <div className="comment-form__inputs">
        <label className="comment-form__input-title">
          {`User: ${errors.name}`}
          <input
            type="text"
            name="name"
            className={classNames(
              "comment-form__input",
              { "error": !!errors.name }
            )}
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>

        <label className="comment-form__input-title">
          {`Email: ${errors.email}`}
          <input
            type="text"
            name="email"

            className={classNames(
              "comment-form__input",
              { "error": !!errors.email }
            )}
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>

        <button
          className="comment-form__button"
          disabled={handleButtonState()}
          onClick={handleSubmit}
        >
          Comment
        </button>

      </div>

    </div>
  )
}
