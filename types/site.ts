export type SiteStatus = "connected" | "attention" | "offline";

export type MonitoringSite = {
  id: string;
  name: string;
  location: string;
  type: string;
  deviceId: string;
  status: SiteStatus;
  lastSeen: string;
  temperatureC: number | null;
  signalPercent: number | null;
  batteryPercent: number | null;
  minTemperatureC: number;
  maxTemperatureC: number;
  description: string;
};
