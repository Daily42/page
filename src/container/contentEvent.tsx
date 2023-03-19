/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-unresolved */
// React & libraries
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

// Enum & Interface
import ReactMarkdown from "react-markdown";
import Props from "../interface/props.interface"

// theme
import { DARK, LIGHT } from "../theme/theme";

// pre-made

// API

// import { BuildingName } from "../component/building/buildingName"

const Contents = styled.div<Props>`
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
  padding: 3vh;
  overflow-x: hidden;
  overflow-y: scroll;
  transition-duration: 1.5s;
  &::-webkit-scrollbar {
    background: none;
    width: 0.6rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    width: 0.4rem;
    right: 60px;
  }
`;

export function ContainerContents(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function
    eventId: any,
  }
) {
  const { darkMode, toggleDarkMode, eventId } = props;

  return (
    <Contents className="contents" darkMode={darkMode}>
      put your content here
      <ReactMarkdown>
{`# This is a heading

This is some **bold** text.`}
      </ReactMarkdown>
    </Contents>
  );
}
