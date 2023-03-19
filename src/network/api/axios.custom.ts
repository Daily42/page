import * as axios from "./axios.instance";
import Ievent from "../../interface/event.interface";
import Ilocation from "../../interface/location.interface";
import DateType from "../../enum/eventType.enum";
import PlaceType from "../../enum/placeType.enum";

export const getEventsList = async () => {
  try {
    const response = await axios.instance.get("/events");
    return (response);
  } catch (error) {
    return (error);
  }
}

export const searchEvent = async (stt: string, end: string, loc: string): Promise<Ievent[]> => {
  try {
    const date = `startDate=${stt}&endDate=${end}`;
    const loca = (loc === "0" ? "" : `&locationCode=${loc}`)
    console.log(`API:::: /events?${date}${loca}`)
    const response = await axios.instance.get<Ievent[]>(
      `/events?${date}${loca}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEventType = async () => {
  try {
    const response = await axios.instance.get("/event-type");
    return (response);
  } catch (error) {
    return (error);
  }
}

export const getLocations = async (): Promise<Ilocation[]> => {
  try {
    const response = await axios.instance.get<Ilocation[]>("/locations");
    return (response.data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getLocation = async (locationId: PlaceType): Promise<Ilocation[]> => {
  try {
    const response = await axios.instance.get<Ilocation[]>(`/locations/${locationId}`);
    return (response.data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getChildLocations = async (locId: PlaceType) => {
  try {
    const response = await axios.instance.get(`/locations/children/${locId}`);
    return (response);
  } catch (error) {
    return (error);
  }
}

export const getEvent = async (eventId: string) => {
  try {
    const response = await axios.instance.get<Ievent>(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
}
