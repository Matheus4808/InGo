import { Button } from "@/components/ui/button";
import { Ticket, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-concert.jpg";

export const HeroSection = () => {
  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-medium">A plataforma de ingressos da sua cidade</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
            Descubra os{" "}
            <span className="text-primary">melhores eventos</span>
            {" "}da sua cidade
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Shows, festas, palestras, esportes e muito mais. Garanta seu ingresso para experiências inesquecíveis.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6 gap-2"
              onClick={scrollToEvents}
            >
              <Ticket className="w-5 h-5" />
              Ver eventos disponíveis
            </Button>
            {/* <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6"
            >
              Como funciona
            </Button> */}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Eventos ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Ingressos vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Organizadores</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={scrollToEvents}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </section>
  );
};
