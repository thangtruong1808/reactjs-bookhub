import { useEffect, useState } from "react";
import { Book } from "../services/book-service";
import useBookQueryStore from "./store";
import { useNavigate } from "react-router-dom";

const AsideBar = () => {
  const navigate = useNavigate();

  const genresSelected = useBookQueryStore((state) => state.genresSelected);
  const setGenresSelected = useBookQueryStore(
    (state) => state.setGenresSelected
  );
  const [selectedFilterGenres, setSelectedFilterGenres] = useState<string[]>(
    []
  );
  const [allGenres, setAllGenres] = useState([
    "Childrens",
    "Contemporary",
    "Classics",
    "Young Adult",
    "Fiction",
    "Dystopia",
    "Fantasy",
    "Science Fiction",
    "Historical",
    "Historical Fiction",
    "Academic",
    "School",
    "Romance",
    "Paranormal",
    "Vampires",
    "Literature",
    "Politics",
    "Novels",
    "Read For School",
  ]);
  console.log("genresSelected : " + genresSelected);

  // useEffect(() => {
  // }, [genresSelected]);

  const handleFilterGenre = (genre: string) => {
    if (genresSelected?.includes(genre)) {
      // console.log("---you are here 1---");
      const filters = genresSelected.filter((element) => element !== genre);
      setGenresSelected(filters);
    } else {
      // console.log("---you are here 2---");
      setGenresSelected([...(genresSelected ?? []), genre]);
    }
    navigate("/");
  };
  // const UpdateSelectedGenres = () => {
  //   console.log("---you called UpdateSelectedGenres---");
  //   setGenresSelected(genresSelected as string[]);
  // };

  return (
    <>
      <div className="fw-bold text-uppercase">Advanced Filter</div>
      <hr />
      <div className="accordion" id="accordionExample">
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span className="fw-bold fs-5 text-center btn-primary">
                Genres
              </span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            {allGenres.sort().map((genre, index) => (
              <div
                className="form-check accordion-body hstack form-check ms-4 "
                key={index}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={genre}
                  checked={genresSelected?.includes(genre) ? true : false}
                  onChange={() => handleFilterGenre(genre)}
                  value={genre}
                />
                <label
                  onClick={() => handleFilterGenre(genre)}
                  className={
                    genresSelected?.includes(genre)
                      ? "form-check-label ms-2 fw-bold text-primary"
                      : "form-check-label ms-2 "
                  }
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideBar;
