import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OrganizerEvent } from "@/data/adminData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventsTableProps {
  events: OrganizerEvent[];
}

export function EventsTable({ events }: EventsTableProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: "Ativo", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
      finished: { label: "Finalizado", className: "bg-muted text-muted-foreground" },
      cancelled: { label: "Cancelado", className: "bg-destructive/10 text-destructive border-destructive/20" }
    };
    const variant = variants[status] || variants.active;
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
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


  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Evento</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Vendidos</TableHead>
            <TableHead className="text-right">Receita</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <span className="font-medium text-foreground">{event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(event.date)}
              </TableCell>
              <TableCell className="text-muted-foreground">{event.location}</TableCell>
              <TableCell>{getStatusBadge(event.status)}</TableCell>
              <TableCell className="text-center">
                <span className="font-medium text-foreground">{event.ticketsSold}</span>
                <span className="text-muted-foreground">/{event.capacity}</span>
              </TableCell>
              <TableCell className="text-right font-medium text-foreground">
                R$ {(event.revenue ?? 0).toLocaleString("pt-BR")}

              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/admin/events/${event.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver ingressos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/admin/events/edit/${event.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar evento
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
