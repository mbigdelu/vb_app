import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function SearchAutoComplete(props) {
  const [searchString, setSearchString] = useState("");
  const [playersList, setPlayersList] = useState([]);
  const [searchAutoComplete, setSearchAutoComplete] = useState([]); // Initialize as an empty array

  function filterItemsBySubstring(playersList, substring) {
    if (substring) {
      const lowerCaseSubstring = substring.toLowerCase();
      return playersList.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseSubstring)
      );
    } else {
      return [];
    }
  }

  useEffect(() => {
    setSearchString(props.data.searchString);
    setPlayersList(props.data.playersList);
  }, [props.data]);

  useEffect(() => {
    let autoCompleteList = filterItemsBySubstring(playersList, searchString);
    if (autoCompleteList.length > 0) {
      setSearchAutoComplete(autoCompleteList.slice(0, 4));
    } else setSearchAutoComplete([]);
  }, [playersList, searchString]);

  return (
    <Dropdown
      className="position-absolute w-100 "
      style={{
        top: "100%",
        left: 0,
      }}
    >
      {searchAutoComplete && searchAutoComplete[0] && (
        <Dropdown.Menu
          show
          className="w-100 border-0 border-end border-start border-bottom rounded-0 rounded-bottom"
        >
          {searchAutoComplete.map((player) => (
            <Dropdown.Item
              href={`/player-analyze/${player._id}`} // Assuming `player._id` is the correct property
              type="link"
              key={`${player.name}${player.number}`}
            >
              {player.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}
