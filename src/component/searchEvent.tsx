/* eslint-disable quote-props */
/* eslint-disable react/jsx-no-bind */
// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// style library
import styled from "@emotion/styled";

// MUI
import { Button, Container, Grid, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { FaMapMarkerAlt } from "react-icons/fa";

// Calendar picker
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/teal.css"

// API
import {
  searchEvent,
  getLocations,
  getEventType
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
    height: "100vh",
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

  // getEventType
  return (
    <List>
      {events.map((event) => (
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
            <div>
              <FaMapMarkerAlt style={{opacity: 0.5}} />&nbsp;
              {event.location.parent?.title}
              {event.location.parent?.title ? " > " : ""}
              {event.location.title}
              {event.location.code === PlaceType.PL0200 ? ` : ${event.locationName}` : ""}
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
  }
) {
  // props variables
  const { darkMode } = props;

  // mui variables - dates
  const [rangeDate, setRangeDate] = useState({
    date: [],
  })

  // mui variables - location

  // api variables
  const [locationName, setLocationName] = useState("");
  const [events, setEvents] = useState<Ievent[]>([]);
  const [locations, setLocations] = useState<Ilocation[]>([]);

  // tmp
  const classes = useStyles(darkMode);
  const navigate = useNavigate();
  const mapList: string[] = [
    "장소를 선택하세요. (전체)",
    "개포 클러스터",
    "서초 클러스터",
    "기타",
    "개포 클러스터 - 2층 Cluster 01",
    "개포 클러스터 - 2층 Cluster 02",
    "개포 클러스터 - 4층 Cluster 03",
    "개포 클러스터 - 4층 Cluster 04",
    "개포 클러스터 - 5층 Cluster 05",
    "개포 클러스터 - 5층 Cluster 06",
    "서초 클러스터 - 4층 Cluster 07",
    "서초 클러스터 - 4층 Cluster 08",
    "서초 클러스터 - 5층 Cluster 09",
    "서초 클러스터 - 5층 Cluster 10",
    "개포 클러스터 - 3층 ClusterX 01",
    "개포 클러스터 - 3층 ClusterX 02",
    "개포 클러스터 - 1층 오픈클러스터",
    "개포 클러스터 - 1층 게임장",
    "개포 클러스터 - 1층 42Lab",
  ];
  const placeTypeMap: { [key: string] : PlaceType } = {
    "장소를 선택하세요. (전체)": PlaceType.null,
    "개포 클러스터": PlaceType.PL0000,
    "서초 클러스터": PlaceType.PL0100,
    "기타": PlaceType.PL0200,
    "개포 클러스터 - 2층 Cluster 01": PlaceType.PL0001,
    "개포 클러스터 - 2층 Cluster 02": PlaceType.PL0002,
    "개포 클러스터 - 4층 Cluster 03": PlaceType.PL0003,
    "개포 클러스터 - 4층 Cluster 04": PlaceType.PL0004,
    "개포 클러스터 - 5층 Cluster 05": PlaceType.PL0005,
    "개포 클러스터 - 5층 Cluster 06": PlaceType.PL0006,
    "서초 클러스터 - 4층 Cluster 07": PlaceType.PL0007,
    "서초 클러스터 - 4층 Cluster 08": PlaceType.PL0008,
    "서초 클러스터 - 5층 Cluster 09": PlaceType.PL0009,
    "서초 클러스터 - 5층 Cluster 10": PlaceType.PL0010,
    "개포 클러스터 - 3층 ClusterX 01": PlaceType.PL0011,
    "개포 클러스터 - 3층 ClusterX 02": PlaceType.PL0012,
    "개포 클러스터 - 1층 오픈클러스터": PlaceType.PL0013,
    "개포 클러스터 - 1층 게임장": PlaceType.PL0014,
    "개포 클러스터 - 1층 42Lab": PlaceType.PL0015,
  };

  let mode = "default";
  if (darkMode === true) {
    mode = "dark";
  } else {
    mode = "default";
  }

  useEffect(() => {
    getLocations().then((response: any) => {
      setLocations(response);
    });
  }, []);

  // updated handleSearchButtonClick function
  const handleSearchButtonClick = async () => {
    let locationCode: string = "0";
    if (locationName !== "") {
      const location = locations.find((loc) => loc.title === locationName);
      locationCode = location?.code || "";
    }
    const eventResponse = await searchEvent(rangeDate.date[0], rangeDate.date[1], locationCode);
    if (eventResponse) {
      setEvents(eventResponse);
    }
  };

  useEffect(() => {
    handleSearchButtonClick();
  }, [rangeDate, locationName])

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
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              >
                {mapList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Dropdown>
            </Grid>
            <Grid item>
              <Button
                style={{
                  height: "53px",
                  margin: "0",
                  width: "28.5vw",
                  minWidth: "200px",
                  borderRadius: "10px",
                  fontFamily: "OAGothic",
                  // fontSize:
                }}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSearchButtonClick}
              >
                눌러서 검색하기
              </Button>
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
