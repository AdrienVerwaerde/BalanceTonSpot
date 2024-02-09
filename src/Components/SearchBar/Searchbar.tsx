import { Dropdown, Input } from "semantic-ui-react";
import "./Searchbar.css";

const options = [
  { key: "Tous les sports", text: "Qu'importe !", value: "page" },
  { key: "Skateboard", text: "Skateboard", value: "Skateboard" },
  { key: "Snowboard", text: "Snowboard", value: "Snowboard" },
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
