import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import SearchAutoComplete from "./SearchAutoComplete";
import { useEffect, useState } from "react";
import { getPlayersList } from "./FakeDataService/FakePlayerDataFetch.js";
import PlayerPage from "./PlayerPage";

function PlayerSearch(props) {
  const [searchString, setSearchString] = useState();

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  return (
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="input-group mb-3 border rounded-3  ">
          <input
            type="text"
            class="form-control input-text border-0 "
            placeholder="Search Players ..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={handleChange}
          />

          <button
            class="btn  btn-lg border-0 bg-prim rounded-0 rounded-end "
            type="button"
          >
            <BsSearch size={20} />
          </button>

          <SearchAutoComplete
            data={{
              searchString: searchString,
              playersList: getPlayersList(),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerSearch;
