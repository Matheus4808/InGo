import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Ticket } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TicketsTable } from "@/components/admin/TicketsTable";
import { useAuth } from "@/contexts/AuthContext";
//import { organizerEvents, getEventTickets } from "@/data/adminData";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminEventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { organizer } = useAuth();
  //const orgId = organizer?.id || "";

  //const events = organizerEvents[orgId] || [];
  //const event = events.find(e => e.id === id);
  //const tickets = getEventTickets(id || "");
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !organizer?.organizerId) return;

    async function fetchEventDetails() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api-zavlosoft.shop/api/events/${id}`
        );

        const data = await res.json();
        setEvent(data.event);
        setTickets(data.tickets);
      } catch (error) {
        console.error("Erro ao buscar detalhes do evento:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetails(); // ✅ AGORA NO LUGAR CERTO
  }, [id, organizer?.organizerId]);



  if (!event) {
    return (
      <AdminLayout title="Evento não encontrado">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Este evento não foi encontrado.</p>
          <Button variant="link" onClick={() => navigate("/admin/events")}>
            Voltar para eventos
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  const formatTime = (time: string) => time.slice(0, 5);


  return (
    <AdminLayout title="Detalhes do Evento">
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/events")}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={event.image}
                alt={event.name}
                className="w-full md:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-foreground">{event.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.event_date)} às {formatTime(event.event_time)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
                <div className="flex gap-6 pt-2">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      {event.ticketsSold}
                    </div>
                    <p className="text-xs text-muted-foreground">de {event.capacity} vendidos</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                      <Ticket className="h-5 w-5 text-emerald-500" />
                      R$ {event.revenue.toLocaleString("pt-BR")}
                    </div>
                    <p className="text-xs text-muted-foreground">receita total</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Ingressos Vendidos</CardTitle>
            <CardDescription>
              Lista de todos os ingressos vendidos para este evento
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {tickets.length > 0 ? (
              <TicketsTable tickets={tickets} />
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                Nenhum ingresso vendido ainda
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
