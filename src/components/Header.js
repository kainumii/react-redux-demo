import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <Link to="/">Kaikki itemit</Link> |{" "}
        <Link to="/yksittainen_item">Yksittäinen item</Link>
      </div>
    </div>
  );
};

export default Header;
