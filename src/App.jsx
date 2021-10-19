import React, { useEffect, useState } from 'react';
import './App.scss';
import { getData, getAvailableGenreList, getMovie, getUserRequest } from './api/API';
import { Header } from './components/Header';
import { Movies } from './components/Movies';
import { Footer } from './components/Footer';
import { Paginator } from './components/Paginator/Paginator';
import { Popup } from './components/Popup';
import { Cart } from './components/Cart';

export const AppContext = React.createContext();

function App() {

  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false)
  const [userRequest, setUserRequest] = useState('')

  const [moviesList, setMoviesList] = useState([])
  const [chosenMovie, setChosenMovie] = useState(null);
  const [navigationData, setNavigationData] = useState({
    currentGenre: '',
    availableGenreList: [],
    sortKey: 'popularity.desc',
  })
  const [paginatorData, setPaginatorData] = useState({
    totalPages: 0,
    currentPage: 1,
  })

  const { currentGenre, availableGenreList, sortKey } = navigationData;
  const { totalPages, currentPage } = paginatorData;

  useEffect(() => {
    if (!userRequest) return;
    getUserRequest(userRequest, currentPage)
      .then(res => {
        setMoviesList(res.results.filter(obj => !!obj.poster_path))
        setPaginatorData({ ...paginatorData, totalPages: res.total_pages })
      })
  }, [userRequest, currentPage])

  useEffect(() => {
    Promise.all([getData(sortKey), getAvailableGenreList()]).then(data => {
      const [films, genreslist] = data;
      setPaginatorData(state => ({ ...state, totalPages: films.total_pages }))
      setNavigationData(state => ({ ...state, availableGenreList: genreslist.genres }))
      setMoviesList(films.results);
    })

    localStorage.setItem('data', JSON.stringify({}));
  }, [])

  useEffect(() => {
    if (!!userRequest.length) return;
    const byGenre = !!currentGenre ? `&with_genres=${currentGenre}` : '';

    getData(sortKey, `${byGenre}&page=${currentPage}`)
      .then(data => {
        setPaginatorData({ ...paginatorData, totalPages: data.total_pages });
        setMoviesList(data.results);
      })
  }, [navigationData, currentPage, userRequest]);


  const setDefaultState = () => {
    setUserRequest('');
    setPaginatorData({ ...paginatorData, currentPage: 1 })

  }

  const handleChosenMovieId = (id) => {
    getMovie(id).then(setChosenMovie);
  }

  const handleNavigation = (event) => {
    const { name, value } = event.target;
    setNavigationData({ ...navigationData, [name]: +value || value });
    setPaginatorData(({ ...paginatorData, currentPage: 1 }));
  }

  const handlePaginator = (event) => {
    const { value } = event.target
    setPaginatorData(state => ({ ...state, currentPage: +value }))
  }

  const cartGoodsIds = cart.map(obj => obj.id)


  console.log(chosenMovie);
  return (
    <AppContext.Provider value={{
      handleNavigation,
      setChosenMovie,
      ...chosenMovie,
      handleChosenMovieId,
      userRequest,
      setUserRequest,
      setDefaultState,
      setCart,
      cartGoodsIds,

      currentGenre,
      availableGenreList,
      setDefaultState,
    }}>
      <div className="App">
        {openCart && <Cart
          openCart={openCart}
          setOpenCart={setOpenCart}
          setCart={setCart}
          movies={cart}
        />}
        {
          !!chosenMovie && <Popup
            setChosenMovie={setChosenMovie}
            popupBackground={chosenMovie.backdrop_path}
            handleChosenMovieId={handleChosenMovieId}

          />
        }
        <Header
          setUserRequest={setUserRequest}
          setOpenCart={setOpenCart}
          products={cart}

        />
        <div className="main">
          {
            <Movies
              countPage={totalPages}
              currentPage={currentPage}
              userRequest={userRequest}
              setDefaultState={setDefaultState}
              movies={moviesList}
            />
          }
          {
            totalPages > 1 && (
              <Paginator
                countPage={totalPages}
                currentPage={currentPage}
                onSetCurrentPage={handlePaginator}
              />
            )
          }
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
