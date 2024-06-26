import { Book } from "../services/book-service";
import { useAppContext } from "../components/context/bookContext";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyPagination from "../components/MyPagination";
import { paginate } from "../services/paginate.js";

const BookCart = () => {
  const navigate = useNavigate();
  const { favorites, RemoveFromFavorites } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  // const [myResult, setMyResult] = useState(null);

  const numberUnitsPerPageSize = 5;
  const itemsCount = favorites.length;
  const pageSize = numberUnitsPerPageSize;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = (page: number) => {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  };
  const handleNextPage = (page: number) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (page < pagesCount) {
      setCurrentPage(page + 1);
    }
  };
  const myResult = paginate(favorites, currentPage, numberUnitsPerPageSize);
  if (myResult.length < 1) {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center container-xxl mt-3 text-center">
        {favorites.length === 0 ? (
          <div className="flex-column mb-5 fw-bold fs-2">
            <span>Your Cart is empty</span>
            <button
              className="btn btn-card mt-3 d-flex justify-content-center"
              style={{ width: "280px" }}
              onClick={() => navigate("/")}
            >
              Continue to browse
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <h1 className="text-center fw-bold fs-2 my-3">Your Cart</h1>
            <table className="table table-bordered table-hover">
              <thead className="table-dark text-center text-white">
                <tr>
                  <th scope="col">ID</th>
                  <th>Photo</th>
                  <th>Title</th>
                  <th>Authors</th>
                  {/* <th>Edition</th> */}
                  <th className="d-none d-md-table-cell">Num_Pages</th>
                  <th className="d-none d-md-table-cell">Genres</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {myResult.sort().map((unit: Book) => (
                  <tr key={unit.id} className="text-center align-middle ">
                    <td className="custom-font-color">{unit.id}</td>
                    <td>
                      <img
                        src={unit.image_url}
                        alt={unit.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td className="custom-font-color">{unit.title}</td>
                    <td className="custom-font-color">{unit.authors}</td>
                    {/* <td className="text-center">
                      {unit.edition.length === 0 ? "N/A" : unit.edition}
                    </td> */}
                    <td className="custom-font-color d-none d-md-table-cell">
                      {unit.num_pages}
                    </td>
                    <td className="custom-font-color d-none d-md-table-cell">
                      {unit.genres as unknown as []}
                    </td>
                    <td className="custom-font-color">
                      {unit.rating}
                      <AiFillStar className="text-warning fs-5 mb-1" />
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => RemoveFromFavorites(unit.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="fw-bold fs-5 custom-font-color">
                    Total:
                  </td>
                  <td colSpan={7} className=" text-start fw-bold fs-5">
                    <span className="custom-font-color">
                      {favorites.length} items
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
            {favorites.length > numberUnitsPerPageSize && (
              <MyPagination
                itemsCount={itemsCount}
                pageSize={numberUnitsPerPageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BookCart;
