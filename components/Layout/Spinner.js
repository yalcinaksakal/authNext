import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.container}>
    <div className={styles["loadingio"]}>
      <div className={styles["ldio"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);
export default Spinner;
