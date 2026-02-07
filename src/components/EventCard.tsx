import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Ticket, Eye } from "lucide-react";
import { Event, EventStatus } from "@/data/events";

interface EventCardProps {
  event: Event;
}

const statusConfig: Record<EventStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  available: { label: "Disponível", variant: "secondary" },
  "selling-fast": { label: "Esgotando", variant: "default" },
  "last-tickets": { label: "Últimos ingressos", variant: "destructive" },
  "sold-out": { label: "Esgotado", variant: "outline" }
};

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day); // ✅ local, sem UTC

  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });
};


const formatPrice = (price: number | "free") => {
  if (price === "free") return "Gratuito";
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
};

export const EventCard = ({ event }: EventCardProps) => {
  if (!event) return null; // evita renderizar se o event ainda não carregou
  const navigate = useNavigate();
  const status =
    statusConfig[event.status] ??
    { label: "Status desconhecido", variant: "secondary" };

  const isSoldOut = event.status === "sold-out";

  const handleBuyClick = () => {
    if (!isSoldOut) {
      navigate(`/checkout?event=${event.id}`);
    }
  };

  return (
    <Card className="group overflow-hidden bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Status Badge */}
        <Badge
          variant={status.variant}
          className="absolute top-3 right-3"
        >
          {status.label}
        </Badge>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
            {formatPrice(event.price)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Event Title */}
        <h3 className="font-bold text-lg text-foreground line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
          {event.name}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span className="capitalize">{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 text-primary ml-2 shrink-0" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{event.organizer}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1 gap-2"
            disabled={isSoldOut}
            onClick={handleBuyClick}
          >
            <Ticket className="w-4 h-4" />
            {isSoldOut ? "Esgotado" : "Comprar ingresso"}
          </Button>
          <Button variant="outline" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
