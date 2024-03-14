import { useEffect, useState } from "react";
import bookService, { Book } from "../services/book-service";
import { CanceledError } from "../services/api-client";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // getAll
    const { request, cancel } = bookService.getAll<Book>();
    request
      .then((res) => {
        setLoading(false);
        setBooks(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // });

    return () => cancel();
  }, []);

  return { books, error, isLoading, setError, setBooks };
};

export default useBooks;
