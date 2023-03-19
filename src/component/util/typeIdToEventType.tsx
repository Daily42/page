import EventType from "../../enum/eventType.enum";

export function typeIdToEventType(typeId: number): EventType {
  switch (typeId) {
    case 0:
      return EventType.EV00;
    case 1:
      return EventType.EV10;
    case 2:
      return EventType.EV20;
    case 3:
      return EventType.EV30;
    case 4:
      return EventType.EV40;
    default:
      throw new Error("Invalid typeId provided");
  }
}
