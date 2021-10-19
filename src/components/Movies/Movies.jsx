import React from "react";
import './Movies.scss';
import { Card } from '../Card';

export const Movies = ({ movies, currentPage, countPage }) => {

  return (
    <ul className="movies">

      {
        !movies.length
          ? <h1>'No Movies'</h1>
          : (
            movies.map(movie => (
              <React.Fragment key={movie.id}>
                <Card
                  movie={movie}
                />
              </React.Fragment>
            ))
          )

      }
      {
        !!movies.length && (
          <span className="movies__page-info">
            {`Page: ${currentPage} ${currentPage !== countPage ? `- ${countPage}` : ''}`}
          </span>
        )
      }
    </ul>
  )
}

