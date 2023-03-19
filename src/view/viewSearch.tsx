import React from "react";
import { styled } from "@stitches/react";
import { ViewTemplate } from "./viewTemplate";
import Ilocation from "../interface/location.interface";

import { ContainerContents } from "../container/contentSearch";

export function Search(
  props: {
    darkMode: boolean,
    locations: Ilocation[]
  }
) {
  const { darkMode, locations } = props;
  return (
    <ViewTemplate
      darkMode={darkMode}
      toggleDarkMode={() => {}}
      content={(
        <ContainerContents
          darkMode={darkMode}
          locations={locations}
        />
      )}
    />
  );
}

export default Search;
