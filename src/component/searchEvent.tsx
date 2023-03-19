/* eslint-disable react/jsx-no-bind */
// React
import React, { useState, useRef } from "react";
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

// Interface
import Ievent from "../interface/event.interface";
import Ilocation from "../interface/location.interface";
import Props from "../interface/props.interface";

// theme
import { DARK, LIGHT } from "../theme/theme";

// emotion styles
const DatePickerInput = styled(DatePicker)<Props>`
  padding: 16px;
  font-size: 16px;
`;

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
  // props varaibles
  const { darkMode } = props;

  // mui variables - dates
  const [rangeDate, setRangeDate] = useState({
    date: [],
  })

  // api variables
  const [events, setEvents] = useState<Ievent[]>([]);
  const [locations, setLocations] = useState<Ilocation[]>([]);
  const classes = useStyles(darkMode);
  const hasRunOnceRef = useRef(false);
  const navigate = useNavigate();

  let mode = "default";
  if (darkMode === true) {
    mode = "dark";
  } else {
    mode = "default";
  }

  const handleSearchButtonClick = async () => {
    const eventResponse = await searchEvent(rangeDate.date[0], rangeDate.date[1]);
    const locationResponse = await getLocations();
    if (!hasRunOnceRef.current && locationResponse) {
      setLocations(locationResponse);
      hasRunOnceRef.current = true;
    }
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
        backgroundColor: `${(darkMode) ? DARK.BACKGROUND : LIGHT.BACKGROUND}`,
        marginTop: "30px",
      }}
    >
      <Grid container direction="column" alignItems="baseline">
        <Grid item style={{ width: "100%" }} className={classes.form}>
          <DatePickerInput
            style={{
              backgroundColor: `${(darkMode) ? DARK.FORM : LIGHT.FORM}`,
              boxSizing: "border-box",
              color: `${(darkMode) ? DARK.TEXT : LIGHT.TEXT}`,
              border: "none",
              fontSize: "14px",
              height: "32px",
              lineHeight: "32px",
              padding: "4px 11px",
              transition: "all 0.3s",
              width: "185px",
            }}
            containerStyle={{
              width: "100%"
            }}
            darkMode={darkMode}
            className={`rmdp-mobile bg-${mode} ${darkMode ? "teal" : "default"}`}
            range
            name="date"
            placeholder="날짜를 선택하세요."
            format="YYYY-MM-DD"
            plugins={[
              <DatePanel markFocused />
            ]}
            value={rangeDate.date}
            onChange={(value: any) =>
              setRangeDate((prevFormData) => ({
                ...prevFormData,
                date: value,
              }))
            }
          />
          <Button
            style={{

            }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSearchButtonClick}
          >Get Events
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
