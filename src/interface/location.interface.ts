import PlaceType from "../enum/placeType.enum"

export default interface Ilocation {
  code: PlaceType;
  parentCode?: null | PlaceType;
  title: string;
  sort: number;
  parent?: Ilocation;
}
