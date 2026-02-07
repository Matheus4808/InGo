import { Lock, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutHeader = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {/* <div className="bg-primary rounded-lg p-2">
              <Ticket className="h-5 w-5 text-primary-foreground" />
            </div> */}
            {/* <span className="text-xl font-bold text-foreground">InGo</span> */}
            <a href="/" className="flex items-center shrink-0">
              <img
                src="/ingo-logo.png"
                alt="InGo"
                className="h-8 md:h-10 w-auto"
                loading="eager"
              />
            </a>
          </Link>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Checkout seguro</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
