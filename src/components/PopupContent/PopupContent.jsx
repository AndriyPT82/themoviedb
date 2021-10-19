
import React, { useState, useContext, useEffect } from "react";
import { getMovieActorsList, getPerson, getActorMoviesList, getMovie } from '../../api/API'
import { AppContext } from '../../App';
import classNames from 'classnames';
import './PopupContent.scss';
import { Movie } from "../Movie";
import { Actor } from '../Actor';

export const PopupContentContext = React.createContext();

export const PopupContent = ({ toClose, closePopup }) => {

  const [tagsList, setTagsList] = useState({
    movie: true,
    actor: false,
    comments: false
  })

  const [movieActorsList, setMovieActorsList] = useState([])
  const [currentActor, setCurrentActor] = useState(null)
  const [actorMoviesList, setActorMoviesList] = useState([])

  const {  id: movieId, handleChosenMovieId } = useContext(AppContext);

  useEffect(() => {
    getMovieActorsList(movieId)
      .then(data => {
        const director = data.crew.find(obj => obj.job === 'Director')
        const actors = [director, ...data.cast].filter(actor => !!actor.profile_path)
        setMovieActorsList(actors);
      })
  }, [movieId])

  const handleUserChoise = (data) => {
    const { id, tag } = data;
    if (tag === 'movie') {
      handleChosenMovieId(id)
      setTagsList(state => ({...state, movie: true, actor: false}))
      return;
    }


    Promise.all([getPerson(id), getActorMoviesList(id)])
      .then(data => {
        const actorData = data[0];
        const actorMoviesList = data[1].cast.filter(movie => movie.backdrop_path && movie.poster_path);
        
        setTagsList({ ...tagsList, actor: true, movie: false })
        setCurrentActor(actorData)
        setActorMoviesList(actorMoviesList)
      })
  }

  return (
    <div
      className={classNames(
        "popup-content",
        { 'popup__to-close': toClose }
      )}
    >
      <button
        type="button"
        hidden={tagsList.comments}
        className={classNames(
          'popup-content__tag-button',
          'popup-content__tag-button--movie',
          { 'popup-content__tag-button--active': tagsList.movie }
        )}
        onClick={() => setTagsList({ ...tagsList, movie: true })}
      >
        movie
      </button>
      <button
        type="button"
        hidden={tagsList.comments || !tagsList.actor}
        className={classNames(
          'popup-content__tag-button',
          'popup-content__tag-button--actor',
          { 'popup-content__tag-button--active': tagsList.actor && !tagsList.movie }
        )}
        onClick={() => setTagsList({ ...tagsList, movie: false, actor: true })}
      >
        actor
      </button>
      <div
        className="popup-content--closer"
        onClick={() => closePopup()}
      >
        &#x2715;
      </div>

      <PopupContentContext.Provider
        value={{
          handleUserChoise,
          movieActorsList,
        }}
      >
        {
          tagsList.movie
            ? <Movie
              movieActorsList={movieActorsList}
              setTagsList={setTagsList}
              closePopup={closePopup}
            />
            : <Actor
              {...currentActor}
              closePopup={closePopup}
              actorMoviesList={actorMoviesList}
            />
        }
      </PopupContentContext.Provider>
    </div>
  )
}
