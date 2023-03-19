import Idate from "./date.interface";
import PlaceType from "../enum/placeType.enum";

export default interface Ipost {
  title?: string,
  typeId?: string,
  context?: string,
  locationCode?: PlaceType,
  locationName?: string,
  dates?: Idate[],
}
