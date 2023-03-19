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

export const searchEvent = async (stt: string, end: string): Promise<Ievent[]> => {
  try {
    const response = await axios.instance.get<Ievent[]>(`/events?startDate=${stt}&endDate=${end}`);
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
