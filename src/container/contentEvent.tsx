/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-unresolved */
// React & libraries
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaMapMarkerAlt, FaClock, FaHourglassHalf } from "react-icons/fa";

// Enum & Interface
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import Props from "../interface/props.interface"

// theme
import { DARK, LIGHT } from "../theme/theme";

// pre-made

// API
import { getEvent } from "../network/api/axios.custom"

// import { BuildingName } from "../component/building/buildingName"

const ContentWrapper = styled.div<Props>`
  font-family: S-CoreDream;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow-x: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollable-text::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  .scrollable-text {
    scrollbar-width: none;
  }

  /* Add other styles for scrollable text container */
  .scrollable-text {
    width: 200px;
    white-space: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  }
`;

const DateTime = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-top: 3px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 20px;
  margin-right: 10px;
  margin-top: 3px;
  margin-left: 5px;
  color: #aaa;
`;

const MarkdownWrpper = styled.div<Props>`
  border: 0;
  padding: 15px;
  margin-top: 30px;
  background-color: ${(props) => (props.darkMode ? DARK.SHADOW : LIGHT.SHADOW)};
  transition: all 0.5s;
  height: calc(100vh - 325px);
  overflow-y: scroll;
  letter-spacing: 0.5px;
  line-height: 1.5;
`;

export function ContainerContents({
  darkMode,
  toggleDarkMode,
  eventId,
}: {
  darkMode: boolean;
  toggleDarkMode: Function;
  eventId: any;
}) {
  const [eventData, setEventData] = useState<any>(null);
  useEffect(() => {
    getEvent(eventId)
      .then((event) => {
        setEventData(event);
      });
  }, []);

  const dateFormat: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return (
    eventData ? (
      <ContentWrapper className="contents" darkMode={darkMode}>
      <Title>{eventData.title}</Title>
        <DateTime>
          <Icon><FaClock /></Icon>
          {new Date(eventData.dates[0].startAt).toLocaleDateString("en-US", dateFormat)}
        </DateTime>
        <DateTime>
          <Icon><FaHourglassHalf /></Icon>
          for {eventData.dates[0].term.toString()}min
        </DateTime>
        <DateTime>
          <Icon><FaMapMarkerAlt /></Icon>
          <b>{eventData.location.title}</b>
        </DateTime>
        <MarkdownWrpper darkMode={darkMode}>
          <ReactMarkdown
            children={eventData.context.replaceAll()}
            remarkPlugins={[remarkGfm]}
          />
        </MarkdownWrpper>
      </ContentWrapper>
    ) : (<div>loading...</div>)
  );
}
