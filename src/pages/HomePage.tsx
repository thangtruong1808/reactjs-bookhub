import { useEffect, useState } from "react";
import AsideBar from "../components/AsideBar";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import ThemeSwitch from "../components/ThemeSwitch";
import AuthorFilter from "../components/AuthorFilter";
import useBooks from "../hooks/useBooks";
import useBookQueryStore from "../components/store";
import { Book } from "../services/book-service";

const HomePage = () => {
  const searchText = useBookQueryStore((state) => state.searchText);
  const genresSelected = useBookQueryStore((state) => state.genresSelected);
  const authorSelected = useBookQueryStore((state) => state.authorSelected);

  const [filteredItems, setFilteredItems] = useState<Book[]>([]);
  const { books, isLoading } = useBooks();

  useEffect(() => {
    console.log("------- You called Home Component -------");

    FilteredData(books, searchText);
  }, [books, genresSelected, searchText, authorSelected]);

  const FilteredData = (books: Book[], searchText: string | undefined) => {
    let filteredBooks: Book[] = books;
    // Filtering Input Items
    if (searchText) {
      console.log("You called SearchTextInPut");
      const filteredItemsInput = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
      filteredBooks = filteredItemsInput;
      // START search Genre
      if ((genresSelected ?? []).length > 0) {
        const tempBookArray: Book[] = [];
        (genresSelected ?? []).forEach((e) => {
          filteredBooks.filter((book: Book) => {
            if (book.genres.indexOf(e) !== -1) {
              tempBookArray.push(book);
              // }
            }
          });
        });
        const result = removeDUplicates(tempBookArray);
        // Author Filter
        if (authorSelected) {
          const res = result.filter((book) => book.authors === authorSelected);
          setFilteredItems(res);
        } else {
          setFilteredItems(result);
        }
      } else {
        if (authorSelected) {
          const res = filteredBooks.filter(
            (book) => book.authors === authorSelected
          );
          setFilteredItems(res);
        } else {
          setFilteredItems(filteredBooks);
        }
      }
      // END search Genre
    }
    if (!searchText) {
      console.log("You are here NOT SEARCHTEXT");
      // START search Genre
      if ((genresSelected ?? []).length > 0) {
        console.log("genresSelected > 0: " + genresSelected?.length);
        const tempBookArray: Book[] = [];
        (genresSelected ?? []).forEach((e) => {
          filteredBooks.filter((book) => {
            if (book.genres.indexOf(e) !== -1) {
              // console.log("book.genres: " + book.genres);
              console.log("genresSelected IS: " + e);
              tempBookArray.push(book);
            }
          });
        });
        const result = removeDUplicates(tempBookArray);
        console.log("result : " + result.length);
        console.log("genresSelected after removeDUplicates: " + genresSelected);

        // Author Filter
        if (authorSelected) {
          const res = result.filter((book) => book.authors === authorSelected);
          setFilteredItems(res);
        } else {
          console.log("authorSelected IS NOT: ");

          setFilteredItems(result);
        }
      } else {
        if (authorSelected) {
          console.log("--- you called authorSelected - - -" + authorSelected);
          const res = books.filter((book) => book.authors === authorSelected);
          setFilteredItems(res);
        } else {
          setFilteredItems(books);
        }
      }
      // END search Genre
    }
  };

  // remove duplicates object
  function removeDUplicates(data: Book[]) {
    // return data.filter(
    //   (book, index, self) => index === self.findIndex((b) => b.id === book.id)
    // );
    return data.filter((value, index) => data.indexOf(value) === index);
  }

  // console.log("genresSelected 2: " + genresSelected);

  return (
    <>
      <div className="container-xxl mt-3">
        <div className="d-lg-none d-md-block  mt-5 w-100 ">
          {/* <SearchBar onSearch={HandleOnSearchInPut} /> */}
          <SearchBar />
        </div>
        <div className="fw-bold fs-6 mt-3 mb-2 hstack">
          <span className=""> Filter by Author </span>
          <span className="ms-3">
            <AuthorFilter />
          </span>
        </div>
        {/* <div className="w-50 mt-3 mx-5">
          <AuthorFilter />
        </div> */}
        {!isLoading && (
          <div className="fs-5 fw-bold mb-4 mx-5 mt-5 text-center">
            {filteredItems.length > 0 && (
              <span>Total: {filteredItems.length} books</span>
            )}
          </div>
        )}
      </div>

      <div className="container-xxl mt-3">
        {/* justify-content-center */}
        <div className="row">
          {/* d-none row-cols-lg-2 d-lg-block text-center border-end mt-3 */}
          <div className="d-none col-lg-2 d-lg-block text-center">
            <AsideBar />
          </div>
          {/* col-12 col-lg-10 row row-cols-4 justify-content-around mt-3 */}
          <div className="col-auto col-lg-10 row row-cols-5 d-flex justify-content-around ">
            {isLoading ? (
              <div className="fs-6 w-100 text-center mt-5">
                <p className="spinner-border"></p>
                <br />
                <p className="w-100 mt-2">
                  Loading in progress, please wait ...
                </p>
              </div>
            ) : (
              <BookList books={filteredItems} />
            )}
            {!isLoading && filteredItems.length === 0 && (
              <div className="fs-6 w-50 text-center mt-5">
                Hey, no books found, please update filters.
              </div>
            )}

            {/* <BookList books={filteredItems} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
