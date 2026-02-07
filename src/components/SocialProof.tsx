import { Ticket, QrCode, Smartphone, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Ingressos digitais",
    description: "Compre e receba seu ingresso online, sem papel e sem complicação."
  },
  {
    icon: QrCode,
    title: "Validação por QR Code",
    description: "Entrada rápida e segura com leitura via scanner no dia do evento."
  },
  {
    icon: Smartphone,
    title: "Tudo no seu celular",
    description: "Acesse seus ingressos a qualquer momento direto pelo smartphone."
  },
  {
    icon: ShieldCheck,
    title: "Compra 100% segura",
    description: "Pagamentos protegidos e controle antifraude para organizadores."
  }
];

export const SocialProof = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            A melhor forma de gerenciar ingressos para eventos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma moderna para quem organiza eventos e para quem quer entrar sem filas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            🚀 Tecnologia pensada para eventos rápidos, organizados e seguros
          </p>
        </div>
      </div>
    </section>
  );
};
