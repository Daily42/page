import * as axios from "./axios.instance";
import Itype from "../../interface/type.interface";
import Ievent from "../../interface/event.interface";
import Ilocation from "../../interface/location.interface";
import DateType from "../../enum/eventType.enum";
import PlaceType from "../../enum/placeType.enum";
import Ipost from "../../interface/post.interface";

export const getEventsList = async () => {
  try {
    const response = await axios.instance.get("/events");
    return (response);
  } catch (error) {
    return (error);
  }
}

export const searchEvent = async (
  stt: string | null,
  end: string | null,
  loc: string | null
): Promise<Ievent[]> => {
  try {
    stt = stt ?? end;
    end = end ?? stt;
    const querys = [
      stt ? `startDate=${stt}` : null,
      end ? `endDate=${end}` : null,
      loc ? `locationCode=${loc}` : null,
    ].filter((x) => x != null);
    const url = `/events?${querys.join("&")}`;
    const response = await axios.instance.get<Ievent[]>(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLocations = async (): Promise<Ilocation[]> => {
  try {
    const response = await axios.instance.get<Ilocation[]>("/locations");
    return (response.data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getTypes = async (): Promise<Itype[]> => {
  try {
    const response = await axios.instance.get<Itype[]>("/event-type");
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

export const writePost = async (data: Ipost) => {
  try {
    const response = await axios.instance.post<Ipost>("/events", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
}
