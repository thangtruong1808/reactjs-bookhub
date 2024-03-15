import { useEffect, useState } from "react";
import useBooks from "../hooks/useBooks";
import { Book } from "../services/book-service";
import BookCard from "./BookCard";
import useBookQueryStore from "./store";

interface Props {
  books: Book[];
}

const BookList = ({ books }: Props) => {
  return (
    <>
      {books.map((book, index) => (
        <BookCard book={book} key={index} />
      ))}
    </>
  );
};

export default BookList;
