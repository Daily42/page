import React from "react";
import styled from "@emotion/styled";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentLogin";

export function Login(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function
  }
) {
  const { darkMode, toggleDarkMode } = props;
  return (
    <ViewTemplate
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      content={(
        <ContainerContents
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    />
  );
}

export default Login;
