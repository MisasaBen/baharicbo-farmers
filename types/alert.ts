export type AlertMetric = "Temperature" | "Connectivity" | "Battery";
export type AlertSeverity = "warning" | "critical";
export type AlertStatus = "active" | "acknowledged" | "resolved";

export type MonitoringAlert = {
  id: string;
  title: string;
  metric: AlertMetric;
  value: string;
  siteId: string;
  siteName: string;
  severity: AlertSeverity;
  status: AlertStatus;
  detectedAt: string;
  description: string;
  action: string;
};
