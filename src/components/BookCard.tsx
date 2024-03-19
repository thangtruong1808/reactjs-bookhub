import { useAppContext } from "./context/bookContext.js";

import { Link } from "react-router-dom";

import { Book } from "../services/book-service";
import { AiFillStar } from "react-icons/ai";

interface BookCard {
  book: Book;
  // onDetail: (id: number) => void;
}
const BookCard = ({ book }: BookCard) => {
  // console.log("book.genres: " + book.genres);

  const { favorites, AddToFavorites, RemoveFromFavorites } = useAppContext();

  const favoritesChecker = (id: number) => {
    const boolean = favorites.some((book: Book) => book.id === id);
    return boolean;
  };
  return (
    <>
      <div
        className="rounded-4 p-0 m-0 mb-3 shadow-lg position-relative"
        style={{ width: "14rem", height: "23rem" }}
      >
        <Link to={"/book/" + book.id}>
          <img
            className="rounded-top-4 card-img-top"
            src={book.image_url}
            alt={book.title}
            style={{
              width: "100%",
              height: "10rem",
              imageRendering: "auto",
              objectFit: "fill",
            }}
          />
        </Link>
        <div className="card-body">
          <p className="fw-bold text-center m-1">{book.title}</p>
          <p className="mx-2 m-1">
            Author:
            <span className="fw-bold badge rounded-pill author-bg-info mx-1">
              {book.authors}
            </span>
          </p>
          <p className="mx-2 m-1">No pages: {book.num_pages}</p>
          <p className="mx-2 m-1">
            Rating: {book.rating}
            <AiFillStar className="text-warning fs-5 mb-1 mx-1" />
          </p>
          <div className="">
            {favoritesChecker(book.id) ? (
              <button
                className="p-2 fw-bold rounded-bottom-4 position-absolute bottom-0 w-100 btn btn-card-remove btn-sm"
                onClick={() => RemoveFromFavorites(book.id)}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="p-2 fw-bold rounded-bottom-4 position-absolute bottom-0 w-100 btn btn-card"
                onClick={() => AddToFavorites(book)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
