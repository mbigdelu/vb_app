import "../../App.css";
import HomePageSlides from "./HomepageSlides";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage(props) {
  return (
    <section>
      <div className="bg-image vh-100">
        <div className="container container-sm pt-5">
          <div className="row mt-5">
            <div className="col-md-6 mt-5">
              <HomePageSlides />
            </div>
            <div className="col-md-6 mt-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
