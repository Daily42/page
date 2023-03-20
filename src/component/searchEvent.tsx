/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable quote-props */
/* eslint-disable react/jsx-no-bind */
// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// style library
import styled from "@emotion/styled";

// MUI
import { Button, Container, Grid, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { FaMapMarkerAlt, FaHourglassHalf } from "react-icons/fa";
import { BsFillCircleFill } from "react-icons/bs";

// Calendar picker
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/teal.css"

// API
import {
  searchEvent,
} from "../network/api/axios.custom";

// Interface & Enum
import Ievent from "../interface/event.interface";
import Ilocation from "../interface/location.interface";
import Props from "../interface/props.interface";
import PlaceType from "../enum/placeType.enum";
import Itype from "../interface/type.interface";

// theme
import { DARK, LIGHT } from "../theme/theme";

// emotion styles
const DatePickerInput = styled(DatePicker)<Props>`
  padding: 16px;
  border: none !important;
`;

const Dropdown = styled.select<Props>`
  background-color: ${(props) => (props.darkMode ? DARK.FORM : LIGHT.FORM)};
  border: 0.3px solid ${(props) => (props.darkMode ? DARK.HEADER_BACKGROUND : LIGHT.HEADER_BACKGROUND)};
  box-shadow: 2px 2px 5px ${(props) => (props.darkMode ? DARK.SHADOW : LIGHT.SHADOW)};
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  width: 28.5vw;
  min-width: 200px;
  marginLeft: 1vw;
  marginRight: 1vw;
  transition: all 0.5s;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
`;

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    height: "90vh",
    backgroundColor: "#f5f5f5",
    maxWidth: "none",
  },
  title: {
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
  },
  list: {
    marginTop: "2rem",
  },
  inputArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
  },
});

const useStyles2 = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: "90%",
    marginLeft: "5%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listItemText: {
    color: (props: any) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT),
  },
}));

const EventName = styled.div`
  margin: 0;
  font-family: OAGothic;
  font-weight: 800;
  font-size: 1.3rem;
`;

const Icon = styled.div`
  font-size: 24px;
  margin-right: 10px;
  color: #aaa;
`;

function getBuildingTitle(locationCode: string, locationList: Ilocation[]) {
  const location = locationList.find((loc) => loc.code === locationCode) || { title: "" };
  return location.title;
}

