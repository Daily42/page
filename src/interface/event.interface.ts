import PlaceType from "../enum/placeType.enum"
import Ilocation from "./location.interface"
import Idate from "./date.interface"
import Itype from "./type.interface"

export default interface Ievent {
  id: number; // event id seq
  title: string; // event title string
  typeId: 1;
  context: string;
  createdAt: string;
  locationCode: PlaceType;
  locationName: string;
  location: Ilocation;
  dates: Idate[];
  type: Itype[];
}
