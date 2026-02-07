import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Organizer } from "@/data/events";

interface FeaturedOrganizersProps {
  organizers: Organizer[];
}

export const FeaturedOrganizers = ({ organizers }: FeaturedOrganizersProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Organizadores em destaque
            </h2>
            <p className="text-muted-foreground mt-1">
              Os principais produtores de eventos da cidade
            </p>
          </div>
        </div>

        {organizers.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum organizador encontrado.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {organizers.map((org) => (
              <Card
                key={org.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card"
              >
                <CardContent className="p-6 text-center">
                  {/* Logo Avatar */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-bold text-primary">
                      {org.logo}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {org.name}
                  </h3>

                  {/* Active Events */}
                  <Badge variant="secondary">
                    {org.activeEvents} eventos ativos
                  </Badge>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 mx-auto text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
