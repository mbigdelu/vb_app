import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import NewGame from "./Pages/NewGame";
import PlayerPage from "./PlayerAnalyzer/PlayerPage";
import Test from "./Test";
import HomePage from "./HomePage";

const data = { pageTitle: "Game Run Page" };

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login message={"Login Page"} />} />
        <Route
          path="/new-game/*"
          element={<NewGame title={data.pageTitle} />}
        />
        <Route path="/player-analyze/*" element={<PlayerPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <div class="pe-navbar">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <NavLink class="re-nav-link" to="/">
              <a class="navbar-brand pe-nav-brand" href="#">
                VB App
              </a>
            </NavLink>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <NavLink className="re-nav-link" to="/">
                    <a class="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/new-game/setup" className="re-nav-link">
                    <a class="nav-link" href="#">
                      item
                    </a>
                  </NavLink>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <NavLink to="/player-analyze" className="re-nav-link">
                        <a class="dropdown-item" href="#">
                          Player Analyze
                        </a>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/test" className="re-nav-link">
                        <a class="dropdown-item" href="#">
                          Test
                        </a>
                      </NavLink>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">
                    Disabled
                  </a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
