export type FarmerProfile = {
  id: string;
  name: string;
  role: "Farmer" | "Technical Staff" | "Admin";
  assignedSiteId: string;
  assignedSite: string;
  location: string;
  phone: string;
  email: string;
  accountStatus: "Active" | "Pending" | "Suspended";
};
