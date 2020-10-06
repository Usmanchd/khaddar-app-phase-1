import React, { Fragment } from "react";
import Navbar2 from "./Navbar2";
import Main from "./Main";
import Categories from "../routes/Categories";
import Latest from "../routes/Latest";
import Bestproduct from "./Bestproduct";
import Latestoffer from "./Latestoffer";
import Gallery from "./Gallery";

const Landing = () => {
  return (
    <Fragment>
      <Main />
      <Categories />
      {/* <Latest /> */}
      <Bestproduct />
      <br />
      <Latestoffer />
      <Gallery />
    </Fragment>
  );
};

export default Landing;
