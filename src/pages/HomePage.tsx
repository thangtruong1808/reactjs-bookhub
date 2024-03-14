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
  // const searchText = useBookQueryStore((s) => s.bookQuery.searchText);
  // const setSearchText = useBookQueryStore((s) => s.setSearchText);

  // const genresSelected = useBookQueryStore((s) => s.bookQuery.genresSelected);
  // const setGenresSelected = useBookQueryStore((s) => s.setGenresSelected);
  // // setGenresSelected(genresSelected);

  // const authorSelected = useBookQueryStore((s) => s.bookQuery.authorSelected);
  // const setAuthorSelected = useBookQueryStore((s) => s.setAuthorSelected);

  const searchText = useBookQueryStore((state) => state.searchText);
  const setSearchText = useBookQueryStore((state) => state.setSearchText);

  const genresSelected = useBookQueryStore((state) => state.genresSelected);

  const authorSelected = useBookQueryStore((state) => state.authorSelected);

  const [filteredItems, setFilteredItems] = useState<Book[]>([]);
  const { books, isLoading } = useBooks();

  // const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("------- You called Home Component -------");
    // setSearchText(searchText);
    // setGenresSelected(genresSelected);
    // setAuthorSelected(authorSelected);

    FilteredData(books, searchText);
  }, [books, genresSelected, searchText]);

  const FilteredData = (books: Book[], searchText: string | undefined) => {
    // console.log("-------------------------genresSelected: " + genresSelected);
    // if (genresSelected !== undefined) {
    //   setGenresSelected(genresSelected);
    // }

    // setGenresSelected(genresSelected);

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
        console.log("genresSelected < 0");

        if (authorSelected) {
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
      <div className="container-xxl">
        <div className="d-lg-none d-md-block mt-5 w-75 mx-5">
          {/* <SearchBar onSearch={HandleOnSearchInPut} /> */}
          <SearchBar />
        </div>
        <div className="fw-bold fs-5 mt-3 mx-5 mb-2 text-capitalize ">
          <div className="hstack gap-3 mx-3">
            <span>Filter by Author Name</span>
            <ThemeSwitch />
          </div>
        </div>
        <div className="w-50 justify-content-center mx-5">
          <AuthorFilter />
        </div>
      </div>
      <div className=" text-center fs-5 fw-bold mb-3 mx-5 mt-5">
        {filteredItems.length > 0 && (
          <span>Total: {filteredItems.length} Books</span>
        )}
      </div>

      <div className="container-xxl mt-2">
        <div className="row justify-content-center">
          <div className="col-lg-2 d-none d-lg-block text-center border-end">
            <AsideBar />
          </div>
          <div className="col-12 col-lg-10 row row-cols-4 justify-content-around">
            <BookList books={filteredItems} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
