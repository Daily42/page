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
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Location = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DateTime = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  font-size: 24px;
  margin-right: 10px;
  color: #aaa;
`;

const Divider = styled.div<Props>`
  border: none;
  height: 1px;
  background-color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  margin: 20px 0;
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
  const [eventData, setEventData] = useState(null);
  useEffect(() => {
    getEvent(eventId)
      .then((event) => {
        setEventData(event);
      });
  }, []);

  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    eventData ? (
      <ContentWrapper className="contents" darkMode={darkMode}>
      <Title>{eventData.title}</Title>
        <Divider darkMode={darkMode} />
        <DateTime>
          <Icon>
            <FaClock />
          </Icon>
          {new Date(eventData.dates[0].startAt).toLocaleDateString("en-US", dateFormat)}
        </DateTime>
        <DateTime>
          <Icon>
            <FaHourglassHalf />
          </Icon>
          {eventData.dates[0].term.toString()}min
        </DateTime>
        <IconWrapper>
          <Icon>
            <FaMapMarkerAlt />
          </Icon>
          <Location>{eventData.locationName}</Location>
        </IconWrapper>
        <Divider darkMode={darkMode} />
        <ReactMarkdown children={eventData.context.replaceAll()} remarkPlugins={[remarkGfm]} />
        <Divider darkMode={darkMode} />
      </ContentWrapper>
    ) : (<div>loading...</div>)
  );
}
