import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const eventSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  date: z.string().min(1, "Informe a data do evento"),
  time: z.string().min(1, "Informe o horário"),
  location: z.string().min(3, "Informe o local do evento"),
  capacity: z.string().min(1, "Informe a capacidade"),
  priceInteira: z.string().min(1, "Informe o preço da inteira"),
  priceMeia: z.string().optional(),
  priceVip: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

const categories = [
  { value: "show", label: "Show" },
  { value: "party", label: "Festa" },
  { value: "theater", label: "Teatro" },
  { value: "sports", label: "Esporte" },
  { value: "conference", label: "Congresso" },
  { value: "comedy", label: "Comédia" },
];


export default function AdminCreateEvent() {
  const { organizer } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasMeia, setHasMeia] = useState(false);
  const [hasVip, setHasVip] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      priceInteira: "",
      priceMeia: "",
      priceVip: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /*const onSubmit = async (data: EventFormData) => {
    if (!organizer) return;

    setIsLoading(true);

    try {
      const response = await fetch("https://api-zavlosoft.shop/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          organizerId: organizer.id,
          imageUrl: imagePreview // opcional
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao criar evento");
      }

      toast({
        title: "Evento criado com sucesso!",
        description: "Seu evento foi publicado.",
      });

      navigate("/admin/events");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o evento",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };*/

  const onSubmit = async (data: EventFormData) => {
    if (!organizer) return;

    setIsLoading(true);

    try {
       const response = await fetch("https://api-zavlosoft.shop/api/events", {
      // const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: organizer.id,
          name: data.name,
          description: data.description,
          category: data.category,
          event_date: data.date,
          event_time: data.time,
          location: data.location,
          capacity: parseInt(data.capacity, 10),
          price: (data as any).price || data.priceInteira,
          image: imagePreview || ""
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao criar evento");
      }

      // ✅ sucesso
      toast({
        title: "Evento publicado 🎉",
        description: "Seu evento foi criado com sucesso",
      });

      // opcional
      // reset();
      // navigate("/admin/events");

    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o evento",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <AdminLayout title="Criar Evento">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/events")}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Novo Evento</CardTitle>
            <CardDescription>
              Preencha as informações do evento para publicá-lo na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Upload de imagem */}
                <div className="space-y-2">
                  <Label>Imagem do Evento</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setImagePreview(null)}
                        >
                          Remover
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Clique para fazer upload da imagem
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Informações básicas */}
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Nome do Evento</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Festival de Verão 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva seu evento..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Arena Central" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacidade Total</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Preços */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Tipos de Ingresso</Label>

                  <FormField
                    control={form.control}
                    name="priceInteira"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço Inteira (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasMeia"
                      checked={hasMeia}
                      onCheckedChange={(checked) => setHasMeia(checked as boolean)}
                    />
                    <label htmlFor="hasMeia" className="text-sm cursor-pointer">
                      Oferecer meia-entrada
                    </label>
                  </div>

                  {hasMeia && (
                    <FormField
                      control={form.control}
                      name="priceMeia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço Meia (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasVip"
                      checked={hasVip}
                      onCheckedChange={(checked) => setHasVip(checked as boolean)}
                    />
                    <label htmlFor="hasVip" className="text-sm cursor-pointer">
                      Oferecer ingresso VIP
                    </label>
                  </div>

                  {hasVip && (
                    <FormField
                      control={form.control}
                      name="priceVip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço VIP (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )} */}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/events")}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publicando...
                      </>
                    ) : (
                      "Publicar Evento"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
