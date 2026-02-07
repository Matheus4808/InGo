import eventParty from "@/assets/event-party.jpg";
import eventConcert from "@/assets/event-concert.jpg";
import eventTheater from "@/assets/event-theater.jpg";
import eventSports from "@/assets/event-sports.jpg";
import eventConference from "@/assets/event-conference.jpg";
import eventComedy from "@/assets/event-comedy.jpg";

export type EventStatus = "available" | "selling-fast" | "last-tickets" | "sold-out";
export type EventCategory = "show" | "party" | "theater" | "sports" | "conference" | "comedy";

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  organizerId: string;
  organizerName: string;
  price: number | "free";
  status: EventStatus;
  category: EventCategory;
  image: string;
  description?: string;
}

export interface Organizer {
  id: string;
  name: string;
  logo: string;
  activeEvents: number;
}

export interface Venue {
  id: string;
  name: string;
  image: string;
  eventCount: number;
}

export async function getEvents(): Promise<Event[]> {
  try {
     const response = await fetch("http://localhost:3000/events");
    //const response = await fetch("http://localhost:3000/events");
    if (!response.ok) {
      throw new Error("Houve uma falha na comunicação com o servidor.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
}

export async function getOrganizers(): Promise<Organizer[]> {
  try {
    const response = await fetch("https://api-zavlosoft.shop/organizers");
    if (!response.ok) {
      throw new Error("Houve uma falha de comunicação com o servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar organizadores:", error);
    return [];
  }
}

export const categories: { value: EventCategory; label: string }[] = [
  { value: "show", label: "Show" },
  { value: "party", label: "Festa" },
  { value: "theater", label: "Teatro" },
  { value: "sports", label: "Esporte" },
  { value: "conference", label: "Congresso" },
  { value: "comedy", label: "Comédia" }
];
