import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineLink,
  AiFillInstagram,
} from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

export default function Footer(props) {
  return (
    <div className="container m-0 w-100 bg-prim mw-100">
      <footer className="text-center text-lg-start  ">
        <div className="container p-4 pb-0 ">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">VB APP</h6>
                <p>
                  Using VB APP you can analyze your matches, your teams, and
                  also all the players individually. VB APP is an application
                  for plyers, coaches, and match holders.
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Usages</h6>

                <Link to="/" className="nav-link pb-2 " href="#">
                  Game Analyze
                </Link>

                <Link to="/" className="nav-link py-2">
                  Team Analyze
                </Link>

                <Link to="/" className="nav-link py-2">
                  Player Analyze
                </Link>

                <Link to="/" className="nav-link pt-2">
                  Match Handle
                </Link>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Mohammad Bigdelu
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> si.bigdelu@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 8888
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 8988
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
                </h6>

                <a
                  className="btn btn-primary rounded-circle btn-floating m-1"
                  href="https://github.com/mbigdelu"
                  target="_blank"
                  role="button"
                >
                  <AiFillGithub />
                </a>
                <a
                  className="btn btn-primary rounded-circle btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  className="btn btn-primary rounded-circle btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <AiOutlineLink />
                </a>
                <a
                  className="btn btn-primary rounded-circle btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BiLogoGmail />
                </a>
                <a
                  className="btn btn-primary rounded-circle btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BsInstagram />
                </a>
                <a
                  className="btn btn-primary rounded-circle btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <BsWhatsapp />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center p-3">
          © 2023 Copyright:
          <Link className="text-decoration-none"> Mohammad Bigdelu</Link>
        </div>
      </footer>
    </div>
  );
}
