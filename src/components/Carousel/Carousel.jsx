import React, { useState, useContext } from "react";
import { PopupContentContext } from '../PopupContent';
import './Carousel.scss';

export const Carousel = React.memo(({ items, currentTag }) => {

  const { handleUserChoise } = useContext(PopupContentContext)

  return (
    <div className="carousel">
      <div className="carousel__box-items">
        <ul className="carousel__items">
          {
            !!items && items.map(item => (
              <li
                className="carousel__item"
                onClick={() => handleUserChoise({ id: item.id, tag: currentTag })}
                key={item.id}
              >
                <img src={`https://image.tmdb.org/t/p/w200/${item.profile_path || item.poster_path}`} alt={item.title || item.title} />
                <h3 >{item.name || ''}</h3>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
})
