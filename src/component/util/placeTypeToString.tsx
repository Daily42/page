import PlaceType from "../../enum/placeType.enum";

export function placeTypeToString(placeType: PlaceType): string {
  switch (placeType) {
    case PlaceType.null:
      return "0";
    case PlaceType.PL0000:
      return "PL0000";
    case PlaceType.PL0100:
      return "PL0100";
    case PlaceType.PL0200:
      return "PL0200";
    case PlaceType.PL0001:
      return "PL0001";
    case PlaceType.PL0002:
      return "PL0002";
    case PlaceType.PL0003:
      return "PL0003";
    case PlaceType.PL0004:
      return "PL0004";
    case PlaceType.PL0005:
      return "PL0005";
    case PlaceType.PL0006:
      return "PL0006";
    case PlaceType.PL0007:
      return "PL0007";
    case PlaceType.PL0008:
      return "PL0008";
    case PlaceType.PL0009:
      return "PL0009";
    case PlaceType.PL0010:
      return "PL0010";
    case PlaceType.PL0011:
      return "PL0011";
    case PlaceType.PL0012:
      return "PL0012";
    case PlaceType.PL0013:
      return "PL0013";
    case PlaceType.PL0014:
      return "PL0014";
    case PlaceType.PL0015:
      return "PL0015";
    case PlaceType.PL0016:
      return "PL0016";
    default:
      return "";
  }
}
