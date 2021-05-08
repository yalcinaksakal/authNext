import { useContext } from "react";
import { useSelector } from "react-redux";

import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  return (
    <section className={classes.starting}>
      <h1>{isLoggedIn ? "Welcome on Board!" : "Please Login"}</h1>
    </section>
  );
};

export default StartingPageContent;
