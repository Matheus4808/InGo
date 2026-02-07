import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import EventSummary from "@/components/checkout/EventSummary";
import CustomerForm, { CustomerFormData } from "@/components/checkout/CustomerForm";
import TicketTypeSelector from "@/components/checkout/TicketTypeSelector";
import PaymentForm from "@/components/checkout/PaymentForm";
import SuccessModal from "@/components/checkout/SuccessModal";
import { getEvents, Event } from "@/data/events";
import { useRef } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentFormRef = useRef<any>(null);
  const eventId = searchParams.get("event");
  // const [cardTokenData, setCardTokenData] = useState<{
  //   token: string;
  //   paymentMethodId: string;
  //   installments: number;
  // } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [ticketType, setTicketType] = useState("inteira");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [confirmedData, setConfirmedData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [waitingPayment, setWaitingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'PAID'>('PENDING');
  const [mpReady, setMpReady] = useState(false);

  // Find event from mock data
  const [event, setEvent] = useState<Event | undefined>(undefined);


  useEffect(() => {
    if (!event?.organizerId) return;

    const initMP = async () => {
      try {
        // const res = await fetch(
        //   `https://jamari-immethodical-cheerlessly.ngrok-free.dev/api/organizers/${event.organizerId}/mercadopago-public-key`
        // );
        const res = await fetch(
          `https://api-zavlosoft.shop/api/organizers/${event.organizerId}/mercadopago-public-key`
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Erro HTTP:", res.status, text);
          return;
        }

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          const text = await res.text();
          console.error("Resposta não é JSON:", text);
          return;
        }

        const data = await res.json();

        initMercadoPago(data.publicKey, { locale: "pt-BR" });
        setMpReady(true);
      } catch (err) {
        console.error("Erro ao iniciar MP:", err);
      }
    };

    initMP();
  }, [event?.organizerId]);


  useEffect(() => {
    if (!orderId || !waitingPayment) return;

    const interval = setInterval(async () => {
      const res = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`
      );
      const data = await res.json();

      if (data.status === 'PAID') {
        setPaymentStatus('PAID');
        setWaitingPayment(false);
        setTicketNumber(data.ticketNumber);
        setShowSuccess(true);
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, waitingPayment]);

  useEffect(() => {
    const fetchEvent = async () => {
      const events = await getEvents();
      const foundEvent = events.find((e) => e.id === eventId);
      setEvent(foundEvent);
      //console.log("EVENTO CARREGADO:", foundEvent);
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (eventId && event === undefined) return;
    if (!event && eventId) {
      navigate("/");
    }
  }, [event, eventId, navigate]);

  if (!event) {
    return null;
  }

  const eventPrice =
    event.price
      ? event.price === "free"
        ? 0
        : Number(event.price)
      : 0;

  const eventData = {
    id: Number(event.id), // number
    title: event.name,
    image: event.image,
    date: new Date(event.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
    time: event.time,
    venue: event.location,
    organizer: event.organizerId,
    organizerName: event.organizerName,
    price: eventPrice,
  };

  const handleFormChange = (data: CustomerFormData, isValid: boolean) => {
    setCustomerData(data);
    setIsFormValid(isValid);
  };

  const canFinalize =
    isFormValid &&
    acceptedTerms &&
    confirmedData &&
    paymentMethod === "pix";

  const handleSubmitCardPayment = async (card: {
    token: string;
    paymentMethodId: string;
    installments: number;
  }) => {
    if (!customerData) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            quantity,
            ticketType,
            paymentMethod: "credit",
            customer: customerData,
            card: {
              token: card.token,
              paymentMethodId: card.paymentMethodId,
              installments: card.installments
            }
          })
        }
      );

      const data = await res.json();
      console.log("Checkout response", data);

      if (!res.ok) {
        console.error(data);
        return;
      }

      if (data.paymentStatus === "approved") {
        setPaymentStatus("PAID");
        setOrderId(data.orderId);
        setShowSuccess(true);
      } else {
        console.error("Pagamento rejeitado:", data.statusDetail);
      }
    } catch (err) {
      console.error("Erro cartão:", err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleFinalizePurchase = async () => {
    // const canFinalize =
    //   isFormValid &&
    //   acceptedTerms &&
    //   confirmedData &&
    //   (
    //     paymentMethod === "pix" ||
    //     (paymentMethod !== "pix" && cardTokenData)
    //   );

    if (!canFinalize) return;
    if (!customerData) return;
    if (!canFinalize || !customerData) return;

    setIsLoading(true);

    // Simulate API call
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    /**
* handleFinalizePurchase
*
* Responsável por finalizar o checkout do evento.
* Ele valida se o usuário pode concluir a compra,
* envia os dados corretos para o backend,
* controla o estado de loading
* e exibe o sucesso ou erro da operação.
*
* Esse método é o ponto de integração entre
* frontend, backend e banco de dados.
*/
    try {
      const res = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          quantity,
          ticketType,
          paymentMethod,
          customer: customerData,
        })
      });

      if (!res.ok) {
        console.error(await res.json());
        return;
      }

      const data = await res.json();

      // Pedido gratuito
      // if (data.free) {
      //   setPaymentStatus('PAID');
      //   setTicketNumber(data.ticketNumber); // backend precisa devolver
      //   setShowSuccess(true);
      //   return;
      // }

      // // PIX
      // setOrderId(data.orderId);
      // setQrCode(data.qrCode);
      // setQrCodeBase64(data.qrCodeBase64);
      // setWaitingPayment(true);

      if (data.paymentStatus === 'PAID') {
        setPaymentStatus('PAID');
        setTicketNumber(data.ticketNumber);
        setOrderId(data.orderId);
        setShowSuccess(true);
        return;
      }

      if (data.paymentStatus === 'PENDING') {
        setOrderId(data.orderId);
        setQrCode(data.qrCode);
        setQrCodeBase64(data.qrCodeBase64);
        setWaitingPayment(true);
      }

    } catch (error) {
      console.error("Erro no checkout", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerForm onFormChange={handleFormChange} />

            <TicketTypeSelector
              ticketType={ticketType}
              onTicketTypeChange={setTicketType}
              basePrice={eventPrice}
            />

            <PaymentForm
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              amount={eventPrice * quantity}
              onSubmitCardPayment={handleSubmitCardPayment}
              mpReady={mpReady}
            />

            {/* Confirmations */}
            <div className="space-y-4 p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Confirmações
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirmData"
                    checked={confirmedData}
                    onCheckedChange={(checked) => setConfirmedData(checked as boolean)}
                  />
                  <Label htmlFor="confirmData" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    Confirmo que os dados informados estão corretos
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="acceptTerms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    Li e aceito os{" "}
                    <a href="/termos-de-uso" className="text-primary hover:underline">termos de uso</a>
                    {" "}e a{" "}
                    <a href="/politica-de-privacidade" className="text-primary hover:underline">política de privacidade</a>
                  </Label>
                </div>
              </div>
            </div>

            {waitingPayment && (
              <div className="p-6 bg-card rounded-xl border text-center space-y-4">
                <h2 className="text-xl font-bold">Pagamento via PIX</h2>

                {qrCodeBase64 && (
                  <img
                    src={`data:image/png;base64,${qrCodeBase64}`}
                    alt="QR Code PIX"
                    className="mx-auto w-64 h-64"
                  />
                )}

                <p className="text-sm text-muted-foreground">
                  Escaneie o QR Code no app do seu banco para concluir o pagamento.
                </p>

                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(qrCode || "")}
                >
                  Copiar código PIX
                </Button>

                <p className="text-sm text-muted-foreground">
                  Aguardando confirmação do pagamento...
                </p>
              </div>
            )}


            {/* Finalize Button - Mobile Fixed */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
              <Button
                className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                disabled={!canFinalize || isLoading || paymentMethod !== "pix"}
                onClick={handleFinalizePurchase}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Finalizar compra"
                )}
              </Button>
            </div>

            {/* Finalize Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                disabled={!canFinalize || isLoading}
                onClick={handleFinalizePurchase}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Finalizar compra"
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Event Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <EventSummary
                event={eventData}
                quantity={quantity}
                onQuantityChange={setQuantity}
                ticketType={ticketType}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Spacing */}
      <div className="lg:hidden h-24" />


      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        ticketNumber={ticketNumber}
        customerName={customerData?.fullName || ""}
        eventTitle={event.name}
        eventDate={`${eventData.date} às ${event.time}`}
        eventVenue={event.location}
        quantity={quantity}
        orderId={orderId}
        ticketPdfUrl={
          paymentStatus === 'PAID' && orderId
            ? `http://localhost:3000/api/orders/${orderId}/ticket`
            : null
        }
      />

    </div>
  );
};

export default Checkout;
