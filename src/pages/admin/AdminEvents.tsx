/*import { AdminLayout } from "@/components/admin/AdminLayout";
import { EventsTable } from "@/components/admin/EventsTable";
import { useAuth } from "@/contexts/AuthContext";
import { organizerEvents } from "@/data/adminData";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminEvents() {
  const { organizer } = useAuth();
  const navigate = useNavigate();
  const orgId = organizer?.id || "";
  const events = organizerEvents[orgId] || [];

  return (
    <AdminLayout title="Meus Eventos">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Gerencie seus eventos e acompanhe as vendas
            </p>
          </div>
          <Button onClick={() => navigate("/admin/create-event")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Evento
          </Button>
        </div>

        <EventsTable events={events} />
      </div>
    </AdminLayout>
  );
}*/

import { AdminLayout } from "@/components/admin/AdminLayout";
import { EventsTable } from "@/components/admin/EventsTable";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminEvents() {
  const { organizer } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!organizer?.organizerId) return;

    const fetchEvents = async () => {
      const res = await fetch(
        `https://api-zavlosoft.shop/api/events/by-organizer/${organizer.organizerId}`
      );

      const data = await res.json();
      // console.log("Evento 0:", data[0]);
      // console.log("ticketsSold:", data[0]?.ticketsSold);
      // console.log("tickets_sold:", data[0]?.tickets_sold);

      const normalized = data.map((event: any) => ({
        ...event,

        // 🔥 converte snake_case → camelCase
        ticketsSold: Number(event.ticketsSold ?? event.tickets_sold ?? 0),

        // segurança extra
        capacity: Number(event.capacity ?? 0),
        revenue: Number(event.revenue ?? 0),
      }));

      setEvents(normalized);

    };

    fetchEvents();
  }, [organizer]);


  return (
    <AdminLayout title="Meus Eventos">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Gerencie seus eventos e acompanhe as vendas
          </p>

          <Button onClick={() => navigate("/admin/create-event")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Evento
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Carregando eventos...</p>
        ) : (
          <EventsTable events={events} />
        )}
      </div>
    </AdminLayout>
  );
}
