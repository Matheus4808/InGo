import { Calendar, MapPin, User, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EventSummaryProps {
  event: {
    id: number;
    title: string;
    image: string;
    date: string;
    time: string;
    venue: string;
    organizer: string;
    organizerName: string;
    price: number;
  };
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  ticketType: string;
}

const EventSummary = ({ event, quantity, onQuantityChange, ticketType }: EventSummaryProps) => {
  const getTicketMultiplier = () => {
    switch (ticketType) {
      case "meia":
        return 0.5;
      case "vip":
        return 2;
      default:
        return 1;
    }
  };

  const ticketPrice = event.price * getTicketMultiplier();
  const subtotal = ticketPrice * quantity;
  //const taxRate = 0.1; // 10% taxa
  //const taxes = subtotal * taxRate;
  const total = subtotal;

  return (
    <Card className="bg-card border-border sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Resumo da Compra</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Event Image */}
        <div className="rounded-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-32 object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <h3 className="font-bold text-foreground text-lg">{event.title}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.date} às {event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4 text-primary" />
              <span>{event.organizerName}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Quantity Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Quantidade</span>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-bold text-foreground w-6 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tipo de ingresso</span>
            <span className="font-medium text-foreground capitalize">{ticketType}</span>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Pricing Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ingresso ({ticketType})</span>
            <span className="text-foreground">R$ {ticketPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantidade</span>
            <span className="text-foreground">x {quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa de serviço</span>
            {/* <span className="text-foreground">R$ {taxes.toFixed(2)}</span> */}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">R$ {total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventSummary;
