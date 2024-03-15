import myprofile from "../assets/Feb-2023_avartar.jpg";
import { GiBookshelf } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./context/bookContext.js";
import SearchBar from "../components/SearchBar.js";

const NavBar = () => {
  const navigate = useNavigate();
  const { favorites } = useAppContext();

  return (
    <div className="container-fluid bg-success d-flex justify-content-between">
      {/* Logo */}
      <div
        className="p-3 Logo"
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        {/* <div className="p-3 Logo" onClick={ReturnHomePage}> */}
        <GiBookshelf style={{ width: "80px", height: "50px" }} />
        <span className="text-uppercase fw-bold fs-5">bookhub</span>
      </div>

      {/* Search and Menu */}
      <div className="w-50 text-center">
        <div className="p-4 d-lg-none d-md-block">
          {/* <GenreMenu
                onSelectedGenres={onSelectedGenres}
                selectedGenrefromHomeComponent={selectedGenrefromHomeComponent}
              /> */}
        </div>
        <div className="p-4 d-none d-lg-block">
          <SearchBar />
        </div>
      </div>

      {/* Profile and Cart */}
      <div className="p-3">
        <div className="hstack">
          <button
            type="button"
            className="btn btn-success me-5 position-relative"
            onClick={() => navigate("/bookcart")}
          >
            <FiShoppingCart style={{ width: "35px", height: "35px" }} />
            <span className="position-absolute top-0 start-200 badge rounded-pill bg-danger fs-6">
              {favorites.length > 0 && favorites.length}
            </span>
          </button>
          <img
            className="rounded"
            src={myprofile}
            alt="Logo"
            width={"50px"}
            height={"50px"}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          />

          <div
            className="myApp offcanvas offcanvas-end "
            tabIndex="-1"
            data-bs-scroll="true"
            data-bs-backdrop="true"
            id="offcanvasExample"
            aria-labelledby="offcanvasExample"
          >
            <div className="myApp text-end ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="myApp offcanvas-header position-relative ">
              <div className="vstack">
                <div className="hstack gap-3">
                  <img
                    className="rounded"
                    src={myprofile}
                    alt="Logo"
                    width={"100px"}
                    height={"100px"}
                  />
                  <div className="vstack">
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
            <div className="myApp">
              <span className="mx-3 fw-bold fs-5">Education</span>
              <ul>
                <li>Swinburne University of Technology</li>
              </ul>
              <span className="mx-3 fw-bold fs-5">Skills</span>
              <ul className="">
                <li>Responsive Websites</li>
                <li>JavaScript (ReactJS and VueJS)</li>
                <li>PHP and NodeJS</li>
                <li>SoftWare Development for Mobile - Kotlin</li>
                <li>AWS Architecture Cloud</li>
                <li>MySQL, SQL and MongoDB</li>
              </ul>
              <span className="mx-3 fw-bold fs-5">Favorites</span>
              <ul>
                <li>Swimming</li>
                <li>Badminton</li>
                <li>BBQ</li>
                <li>Camping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
