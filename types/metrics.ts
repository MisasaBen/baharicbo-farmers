export type ReadingStatus = "normal" | "attention";

export type MonitoringReading = {
  id: string;
  siteId: string;
  date: string;
  time: string;
  temperatureC: number;
  signalPercent: number;
  batteryPercent: number;
  status: ReadingStatus;
};
