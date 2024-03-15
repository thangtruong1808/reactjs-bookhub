import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import book_detail_service, { BookProps } from "../services/bookdetail-service";
import { CanceledError } from "axios";
import { AiFillStar } from "react-icons/ai";
import useBookQueryStore from "../components/store";

const BookDetail = () => {
  const setSearchText = useBookQueryStore((s) => s.setSearchText);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const [bookID, setBookID] = useState<string | undefined>();
  const [bookdetail, setBookDetail] = useState<BookProps>();

  const { ID } = useParams();

  const navigate = useNavigate();

  const handleBackHomePage = () => {
    setSearchText("");
    navigate("/");
  };
  useEffect(() => {
    setLoading(true);
    setBookID(ID);
    const { request, cancel } = book_detail_service.getSingle(bookID);
    request
      .then((res) => {
        setLoading(false);
        setBookDetail(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => cancel();
  }, [bookID]);
  return (
    <>
      <div className="container mt-5 vh-100">
        {isLoading && (
          <div className="text-center mt-5 fs-5 w-100">
            <p className="spinner-border "></p>
            <br />
            <p className=" w-100"> Loading in progress, please wait ...</p>
          </div>
        )}

        {!isLoading && (
          <div className="hstack">
            <div>
              <img
                src={bookdetail?.image_url}
                alt={bookdetail?.title}
                style={{ width: "15rem", height: "25rem" }}
              />
            </div>
            <div className="cart-body">
              <p className="fs-2 fw-bold mx-5">{bookdetail?.title}</p>
              <p className="fs-5 mx-5 ">
                <span className="fw-bold ">Author:</span>
                <span className="badge author-bg-info text-dark mx-2">
                  {bookdetail?.authors}
                </span>
              </p>
              <p className="fs-6 mx-5">
                <span className="fw-bold">Genres:</span>
                <span className="mx-2">{bookdetail?.genres}</span>
              </p>
              <p className="fs-6 mx-5">
                <span className="fw-bold">Description:</span>
                <span className="mx-2">{bookdetail?.description}</span>
              </p>
              <p className="fs-6 mx-5">
                <span className="fw-bold">Rating:</span>
                <span className="badge bg-light text-dark fs-6 mx-2">
                  {bookdetail?.rating}
                </span>
                <AiFillStar className="text-warning fs-4 mb-1" />
                <span className="mx-5">
                  Pages:{" "}
                  <span className="badge bg-secondary fs-6">
                    {bookdetail?.num_pages}
                  </span>
                </span>
              </p>
              <button
                className="btn btn-card mx-5"
                // onClick={() => navigate("/")}
                onClick={handleBackHomePage}
                style={{ width: "10rem" }}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetail;

{
  /* <div className="card" style={{ width: "18rem" }}>
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </p>
    <a href="#" className="btn btn-primary">
      Go somewhere
    </a>
  </div>
</div>; */
}
