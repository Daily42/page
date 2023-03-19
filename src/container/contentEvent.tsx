/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-unresolved */
// React & libraries
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import IEventData from "../interface/event.interface"

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

const getEventContext = async (eventId: string) => {
  try {
    const response = await axios.get<IEventData>(
      `http://daily42-env.eba-dmbiy4zs.ap-northeast-2.elasticbeanstalk.com/events/${eventId}`
    );
    return response.data.context;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export function ContainerContents(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function
    eventId: any,
  }
) {
  const { darkMode, toggleDarkMode, eventId } = props;

  const [context, setContext] = useState("");
  useEffect(() => {
    const fetchContext = async () => {
      const context = await getEventContext(props.eventId);
      setContext(context);
    };
    fetchContext();
  }, [props.eventId]);

  return (
    <Contents className="contents" darkMode={darkMode}>
      <ReactMarkdown>
        {context}
      </ReactMarkdown>
    </Contents>
  );
}
