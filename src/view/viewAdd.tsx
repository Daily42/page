import React from "react";
import { styled } from "@stitches/react";
import { ViewTemplate } from "./viewTemplate";
import Ilocation from "../interface/location.interface";
import Itype from "../interface/type.interface";

import { ContainerContents } from "../container/contentAdd";

export function Add(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function,
    locations: Ilocation[],
    types: Itype[]
  }
) {
  const { darkMode, toggleDarkMode, locations, types } = props;
  return (
    <ViewTemplate
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      content={(
        <ContainerContents
          darkMode={darkMode}
          locations={locations}
          types={types}
        />
      )}
    />
  );
}

export default Add;
