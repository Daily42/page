export interface IDateObject {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export default interface Idate {
  id?: number; // date id seq
  eventId?: number; // event Id from IEvent
  startAt?: string; // start date
  term?: number; // minute
}
