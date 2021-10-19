import React from "react";
import './Paginator.scss';


const handleButtons = (page, total) => {

  if (total <= 6) {
    return total === 1
      ? []
      : [...Array(total).keys()].map(index => ++index);
  }

  if (page <= 4 || page >= total - 3) {
    return page <= 4
      ? [1, 2, 3, 4, 5, false, total]
      : [1, false, total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, false, page - 1, page, page + 1, false, total - 1]
}

export const Paginator = ({ countPage, currentPage, onSetCurrentPage }) => {


  const pages = handleButtons(currentPage, countPage)

  return (
    <div className="paginator">
      <div className="paginator__extra">
        <button
          className="paginator__button"
          disabled={currentPage < 20}
          value={currentPage - 10}
          onClick={onSetCurrentPage}
        >
          {"< 10"}
        </button>
        <button
          className="paginator__button"
          disabled={currentPage < 150}
          value={currentPage - 100}
          onClick={onSetCurrentPage}
        >
          {"< 100"}
        </button>

        <button
          className="paginator__button"
          disabled={countPage - 150 < currentPage}
          value={currentPage + 100}
          onClick={onSetCurrentPage}
        >
          {"100 >"}
        </button>

        <button
          className="paginator__button"
          disabled={countPage - 20 < currentPage}
          value={currentPage + 10}
          onClick={onSetCurrentPage}
        >
          {"10 >"}
        </button>
      </div>
      <div className="paginator__basic">
        <button
          className="paginator__button paginator__button--left "
          disabled={currentPage === 1}
          value={currentPage - 1}
          onClick={onSetCurrentPage}
        >
          {"<"}
        </button>
        {
          pages.map((page, index) => {
            return <button
              className="paginator__button"
              key={index}
              disabled={page === currentPage || !page}
              value={page}
              onClick={onSetCurrentPage}
            >
              {page === false ? '...' : page}
            </button>
          })
        }
        <button
          className="paginator__button paginator__button--right"
          disabled={currentPage === countPage}
          value={currentPage + 1}
          onClick={onSetCurrentPage}
        >
          {">"}
        </button>
      </div>

    </div>
  )
}

