import classNames from "classnames";
import React, { useState } from "react";
import { SearchInput } from "../SearchInput";
import './Navigation.scss';


export const Navigation = ({ availableGenreList, handleNavigation, currentGenre, userRequest, setDefaultState }) => {

  const [isVisibleInput, setIsVisibleInput] = useState(false)

  const getGenreTitle = () => {
    if (!currentGenre) return 'Popularity';
    const genre = availableGenreList.find(obj => obj.id === currentGenre)
    return genre.name;
  }

  const genreTitle = getGenreTitle();


  return (
    <div
      className={classNames(
        'navigation',
      )}
    >
      <div className="navigation__tags">
        <span
          className={classNames(
            'navigation__tag',
            { 'navigation__tag--active': !userRequest }
          )}
          onClick={() => {
            setIsVisibleInput(false)
            setDefaultState()
          }}
        >
          {!isVisibleInput || !userRequest ? genreTitle : 'Home Page'}
        </span>
        <span
          className={classNames(
            'navigation__tag movies__tag--user-search',
            { 'navigation__tag--active': !!userRequest }
          )}
          hidden={!userRequest}
        >
          User Search
        </span>


      </div>

      <div className="navigation__inputs">
        <label hidden={isVisibleInput}>
          <span>
            Category:
          </span>
          <select
            name="currentGenre"
            value={currentGenre}
            onChange={handleNavigation}
          >
            <option value='' >Popularity</option>
            {
              (availableGenreList || []).map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))
            }
          </select>
        </label>


        <label hidden={isVisibleInput}>
          <span>
            Sort By:
          </span>
          <select
            name="sortKey"
            onChange={handleNavigation}
          >
            <option value='popularity.desc'>Popularity: &#8600;</option>
            <option value="popularity.asc">Popularity: &#8599;</option>
            <option value="vote_average.desc">Rating: &#8600;</option>
            <option value="vote_average.asc">Rating: &#8599;</option>
          </select>
        </label>

        {isVisibleInput && <SearchInput />}

        <span
          className="navigation__input-opener"
          onClick={() => {
            !isVisibleInput
              ? setIsVisibleInput(!isVisibleInput)
              :
                setIsVisibleInput(!isVisibleInput)
                setDefaultState()
          }}>

          {!isVisibleInput ? '🔍 ' : 'X'}
        </span>

      </div>

    </div>
  )
}

