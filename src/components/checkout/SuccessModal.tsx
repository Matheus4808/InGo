import { CheckCircle, Copy, Download, Home, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketNumber: string;
  customerName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  quantity: number;
  ticketPdfUrl?: string;
  orderId: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  ticketNumber,
  customerName,
  eventTitle,
  eventDate,
  eventVenue,
  ticketPdfUrl,
  quantity,
  orderId
}: SuccessModalProps) => {
  const { toast } = useToast();

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketNumber);
    toast({
      title: "Código copiado!",
      description: "O número do ingresso foi copiado para a área de transferência.",
    });
  };

  const handleDownloadPdf = () => {
    const url = `https://jamari-immethodical-cheerlessly.ngrok-free.dev/api/orders/${orderId}/ticket`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Compra realizada com sucesso!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Ticket Number */}
          <div className="text-center p-6 bg-accent/30 rounded-xl border-2 border-dashed border-primary">
            <p className="text-sm text-muted-foreground mb-2">Número do ingresso</p>
            <div className="flex items-center justify-center gap-3">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="text-3xl font-mono font-bold text-primary">{ticketNumber}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-muted-foreground hover:text-foreground"
              onClick={handleCopyTicket}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar código
            </Button>
          </div>

          <Separator className="bg-border" />

          {/* Purchase Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Comprador</span>
              <span className="font-medium text-foreground">{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Evento</span>
              <span className="font-medium text-foreground">{eventTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data</span>
              <span className="font-medium text-foreground">{eventDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Local</span>
              <span className="font-medium text-foreground">{eventVenue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantidade</span>
              <span className="font-medium text-foreground">{quantity} ingresso(s)</span>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-center text-foreground">
              <strong>⚠️ Importante:</strong> Faça o download do seu ingresso em PDF e apresente-o na entrada do evento.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              className="w-full flex gap-2 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleDownloadPdf}
            >
              <Download className="h-4 w-4" />
              Baixar ingresso (PDF)
            </Button>

            <Link to="/" className="w-full">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Home className="h-4 w-4 mr-2" />
                Voltar para eventos
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
