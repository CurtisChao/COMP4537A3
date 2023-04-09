import React from "react";

function Pagination({ numberOfPages, currentPage, setCurrentPage }) {
  const pageNums = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {currentPage !== 1 && <button onClick={prevPage}>prev </button>}

      {pageNums.map((num) => {
        if (num < currentPage + 5 && num > currentPage - 5)
          return (
            <>
              <button
                onClick={() => setCurrentPage(num)}
                style={
                  num === currentPage
                    ? { fontWeight: "bold", background: "white", color: "blue" }
                    : {}
                }
              >
                {num}
              </button>
            </>
          );
      })}

      {currentPage !== numberOfPages && (
        <button onClick={nextPage}>next</button>
      )}
    </div>
  );
}

export default Pagination;