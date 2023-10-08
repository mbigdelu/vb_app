import slide1 from "../../Images/slide1.jpg";
import slide2 from "../../Images/slide2.jpg";
import slide3 from "../../Images/slide3.jpg";

export default function HomePageSlides(props) {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide bg-dark rounded-5 shadow"
      data-bs-ride="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner rounded-3">
        <div class="carousel-item active">
          <img src={slide1} className="d-block w-100 border-0" alt="..." />

          <div class="carousel-caption d-none d-md-block">
            <h5>Player Profiling</h5>
            <p>
              Get to know your favorite volleyball players inside and out with
              our player profiling feature, which includes individual stats,
              strengths, and weaknesses
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img src={slide2} class="d-block w-100 border-0" alt="slides#1" />

          <div class="carousel-caption d-none d-md-block">
            <h5>Team Insights</h5>
            <p>
              Uncover the strategies and tactics used by top volleyball teams as
              we break down their gameplay, formations, and winning strategies
              for you.
            </p>
          </div>
        </div>
        <div class="carousel-item bg-dark">
          <img src={slide3} class="d-block w-100 border-0 bg-dark" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Game Statistics</h5>
            <p>
              Explore detailed statistics for volleyball games, including
              scores, player performance, and team dynamics, to gain insights
              into every match.
            </p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
