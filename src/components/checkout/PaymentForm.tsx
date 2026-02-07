import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, QrCode } from "lucide-react";
import { CardPayment } from "@mercadopago/sdk-react";

interface PaymentFormProps {
  paymentMethod: string;
  amount: number;
  mpReady: boolean;
  onPaymentMethodChange: (method: string) => void;
  onSubmitCardPayment: (card: {
    token: string;
    paymentMethodId: string;
    installments: number;
  }) => Promise<void>; // 👈 IMPORTANTE
}

const PaymentForm = ({
  paymentMethod,
  amount,
  mpReady,
  onPaymentMethodChange,
  onSubmitCardPayment
}: PaymentFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Forma de Pagamento
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <Label className="flex items-center gap-3 cursor-pointer">
            <RadioGroupItem value="pix" />
            <QrCode className="h-5 w-5" /> PIX
          </Label>

          <Label className="flex items-center gap-3 cursor-pointer">
            <RadioGroupItem value="credit" />
            <CreditCard className="h-5 w-5" /> Cartão de Crédito
          </Label>
        </RadioGroup>

        {paymentMethod === "pix" && (
          <div className="p-4 border rounded text-sm">
            O QR Code será gerado após finalizar a compra.
          </div>
        )}

        {paymentMethod === "credit" && mpReady && (
          <CardPayment
            initialization={{ amount }}
            onSubmit={async (data) => {
              await onSubmitCardPayment({
                token: data.token,
                paymentMethodId: data.payment_method_id,
                installments: data.installments ?? 1
              });
            }}
            onError={(error) => {
              console.error("Erro MP:", error);
            }}
          />
        )}

        {paymentMethod === "credit" && !mpReady && (
          <div className="p-4 border rounded text-sm">
            Carregando pagamento seguro...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
