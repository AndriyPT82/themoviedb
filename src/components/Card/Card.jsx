import React, { useContext } from "react";
import classNames from 'classnames';
import './Card.scss';
import { AppContext } from '../../App'

export const Card = ({ movie }) => {

  const {
    id,
    original_title,
    poster_path,
    vote_average
  } = movie;

  const { handleChosenMovieId } = useContext(AppContext)

  return (
    <li
      disabled={!!poster_path}
      className={classNames(
        'card',
        { 'card--is-disabled': !poster_path }
      )}
      onClick={() => {
        handleChosenMovieId(id)
      }}
    >
      <span className="card__price"> $ {(vote_average * 3).toFixed(2)}</span>
      <span className="card__ranking">IMDB: {vote_average}</span>
      <img
        className={classNames(
          'card__img',
        )}
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={original_title}
      />
    </li >

  )
}

