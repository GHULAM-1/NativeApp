import { IoniconsName } from "./icon-names";

export type CareerOption = {
  id: string;
  title: string;
  icon: IoniconsName; // Restrict to valid Ionicons names
  note: string;
};
