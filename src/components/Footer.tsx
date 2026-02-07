import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">I</span>
              </div>
              <span className="font-bold text-xl text-foreground">InGo</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A plataforma de ingressos que conecta você aos melhores eventos da sua cidade.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Varzea da Palma, MG - Brasil</span>
            </div>
          </div>

          {/* Links */}
          {/* <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Eventos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Organizadores</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Locais</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categorias</a></li>
            </ul>
          </div> */}

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/politica-de-privacidade" className="hover:text-primary transition-colors">Política de privacidade</a></li>
              <li><a href="/termos-de-uso" className="hover:text-primary transition-colors">Termos de uso</a></li>
              <li><a href="/seja-um-organizador" className="hover:text-primary transition-colors">Seja um organizador</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:matheus.dev48@gmail.com" className="hover:text-primary transition-colors">
                  matheus.dev48@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(31) 98406-6744</span>
              </li>
            </ul>
            
            {/* Social */}
            {/* <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div> */}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 InGo. Todos os direitos reservados.</p>
          <p>Feito com ❤️ para a sua cidade</p>
        </div>
      </div>
    </footer>
  );
};
