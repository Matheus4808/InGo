import { EventCard } from "./EventCard";
import { Event, EventCategory } from "@/data/events";

interface EventListProps {
  events: Event[];
  selectedDate: string | null;
  selectedCategory: EventCategory | null;
  selectedPrice: string | null;
}

const filterByPrice = (event: Event, priceFilter: string | null) => {
  if (!priceFilter) return true;
  
  const price = event.price;
  
  switch (priceFilter) {
    case "free":
      return price === "free";
    case "0-50":
      return typeof price === "number" && price <= 50;
    case "50-100":
      return typeof price === "number" && price > 50 && price <= 100;
    case "100+":
      return typeof price === "number" && price > 100;
    default:
      return true;
  }
};

export const EventList = ({ 
  events, 
  selectedDate, 
  selectedCategory, 
  selectedPrice 
}: EventListProps) => {
  const filteredEvents = events.filter((event) => {
    // Category filter
    if (selectedCategory && event.category !== selectedCategory) {
      return false;
    }

    // Price filter
    if (!filterByPrice(event, selectedPrice)) {
      return false;
    }

    // Date filter (simplified for demo)
    if (selectedDate) {
      const eventDate = new Date(event.date + "T00:00:00");
      const today = new Date();
      
      switch (selectedDate) {
        case "today":
          return eventDate.toDateString() === today.toDateString();
        case "weekend":
          const dayOfWeek = eventDate.getDay();
          return dayOfWeek === 0 || dayOfWeek === 6;
        case "month":
          return eventDate.getMonth() === today.getMonth();
        default:
          return true;
      }
    }

    return true;
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          Nenhum evento encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
