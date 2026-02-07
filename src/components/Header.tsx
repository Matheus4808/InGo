import { Ticket, QrCode, ShieldCheck, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          {/* <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-xl">I</span>
            </div>
            <span className="font-semibold text-xl text-foreground">
              InGo
            </span>
          </div> */}

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/ingo-logo.png"
              alt="InGo"
              className="h-8 md:h-10 w-auto"
              loading="eager"
            />
          </a>


          {/* Localização */}
          {/* <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Várzea da Palma, MG</span>
          </div> */}

          {/* Trust badges */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary" />
              Ingresso digital
            </div>
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-primary" />
              QR Code único
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Pagamento seguro
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 pt-2 space-y-5 animate-in slide-in-from-top-2">
            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Várzea da Palma, MG
            </div> */}

            <div className="space-y-3 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-primary" />
                Ingressos 100% digitais
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary" />
                Validação rápida por QR Code
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Ambiente seguro
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