function EventsList(
  props: {
    events: Ievent[],
    onEventItemClick: (eventId: number) => void,
    darkMode: boolean,
  }
) {
  const { events, onEventItemClick, darkMode } = props;
  const [eventType, setEventType] = useState<Ievent[]>([]);
  const classes = useStyles2({ darkMode });

  const toTimeString = (min: number | undefined) => {
    if (min == null) {
      return "";
    }
    const hours = Math.floor(min / 60);
    const hourString = hours > 0 ? `${hours} hours` : "";
    const minutes = min - hours * 60;
    const minuteString = minutes > 0 ? `${minutes} minutes` : "";
    if (hourString === "" && hourString === "") {
      return "all day";
    }
    return `for ${hourString} ${minuteString}`;
  }

  // getEventType
  return (
    <List>
      {events.map((event: Ievent) => (
        <ListItem
          button
          key={event.id}
          onClick={() => onEventItemClick(event.id)}
          style={{
            width: "90%",
            marginLeft: "5%",
          }}
        >
          <ListItemText
            className={classes.listItemText}
          >
            <EventName>
              {event.title}
            </EventName>
            <div style={{ margin: "1px" }}>
              <FaMapMarkerAlt style={{ fontSize: "16px", opacity: 0.5, margin: 0 }} />&nbsp;
              <>
                {event.location.parent?.title}
                {event.location.parent?.title ? " > " : ""}
                {event.location.title}
                {event.location.code === PlaceType.PL0200 ? ` : ${event.locationName}` : ""}
              </>
            </div>
            <div>
              <FaHourglassHalf style={{ fontSize: "16px", opacity: 0.5, margin: 0 }} />&nbsp;
              {toTimeString(event?.dates[0]?.term)}
            </div>
            <div style={{ fontFamily: "OAGothic", fontSize: "0.8rem", margin: 0, color: `${event.type.color}` }}>
              <BsFillCircleFill style={{ opacity: 0.8, borderRadius: "50%", color: `${event.type.color}`, fontSize: "12px", margin: 0, marginBottom: -3, }} />&nbsp;
              {event.type.title}
            </div>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

export function SearchEvents(
  props: {
    darkMode: boolean,
    locations: Ilocation[],
    types: Itype[]
  }
) {
  // props variables
  const { darkMode, locations, types } = props;
  const myLocations = [
    { key: 0, value: "", name: "전체" },
    ...locations
      .sort((x, y) => x.sort - y.sort)
      .map((x, i) => ({ key: i + 1, value: x.code, name: x.title })),
  ];

  // mui variables - dates
  const now = new Date();
  const offset = now.getTimezoneOffset()
  const today = (new Date(now.getTime() - (offset * 60 * 1000))).toISOString().split("T")[0];
  const [rangeDate, setRangeDate] = useState({
    date: [today],
  })

  // mui variables - location

  // api variables
  const [locationCode, setLocationCode] = useState();
  const [events, setEvents] = useState<Ievent[]>([]);

  // tmp
  const classes = useStyles(darkMode);
  const navigate = useNavigate();

  let mode = "default";
  if (darkMode === true) {
    mode = "dark";
  } else {
    mode = "default";
  }

  // updated handleSearchButtonClick function
  const handleSearchButtonClick = async () => {
    const eventResponse = await searchEvent(rangeDate.date[0], rangeDate.date[1], locationCode ?? null);
    if (eventResponse) {
      setEvents(eventResponse);
    }
  };

  useEffect(() => {
    handleSearchButtonClick();
  }, [rangeDate, locationCode])

  function handleEventItemClick(eventId: number) {
    navigate(`/event/${eventId}`)
  }

  return (
    <Container
      className={classes.root}
      style={{
        backgroundColor: `${darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND}`,
        marginTop: "30px",
      }}
    >
      <Grid container direction="column">
        <div className={classes.inputArea}>
          <Grid
            style={{
              textAlign: "center",
              width: "100%",
              margin: "0",
            }}
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <DatePickerInput
                style={{
                  backgroundColor: `${darkMode ? DARK.FORM : LIGHT.FORM}`,
                  boxSizing: "border-box",
                  color: `${darkMode ? DARK.TEXT : LIGHT.TEXT}`,
                  border: `0.3px solid ${darkMode ? DARK.HEADER_BACKGROUND : LIGHT.HEADER_BACKGROUND}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  height: "53px",
                  lineHeight: "32px",
                  padding: "4px 11px",
                  transition: "all 0.5s",
                  width: "28.5vw",
                  minWidth: "200px",
                }}
                containerStyle={{
                  width: "100%",
                }}
                darkMode={darkMode}
                id="search-date-picker"
                className={`rmdp-mobile bg-${mode} ${darkMode ? "default" : "default"}`}
                range
                name="date"
                placeholder="날짜를 선택하세요."
                format="YYYY-MM-DD"
                plugins={[<DatePanel markFocused />]}
                value={rangeDate.date}
                onChange={(value: any) =>
                  setRangeDate((prevFormData) => ({
                    ...prevFormData,
                    date: value,
                  }))
                }
              />
            </Grid>
            <Grid item>
              <Dropdown
                darkMode={darkMode}
                id="location-name-input"
                value={locationCode}
                onChange={(e: any) => setLocationCode(e.target.value)}
              >
                {myLocations.map((x) => (
                  <option key={x.key} value={x.value}>
                    {x.name}
                  </option>
                ))}
              </Dropdown>
            </Grid>
          </Grid>
        </div>
        <hr
          style={{
            width: "90%",
            border: `0.5px solid ${darkMode ? DARK.TEXT_SHADOW : LIGHT.TEXT_SHADOW}`,
            transition: "all 0.5s",
            marginBottom: "-20px",
          }}
        />
        {events.length > 0 && (
          <Grid item className={classes.list}>
            <EventsList
              events={events}
              onEventItemClick={handleEventItemClick}
              darkMode={darkMode}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
