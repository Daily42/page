import React, { useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { Login } from "./view/viewLogin";
import { Add } from "./view/viewAdd";
import { Event } from "./view/viewEvent";
import { Search } from "./view/viewSearch";
import { DARK, LIGHT } from "./theme/theme";
import { RootControl } from "./component/rootControl"
import Ilocation from "./interface/location.interface";
import { getLocations } from "./network/api/axios.custom";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [locations, setLocations] = useState<Ilocation[]>([]);
  const locationRef = useRef(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const locationLoad = async () => {
    const response = await getLocations();
    if (response && locationRef.current === false) {
      setLocations(response);
      locationRef.current = true;
    }
  }

  locationLoad();

  return (
    <>
      <Global
        styles={css`
          body {
            background-color: ${darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND};
            transition-duration: 0.3s;
            @font-face {
              font-family: 'OAGothic';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/OAGothic-ExtraBold.woff2') format('woff2');
              font-weight: 800;
            }
            @font-face {
              font-family: 'OAGothic';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/OAGothic-Medium.woff2') format('woff2');
              font-weight: 500;
            }
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-1Thin.woff') format('woff');
              font-weight: 100;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff') format('woff');
              font-weight: 200;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
              font-weight: 300;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
              font-weight: 400;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
              font-weight: 500;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
              font-weight: 600;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
              font-weight: 700;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
              font-weight: 800;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'S-CoreDream';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff');
              font-weight: 900;
              font-style: normal;
            }            
          }
          .view {
            background-color: ${darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND} !important;
            transition-duration: 1s;
          }
          #search-date-picker::placeholder {
            color: ${darkMode ? DARK.TEXT : LIGHT.TEXT} !important;
            font-size: 16px;
          }
        `}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/add" element={<Add darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/event/:eventId" element={<Event darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/search" element={<Search darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/*" element={<RootControl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
