import React from "react";
import { Carousel } from "../Carousel";
import './Actor.scss';

export const Actor = ({
  actorMoviesList,
  profile_path,
  name,
  biography,
  place_of_birth,
}) => {

  return <>
    <div className="actor">
      <div className="actor__promo">
        <img src={`https://image.tmdb.org/t/p/w300/${profile_path}`} alt={'image'} />
        <div className="actor__short-info">
          <h2 className="actor__name">
            {name}
          </h2>
          <span>{place_of_birth}</span>
        </div>
      </div>

      <div className="actor__further-details">
        <div className="actor__info">
          <div className="actor__biography">
            {biography}
          </div>
        </div>
        {!!actorMoviesList.length && <Carousel items={actorMoviesList} currentTag='movie'/>}
      </div>
    </div>

  </>
}

