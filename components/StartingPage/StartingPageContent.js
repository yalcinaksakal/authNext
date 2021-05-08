import { useContext } from "react";

import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const isLoggedIn = false;
  return (
    <section className={classes.starting}>
      <h1>{isLoggedIn ? "Welcome on Board!" : "Please Login"}</h1>
    </section>
  );
};

export default StartingPageContent;
