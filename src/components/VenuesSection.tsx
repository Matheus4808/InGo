import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import { venues } from "@/data/events";

export const VenuesSection = () => {
  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Eventos por local
            </h2>
            <p className="text-muted-foreground mt-1">
              Encontre eventos nos principais espaços da cidade
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {venues.map((venue) => (
            <Card 
              key={venue.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 bg-card"
            >
              {/* Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                
                {/* Event Count Badge */}
                <Badge 
                  variant="default"
                  className="absolute top-3 right-3"
                >
                  {venue.eventCount} eventos
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {venue.name}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
