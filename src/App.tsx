import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { Login } from "./view/viewLogin";
import { Add } from "./view/viewAdd";
import { Event } from "./view/viewEvent";
import { Root } from "./view/viewRoot";
import { DARK, LIGHT } from "./theme/theme";
import { RootControl } from "./component/rootControl"

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    console.log("TOGGLE BUTTON HI");
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: ${darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND};
            transition-duration: 1.5s;
          }
          .view {
            background-color: ${darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND} !important;
            transition-duration: 1.5s;
          }
        `}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/add" element={<Add darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/event/:eventId" element={<Event darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/" element={<Root darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/*" element={<RootControl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
