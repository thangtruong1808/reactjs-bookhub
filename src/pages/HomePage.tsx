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
        <div className="d-lg-none d-md-block mt-5 w-75 mx-5">
          {/* <SearchBar onSearch={HandleOnSearchInPut} /> */}
          <SearchBar />
        </div>
        <div className="fw-bold fs-5 mt-3 mx-5 mb-2 ">
          <div className="hstack gap-3">
            <span>Filter by Author name</span>
            <ThemeSwitch />
          </div>
        </div>
        <div className="w-50 mt-3 mx-5">
          <AuthorFilter />
        </div>

        <div className="fs-5 fw-bold mb-3 mx-5 mt-4 text-center">
          {filteredItems.length > 0 && (
            <span>Total: {filteredItems.length} books</span>
          )}
        </div>
      </div>

      <div className="container-xxl mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-2 d-none d-lg-block text-center border-end mt-3">
            <AsideBar />
          </div>
          <div className="col-12 col-lg-10 row row-cols-4 justify-content-around mt-3">
            {isLoading && (
              <div className="fs-5 w-50 text-center">
                <p className="spinner-border"></p>
                <br />
                <p className="w-100 mt-2">
                  Loading in progress, please wait ...
                </p>
              </div>
            )}
            {!isLoading && filteredItems.length === 0 && (
              <div className="fs-5 w-50 text-center">
                Hey, No books found, please update filters.
              </div>
            )}

            <BookList books={filteredItems} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
