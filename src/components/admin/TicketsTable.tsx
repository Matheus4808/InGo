import { useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";
import { Ticket } from "@/data/adminData";
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
import { toast } from "@/hooks/use-toast";

interface TicketsTableProps {
  tickets: Ticket[];
}

export function TicketsTable({ tickets: initialTickets }: TicketsTableProps) {
  const [tickets, setTickets] = useState(initialTickets);

  const handleMarkAsUsed = (ticketId: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, status: "used" as const } : t
      )
    );
    toast({
      title: "Ingresso validado",
      description: "O ingresso foi marcado como utilizado."
    });
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      inteira: { label: "Inteira", className: "bg-primary/10 text-primary border-primary/20" },
      meia: { label: "Meia", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      vip: { label: "VIP", className: "bg-purple-500/10 text-purple-500 border-purple-500/20" }
    };
    const variant = variants[type] || variants.inteira;
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === "used") {
      return <Badge variant="outline" className="bg-muted text-muted-foreground">Utilizado</Badge>;
    }
    return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Válido</Badge>;
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nº Ingresso</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>E-mail</TableHead>
            {/* <TableHead>Telefone</TableHead> */}
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-mono font-medium text-foreground">
                {ticket.ticket_number}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {ticket.attendee_name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.attendee_email}
              </TableCell>
              {/* <TableCell className="text-muted-foreground">
                {ticket.customerPhone}
              </TableCell> */}
              <TableCell>{getTypeBadge(ticket.ticketType)}</TableCell>
              <TableCell>{getStatusBadge(ticket.status)}</TableCell>
              <TableCell>
                {ticket.status === "valid" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleMarkAsUsed(ticket.id)}>
                        <Check className="mr-2 h-4 w-4" />
                        Marcar como utilizado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
