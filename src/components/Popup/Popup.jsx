import React, { useState, useEffect } from "react";
import classNames from "classnames";
import './Popup.scss';
import { PopupContent } from '../PopupContent';


export const Popup = ({ popupBackground, setChosenMovie, handleChosenMovieId }) => {

  const [toClose, setToClose] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, [])

  const closePopup = (id) => {
    setTimeout(() => {
      if (!id) {
        setChosenMovie(null)
        return;
      }
      handleChosenMovieId(id)
    }, 500);

    setToClose(true)
  }

  return (
    <div
      className={classNames(
        "popup",
        { 'popup__to-close': toClose }
      )}
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780${popupBackground})` }}
      onClick={(event) => {
        const { target, currentTarget } = event;
        if (target !== currentTarget) return;
        closePopup()
      }}
    >
      <PopupContent
        toClose={toClose}
        closePopup={closePopup}
      />
    </div>
  )
}
