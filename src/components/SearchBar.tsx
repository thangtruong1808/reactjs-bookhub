import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useBookQueryStore from "./store";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  //   const searchText = useBookQueryStore((state) => state.searchText);
  const setSearchText = useBookQueryStore((state) => state.setSearchText);
  const navigate = useNavigate();
  //  const searchText = useBookQueryStore((state) => state.searchText);
  //  const setSearchText = useBookQueryStore((state) => state.setSearchText);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate("/");
        }
      }}
    >
      <div className="input-group">
        <input
          // onChange={HandleOnChange}
          id="searchTextInput"
          ref={ref}
          className="form-control bg-light"
          type="search"
          placeholder="Search by title . . . "
        />

        <button
          className="btn btn-card"
          type="submit"
          id="btn_search"
          style={{ width: "70px" }}
        >
          <BsSearch style={{ fontSize: "20px" }} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
