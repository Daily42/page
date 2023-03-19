/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
/* eslint-disable import/no-unresolved */
// React & libraries
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import IEventData from "../interface/event.interface"
import { FaMapMarkerAlt, FaClock, FaHourglassHalf } from "react-icons/fa";

// Enum & Interface
import ReactMarkdown from "react-markdown";
import Props from "../interface/props.interface"

// theme
import { DARK, LIGHT } from "../theme/theme";

// pre-made

// API
import { getEvent } from "../network/api/axios.custom"

// import { BuildingName } from "../component/building/buildingName"

const eventData = {
  "title": "안녕하세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  "typeId": 1,
  "context": "마크다운이 들어갈 곳",
  "locationCode": "PL0200",
  "locationName": "운동장",
  "dates": [
    {
      "startAt": "2023-03-16T09:00:00.000",
      "term": 100
    },
    {
      "startAt": "2023-03-17T09:00:00.000",
      "term": 100
    }
  ]
}

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
  const [data, setData] = useState(eventData);
  useEffect(() => {
    const fetchContext = async () => {
      //const data = await getEvent(eventId);
      setData(data);
    };
    fetchContext();
  }, [eventId]);

  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
      <ContentWrapper className="contents" darkMode={darkMode}>
      <Title>{data.title}</Title>
        <Divider darkMode={darkMode} />
        <DateTime>
          <Icon>
            <FaClock />
          </Icon>
          {new Date(data.dates[0].startAt).toLocaleDateString("en-US", dateFormat)}
        </DateTime>
        <DateTime>
          <Icon>
            <FaHourglassHalf />
          </Icon>
          {data.dates[0].term.toString()}min
        </DateTime>
        <IconWrapper>
          <Icon>
            <FaMapMarkerAlt />
          </Icon>
          <Location>{data.locationName}</Location>
        </IconWrapper>
        <Divider darkMode={darkMode} />
        <ReactMarkdown>{data.context}</ReactMarkdown>
        <Divider darkMode={darkMode} />
      </ContentWrapper>
  );
}
