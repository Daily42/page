/* eslint-disable quote-props */
/* eslint-disable react/jsx-no-bind */
// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// style library
import styled from "@emotion/styled";

// MUI
import { Button, Container, Grid, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";

// Calendar picker
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/teal.css"

// API
import { searchEvent, getLocations } from "../network/api/axios.custom";

// Interface & Enum
import Ievent from "../interface/event.interface";
import Ilocation from "../interface/location.interface";
import Props from "../interface/props.interface";
import PlaceType from "../enum/placeType.enum";

// theme
import { DARK, LIGHT } from "../theme/theme";

// emotion styles
const DatePickerInput = styled(DatePicker)<Props>`
  padding: 16px;
  font-size: 16px;
`;

const Dropdown = styled.select<Props>`
  background-color: ${(props) => (props.darkMode ? DARK.FORM : LIGHT.FORM)};
  border: 0.3px solid ${(props) => (props.darkMode ? DARK.HEADER_BACKGROUND : LIGHT.HEADER_BACKGROUND)};
  box-shadow: 2px 2px 5px ${(props) => (props.darkMode ? DARK.SHADOW : LIGHT.SHADOW)};
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};

  &::placeholder {
    color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  }
`;

// style={{
//   backgroundColor: `${darkMode ? DARK.FORM : LIGHT.FORM}`,
//   color: `${darkMode ? DARK.TEXT : LIGHT.TEXT}`,
//   margin: "1rem",
//   width: "185px",
// }}

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
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
});

function getBuildingTitle(locationCode: string, locationList: Ilocation[]) {
  const location = locationList.find((loc) => loc.code === locationCode) || { title: "" };
  return location.title;
}

function EventsList(
  props: {
    events: Ievent[],
    locations: Ilocation[],
    onEventItemClick: (eventId: number) => void
  }
) {
  const { events, locations, onEventItemClick } = props;
  return (
    <List>
      {events.map((event) => (
        <ListItem button key={event.id} onClick={() => onEventItemClick(event.id)}>
          <ListItemText
            primary={event.title}
            secondary={`${event.location.parent?.title} > ${getBuildingTitle(event.locationCode, locations)}`}
          />
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
    "전체",
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
    "전쳬": PlaceType.null,
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
    console.log("CALLED!")
    getLocations().then((response: any) => {
      setLocations(response);
    });
  }, []);

  // updated handleSearchButtonClick function
  const handleSearchButtonClick = async () => {
    console.log("CLICKED!");
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
      <Grid container direction="column" alignItems="baseline">
        <Grid item style={{ width: "100%" }} className={classes.form}>
          <DatePickerInput
            style={{
              backgroundColor: `${darkMode ? DARK.FORM : LIGHT.FORM}`,
              boxSizing: "border-box",
              color: `${darkMode ? DARK.TEXT : LIGHT.TEXT}`,
              border: `0.3px solid ${darkMode ? DARK.TEXT : LIGHT.TEXT}`,
              fontSize: "14px",
              height: "32px",
              lineHeight: "32px",
              padding: "4px 11px",
              transition: "all 0.3s",
              width: "185px",
            }}
            containerStyle={{
              width: "100%",
            }}
            darkMode={darkMode}
            className={`rmdp-mobile bg-${mode} ${darkMode ? "teal" : "default"}`}
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
          <Button
            style={{
            }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSearchButtonClick}
          >
            Get Events
          </Button>
        </Grid>
        {events.length > 0 && (
          <Grid item className={classes.list}>
            <EventsList
              events={events}
              locations={locations}
              onEventItemClick={handleEventItemClick}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
