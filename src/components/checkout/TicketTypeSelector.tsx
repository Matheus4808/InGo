import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ticket } from "lucide-react";

interface TicketTypeSelectorProps {
  ticketType: string;
  onTicketTypeChange: (type: string) => void;
  basePrice: number;
}

const TicketTypeSelector = ({ ticketType, onTicketTypeChange, basePrice }: TicketTypeSelectorProps) => {
  const ticketOptions = [
    { value: "inteira", label: "Inteira", price: basePrice, description: "Ingresso padrão" },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Ticket className="h-5 w-5 text-primary" />
          Tipo de Ingresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={ticketType} onValueChange={onTicketTypeChange} className="space-y-3">
          {ticketOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label 
                htmlFor={option.value} 
                className="flex-1 flex items-center justify-between cursor-pointer p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div>
                  <span className="font-medium text-foreground">{option.label}</span>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <span className="font-bold text-primary">R$ {option.price.toFixed(2)}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TicketTypeSelector;
