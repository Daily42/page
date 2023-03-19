import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReducerType } from "../redux/rootReducer";
import { AuthData } from "../redux/slices/auth";
import { DARK, LIGHT } from "../theme/theme"
import Props from "../interface/props.interface";

import { ContainerNavMenu } from "../container/navMenu";

const ViewWrapper = styled.div<Props>`
  display: block;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
`;

export function ViewTemplate(
  props: {
    content: any,
    darkMode: boolean,
    toggleDarkMode: Function
  }
) {
  const { content, darkMode, toggleDarkMode } = props;
  return (
    <ViewWrapper className="view">
      <ContainerNavMenu title="Daily42" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {content}
    </ViewWrapper>
  );
}

export default ViewTemplate;
