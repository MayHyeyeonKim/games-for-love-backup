export type Hospital = {
  id: string;
  hospitalInfoRecordId: string;
  requestRecordId: string | undefined;
  name: string;
  status: "active" | "past";
  type: string;
  description: string;
  year: number;
  country: string;
  state: string;
  zip: string;
  city: string;
  address: string;
  longitude: number;
  latitude: number;
  hospitalPictures: string[];
  fundingDeadline: string | undefined;
  requested: number | undefined;
  fundingCompleted: number | undefined;
};

