import React from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { ViewTemplate } from "./viewTemplate";

import { ContainerContents } from "../container/contentEvent";

export function Event(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function
  }
) {
  const { eventId } = useParams<{ eventId: string }>();
  const { darkMode, toggleDarkMode } = props;
  return (
    <ViewTemplate
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      content={(
        <ContainerContents
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          eventId={eventId}
        />
      )}
    />
  );
}

export default Event;
