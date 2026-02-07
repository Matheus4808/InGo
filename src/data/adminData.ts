import { Event, getEvents  } from "./events";

const events: Event[] = await getEvents();


export interface Organizer {
  id: string;
  name: string;
  email: string;
  password: string; // Simulado - em produção seria hash
}

export interface Ticket {
  id: string;
  ticket_number: string;
  eventId: string;
  attendee_name: string;
  attendee_email: string;
  customerPhone: string;
  ticketType: "inteira";
  status: "valid" | "used";
  purchaseDate: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalTickets: number;
  totalSpent: number;
  lastPurchase: string;
}

export interface OrganizerEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  organizerId: string;
  organizerName: string;
  price: number | "free";
  status: "active" | "finished" | "cancelled";
  category: string;
  image: string;
  description?: string;
  ticketsSold: number;
  revenue:number;
  capacity: number;
}



