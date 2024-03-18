import React from "react";
import myprofile from "../assets/Feb-2023_avartar.jpg";

import { TfiMenu } from "react-icons/tfi";
import { LuMenuSquare } from "react-icons/lu";
import AsideBar from "./AsideBar";
import { GiBookshelf } from "react-icons/gi";

const GenreMenu = () => {
  return (
    <>
      <div
        data-bs-toggle="offcanvas"
        data-bs-target="#staticBackdrop"
        aria-controls="staticBackdrop"
        className="mt-1"
      >
        <TfiMenu style={{ width: "40px", height: "40px", cursor: "pointer" }} />
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="static"
          tabIndex={0}
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="text-end mt-3 mx-3">
            <button
              type="button"
              className="btn-close btn btn-outline-primary"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-header">
            <div className="vstack">
              <div className="hstack gap-3">
                <h5 className="offcanvas-title" id="staticBackdropLabel">
                  <GiBookshelf style={{ width: "70px", height: "50px" }} />
                  <span className="text-uppercase fw-bold fs-5">bookhub</span>
                </h5>
              </div>
              <hr />
            </div>
          </div>
          <div className="offcanvas-body">
            <AsideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default GenreMenu;
