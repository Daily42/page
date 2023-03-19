import React from "react";
import { styled } from "@stitches/react";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentAdd";

export function Add(
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

export default Add;
