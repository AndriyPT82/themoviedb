import React, { useState, useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import { AppContext } from '../../App';
import { Comments } from '../Comments'
import { Carousel } from "../Carousel";
import './Movie.scss';

export const CommentsContext = React.createContext();

export const Movie = ({ movieActorsList, setTagsList, closePopup }) => {

  const { chosenMovie, handleNavigation, setCart, cartGoodsIds } = useContext(AppContext);
  const {
    id,
    poster_path,
    release_date,
    vote_average,
    original_title,
    overview,
    genres
  } = chosenMovie;

  const [comments, setComments] = useState(null);
  const [openComments, setOpenComments] = useState(false)
  const commentsRef = useRef()

  useEffect(() => {
    const data = localStorage.getItem('data');
    const comments = JSON.parse(data)

    setComments(comments[id] || [])

    return () => {
      const data = localStorage.getItem('data');
      const parseComment = JSON.parse(data)

      parseComment[id] = commentsRef.current;
      localStorage.setItem('data', JSON.stringify(parseComment))
    }
  }, [])

  useEffect(() => {
    commentsRef.current = comments;
  }, [comments])

  const presenceInCart = cartGoodsIds.includes(id)

  return (
    <div className="movie">
      <div className="movie__promo">
        <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={poster_path} />

        <span>
          {`relise: ${release_date}`}
        </span>
        <span>
          {`IMDB: ${vote_average}`}
        </span>

        <span>
          Price: {(vote_average * 3).toFixed(2)}$
        </span>

        <button
          className={classNames(
            'movie__buy-button',
            { 'movie__buy-button--disabled': presenceInCart }
          )}
          onClick={() => {
            closePopup()
            setCart(state => ([...state, chosenMovie]))
          }}
        >
          {presenceInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>

      <div className="movie__further-details">
        <div className="movie__about">
          {openComments
            ? (
              <CommentsContext.Provider value={setComments}>
                <Comments
                  comments={comments}
                  setTagsList={setTagsList}
                  setOpenComments={setOpenComments}
                />
              </CommentsContext.Provider>
            )

            : (
              <div className="movie__info">

                <h2 className="movie__title">
                  {original_title}
                </h2>
                <div className="movie__overview">
                  {overview}
                </div>
                <div className="movie__genres">
                  <h3>Genres:</h3>
                  <ul>
                    {
                      genres.map(genre => (
                        <li
                          className="movie__genre"
                          key={genre.id}
                          onClick={() => {
                            handleNavigation({
                              target: {
                                name: 'currentGenre', value: genre.id
                              }
                            })
                            closePopup()
                          }}
                        >
                          {genre.name}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <span
                  className="movie__comments"
                  onClick={() => {
                    setTagsList(state => ({ ...state, comments: true }))
                    setOpenComments(!openComments)
                  }}

                >
                  comments...
                </span>
              </div>
            )
          }
        </div>
        {!movieActorsList.length ||!openComments&& <Carousel items={movieActorsList} />}
      </div>
    </div>
  )
}
