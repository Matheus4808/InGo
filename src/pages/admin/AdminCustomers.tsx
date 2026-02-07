import { AdminLayout } from "@/components/admin/AdminLayout";
import { CustomersTable } from "@/components/admin/CustomersTable";
import { useAuth } from "@/contexts/AuthContext";
//import { customers } from "@/data/adminData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useEffect, useState } from 'react';

export default function AdminCustomers() {
  const { organizer } = useAuth();
  const [customerList, setCustomerList] = useState([]); // Estado para lista de clientes '[]' -> Array
  const [totalCustomers, setTotalCustomers] = useState(0); // Estado para quantidade em numeros
  const [totalSpent, setTotalSpent] = useState(0); // Estado para total gasto em numeros
  //const orgId = organizer?.id || "";
  //const customerList = customers[orgId] || [];
  //const totalCustomers = customerList.length;
  //const totalSpent = customerList.reduce((acc, c) => acc + c.totalSpent, 0);

  useEffect(() => {
    if (!organizer?.organizerId) return;

    async function fetchCustomers() {
      try {
        const res = await fetch(
          `https://api-zavlosoft.shop/api/organizer/${organizer.organizerId}/customers`
        );

        const data = await res.json();
        setCustomerList(data.customers);
        setTotalCustomers(data.customers.length);
        const total = data.customers.reduce((acc: number, c: any) => acc + c.totalSpent, 0);
        setTotalSpent(total);
      } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
      }

      fetchCustomers();
    }
  }, [organizer?.organizerId]);

  return (
    <AdminLayout title="Clientes">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Clientes</p>
                  <p className="text-3xl font-bold text-foreground">{totalCustomers}</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total em Vendas</p>
                  <p className="text-3xl font-bold text-foreground">
                    R$ {totalSpent.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              Clientes que compraram ingressos para seus eventos
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <CustomersTable customers={customerList} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
