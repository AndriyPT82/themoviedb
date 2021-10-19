import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import './SearchInput.scss';

const debounce = (f, delay) => {
  let timer;

  return (args) => {
    clearTimeout(timer)
    timer = setTimeout(f, delay, args);
  }
}

export const SearchInput = () => {

  const [inputValue, setInputValue] = useState('')
  const [valueToFetch, setValueToFetch] = useState('')

  const { userRequest, setUserRequest } = useContext(AppContext);

  const debouncedMovies = useCallback(
    debounce(setValueToFetch, 1000)
    , [])

  debouncedMovies(inputValue)

  useEffect(() => {
    if (!valueToFetch) return;
    setUserRequest(valueToFetch)
  }, [valueToFetch])

  return (
    // <div className="search">
      <input
        type="text"
        autoFocus={true}
        className="search"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}

      />
    // </div>
  )
}
