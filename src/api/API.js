const API_KEY = '0c80bada61f7914facf2a24b8adcdf66'

const request = async (endPoint) => {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/${endPoint}`)
    const json = await response.json();

    return json;  

  } catch (error) {
    console.log(error);
  }
}



export const getData = (sortKey='', currentGenre='') => {
  return request(`discover/movie?api_key=${API_KEY}&sort_by=${sortKey}${currentGenre}&vote_count.gte=200&language=en-US`);
};

export const getAvailableGenreList = () => request(`genre/movie/list?api_key=${API_KEY}&language=en-US`);

export const getMovieActorsList = (movieId) => request(`movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)

export const getPerson = (personId) => request(`person/${personId}?api_key=${API_KEY}&language=en-US`)

export const getActorMoviesList = (actorId) => request(`person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`)

export const getMovie = (movieId) => request(`movie/${movieId}?api_key=${API_KEY}&language=en-US`)

export const getUserRequest = (query, page=1) => request(`search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&sort_by=vote_average.asc&query=${query}&page=${page}&original_language=en-US`)

