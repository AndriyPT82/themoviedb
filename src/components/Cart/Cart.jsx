import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Card } from "../Card";
import './Cart.scss';


export const Cart = ({ setOpenCart, movies, setCart }) => {

  const [showContent, setShowContent] = useState(false);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setShowContent(true)
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'unset';
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const total = movies.reduce((count, obj) => {
      const moviePrice = +(obj.vote_average * 3).toFixed(2);
      count += moviePrice
      return count;
    }, 0);

    setTotalPrice(total);
  }, [movies])

  const handleShowContent = (event) => {
    if (event.target !== event.currentTarget) return;
    setShowContent(false)

    setTimeout(() => {
      setOpenCart(false)
    }, 500);
  }

  return (
    <div
      className="cart"
      onClick={handleShowContent}
    >
      <div className={classNames(
        'cart__content',
        {
          'cart__content--is-open': showContent,
          'cart__include-product': !!movies.length
        }
      )}
      >
        <div
          className="cart__close-cross"
          onClick={handleShowContent}
        >
          X
        </div>

        <div className="cart__title">Movies</div>
        <div
          className="cart__movies"
        >
          {
            !movies.length
              ? <span className="cart__empty">Cart is Empty</span>
              : movies.map(movie => (
                <div
                  className="cart__movie"
                  key={movie.id}
                >
                  <span
                    className="cart__cancel"
                    onClick={(event) => {
                      const filtered = movies.filter(obj => obj.id !== movie.id)
                      setCart(filtered)
                      !filtered.length && handleShowContent(event);
                    }}
                  >
                    x
                  </span>
                  < Card movie={movie} />

                </div>
              ))
          }
        </div>
        <div className="cart__client-field">
          <div className="cart__client-field--info">
            <span className="cart__goods-count">Movies count: {movies.length}</span>
            <span className="cart__total-price"> Total: ${totalPrice}</span>
          </div>
          <button
            className="cart__button-pay"
            disabled={!movies.length}
            onClick={(event) => {
              setCart([])
              alert('Thank you for shopping')
              handleShowContent(event);
            }}
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  )
}
