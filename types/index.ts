export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  deposit: number;
  capacity: number;
  location: string;
  image: string;
  amenities: string[];
  overview: string;
  rating?: number;
  ownerName?: string;
  ownerEmail?: string;
}

export type StudioInput = Omit<Studio, "_id" | "rating" | "ownerName" | "ownerEmail">;

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}