import React from "react";
import useStyles from "isomorphic-style-loader/useStyles";
import styles from "./index.module.scss";

function App() {
  useStyles(styles);
  return (
    <div>
      <h1 className={styles.h1}>React</h1>
    </div>
  );
}

export default App;
