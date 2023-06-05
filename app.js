const express = require("express");
const path = require("path");
import addStyle, { STYLE_MAP } from "./addStyle";
import App from "./src/app";
import { renderToString } from "react-dom/server";
import React from "react";
import StyleContext from "isomorphic-style-loader/StyleContext";

const app = express();

app.use("/dist", express.static(path.join(process.cwd(), "./dist")));

app.get("/", async (req, res, next) => {
  const css = {};
  const insertCss = addStyle(css);

  const html = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  );

  const isoStyle = `${Object.keys(css)
    .map(
      (id) =>
        `<style type="text/css" id="${id}">${STYLE_MAP[id].content}</style>`
    )
    .join("")}`;

  res.set("content-type", "text/html");
  res.status(200);
  res.send(`
        <!DOCTYPE html>
        <html>
          <head>
          ${isoStyle}
          </head>
          <body>
            <div id="root">${html}</div>
            <script src="../dist/bundle.js"></script>
          </body>
        </html>
      `);

  res.end();
});

app.listen(9000, () => console.log("Server started http://localhost:9000"));
