import myprofile from "../assets/Feb-2023_avartar.jpg";
import { GiBookshelf } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./context/bookContext.js";
import SearchBar from "../components/SearchBar.js";
import ThemeSwitch from "./ThemeSwitch.js";
import useBookQueryStore from "./store.js";
import GenreMenu from "./GenreMenu.js";

const NavBar = () => {
  const navigate = useNavigate();
  const { favorites } = useAppContext();
  const setSearchText = useBookQueryStore((state) => state.setSearchText);
  const setGenresSelected = useBookQueryStore(
    (state) => state.setGenresSelected
  );
  const setAuthorSelected = useBookQueryStore(
    (state) => state.setAuthorSelected
  );

  const handleBackToHomePage = () => {
    setSearchText("");
    setGenresSelected([]);
    setAuthorSelected("");
    navigate("/");
  };
  return (
    <div
      className="container-fluid d-flex justify-content-between 
                text-center  custom-bg py-3"
    >
      {/* Logo */}
      <div className="cursor-pointer hstack" onClick={handleBackToHomePage}>
        {/* <div className="p-3 Logo" onClick={ReturnHomePage}> */}
        <GiBookshelf style={{ width: "70px", height: "50px" }} className="" />
        <span className=" text-uppercase fw-bold fs-5">bookhub</span>
      </div>

      {/* Search and Menu */}
      <div className="w-50">
        <div className="d-lg-none d-md-block">
          <GenreMenu />
        </div>
        <div className="d-none d-lg-block p-2 ">
          <SearchBar />
        </div>
      </div>
      <div className="py-3 d-none d-lg-block fw-bold  cursor-pointer">
        <ThemeSwitch />
      </div>
      {/* Profile and Cart */}
      <div className="">
        <div className="hstack">
          <button
            type="button"
            className="cursor-pointer me-3 btn btn-ShoppingCart"
          >
            <FiShoppingCart
              style={{ width: "40px", height: "40px" }}
              onClick={() => navigate("/bookcart")}
            />
            <span className="badge text-bg-danger">
              {favorites.length > 0 && favorites.length}
            </span>
          </button>
          <img
            className="rounded me-3 cursor-pointer"
            src={myprofile}
            alt="Logo"
            width={"40px"}
            height={"40px"}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          />
          <div
            className="offcanvas offcanvas-end "
            tabIndex="-1"
            data-bs-scroll="true"
            data-bs-backdrop="true"
            id="offcanvasExample"
            aria-labelledby="offcanvasExample"
          >
            <div className="text-end mt-3 me-3">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-header position-relative ">
              <div className="vstack">
                <div className="hstack gap-2 ">
                  <img
                    className="rounded"
                    src={myprofile}
                    alt="Logo"
                    width={"100px"}
                    height={"100px"}
                  />
                  <div className="vstack mt-1">
                    <span className="fw-bold fs-4 text-uppercase">
                      Thang Truong
                    </span>
                    <span className="fw-bold fs-6">FrontEnd Developer</span>
                    <span className="fw-bold fs-6">
                      thangtruong1808@gmail.com
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <p className="mx-3 fw-bold fs-5">Education</p>
            <p>Swinburne University of Technology in Melbourne</p>
            <hr />
            <p className="mx-3 fw-bold fs-5">
              Technologies used in the project
            </p>
            <p>Reactjs18</p>
            <p>TyppeScript - Applied Generic object</p>
            <p>Bootstrap V5.3.3</p>
            <p>Responsive, Breakpoints, Sass and Variables</p>
            <p>react-router-dom V6.22.3</p>
            <p>react-icons V5.0.1</p>
            <p>lodash V4.17.21</p>
            <p>axios V1.6.7</p>
            <p>zustand - global state management</p>
            <p>API: https://example-data.draftbit.com/books</p>
            <div className="position-absolute bottom-0 m-4 fw-bold ">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
