import React from "react";
import { Dropdown, Input } from "semantic-ui-react";
import "./Searchbar.css";

const options = [
  { key: "Tous les sports", text: "Qu'importe !", value: "page" },
  { key: "Skateboard", text: "SkateBoard", value: "SkateBoard" },
  { key: "SnowBoard", text: "Snowboard", value: "SnowBoard" },
];

export default function Searchbar() {
  return (
    <div id="searchbar-container">
    <Input
      action={
        <Dropdown button basic floating options={options} defaultValue="page" />
      }
      icon="search"
      iconPosition="left"
      placeholder="Search..."
    />
    </div>
  );
}
