import { useEffect, useState } from "react";
import useBooks from "../hooks/useBooks";
import { Book } from "../services/book-service";
import BookCard from "./BookCard";
import useBookQueryStore from "./store";

interface Props {
  books: Book[];
  isLoading: boolean;
}

const BookList = ({ books, isLoading }: Props) => {
  return (
    <>
      {/* {error && <h5 className="text-danger"> {error}</h5>} */}
      {isLoading && (
        <div className="text-center mt-5">
          <p className="spinner-border "></p>
          <br />
          <p className="fw-bold fs-4 w-100 mt-2">Loading...</p>
        </div>
      )}
      {!isLoading && books.length === 0 ? (
        <div
          className="text-uppercase fs-6 fw-bold mt-5 w-50"
          // style={{ width: "550px" }}
        >
          Sorry, No books found, Please update filters.
        </div>
      ) : (
        ""
      )}
      {books.map((book, index) => (
        <BookCard book={book} key={index} />
      ))}
    </>
  );
};

export default BookList;
