import { Button } from "@mui/material";
import { Map } from "../Map/Map";
import "./Root.css";

export const Root = () => {
  return (
    <div className="app-container">
      <Map className="map" />
      <aside>
        <Button variant="text">Menu</Button>
      </aside>
    </div>
  );
};
