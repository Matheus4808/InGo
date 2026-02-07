import { Calendar, Ticket, DollarSign, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardsProps {
  totalEvents: number;
  TicketsSoldResult: number;
  totalRevenue: number;
  soldOutEvents: number;
}

export function DashboardCards({
  totalEvents,
  TicketsSoldResult,
  totalRevenue,
  soldOutEvents
}: DashboardCardsProps) {
  const cards = [
    {
      title: "Eventos Ativos",
      value: totalEvents,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Ingressos Vendidos",
      value: TicketsSoldResult.toLocaleString("pt-BR"),
      icon: Ticket,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Receita Total",
      value: `R$ ${totalRevenue.toLocaleString("pt-BR")}`,
      icon: DollarSign,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "Eventos Esgotados",
      value: soldOutEvents,
      icon: AlertCircle,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10"
    }
  ];

  return (
    <div className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-4 
    gap-4
  ">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="border-border w-full"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">

              {/* Texto */}
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {card.title}
                </p>

                <p className="
                text-xl 
                sm:text-2xl 
                lg:text-3xl 
                font-bold 
                text-foreground 
                mt-1 
                truncate
              ">
                  {card.value}
                </p>
              </div>

              {/* Ícone */}
              <div
                className={`
                flex-shrink-0
                p-2 sm:p-3 
                rounded-full 
                ${card.bgColor}
              `}
              >
                <card.icon
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              </div>

            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
