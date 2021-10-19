import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import './Header.scss';



import { AppContext } from "../../App";
import { Navigation } from '../Navigation';






export const Header = ({ setOpenCart, products }) => {
  const [newProductAdded, setNewProductAdded] = useState(false)


  const {
    currentGenre,
    availableGenreList,
    setDefaultState,
    handleNavigation,
    userRequest

  } = useContext(AppContext)




  useEffect(() => {
    if (!products.length) return;

    setNewProductAdded(true)

    setInterval(() => {
      setNewProductAdded(false)
    }, 2000);

  }, [products.length])

  return (
    <div className="header">

      <h1 className="header__title">Movie Store</h1>

      <div
        className={classNames(
          'header__cart',
          {
            'header__cart--include-product': !!products.length,
            'header__cart--product-added': newProductAdded,
          }
        )}
        onClick={() => setOpenCart(true)}
      >
        <span className="header__cart--product-count">{products.length}</span>
        🛒
      </div>
      <Navigation
        currentGenre={currentGenre}
        availableGenreList={availableGenreList}
        handleNavigation={handleNavigation}
        userRequest={userRequest}
        setDefaultState={setDefaultState}
      />

    </div>


  )
}
