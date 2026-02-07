import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { EventsTable } from "@/components/admin/EventsTable";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
//import { getDashboardMetrics, organizerEvents } from "@/data/adminData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const { organizer } = useAuth();
  const orgId = organizer.organizerId;
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    TicketsSoldResult: 0,
    soldOutEvents: 0,
  });
  //const events = organizerEvents[orgId] || [];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizer?.organizerId) return;

    const fetchDashboard = async () => {
      setLoading(true);
      const res = await fetch(`https://api-zavlosoft.shop/api/dashboard/by-organizer/${organizer.organizerId}`
      );

      const data = await res.json();


      setMetrics({
        totalEvents: data.totalEvents,
        totalRevenue: data.totalRevenue,
        TicketsSoldResult: data.ticketSoldResult,
        soldOutEvents: data.soldOutEvents ?? 0,
      })

      setEvents(data.recentEvents);
      setLoading(false);
    };

    fetchDashboard();
  }, [organizer]);

  /*
Esse useEffect é responsável por buscar os dados reais do evento e seus ingressos.

1. Os estados (event, tickets, loading) controlam os dados e o estado da tela.
2. O useEffect roda quando o ID do evento ou o organizador mudam.
3. A verificação inicial evita chamadas inválidas à API.
4. A função fetchEventDetails busca os dados no backend.
5. O loading evita renderizar dados incompletos.
6. setEvent e setTickets atualizam o estado e re-renderizam a UI.
7. Esse padrão garante que a tela sempre reflita os dados reais do banco.

Esse é o fluxo correto para telas baseadas em dados no React.
*/



  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <h2 className="text-base sm:text-lg font-medium text-foreground">
            Bem-vindo, {organizer?.name}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Aqui está um resumo dos seus eventos e vendas
          </p>
        </div>

        {/* Cards métricos */}
        <div className="w-full min-w-0">
          <DashboardCards {...metrics} />
        </div>


        {/* Eventos */}
        <Card className="border-border">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">
              Eventos Recentes
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Seus eventos ativos e suas métricas de vendas
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <EventsTable events={events} />
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );

}
