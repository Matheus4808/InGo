import { Customer } from "@/data/adminData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Cliente</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="text-center">Ingressos</TableHead>
            <TableHead className="text-right">Total Gasto</TableHead>
            <TableHead>Última Compra</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium text-foreground">
                {customer.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {customer.email}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {customer.phone}
              </TableCell>
              <TableCell className="text-center font-medium text-foreground">
                {customer.totalTickets}
              </TableCell>
              <TableCell className="text-right font-medium text-foreground">
                R$ {customer.totalSpent.toLocaleString("pt-BR")}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(customer.lastPurchase)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
