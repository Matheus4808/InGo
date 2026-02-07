import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Scanner = () => {
    const { organizer } = useAuth();
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"SUCCESS" | "ERROR" | "">("");
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);


    useEffect(() => {
        if (!organizer?.organizerId) return;

         fetch(`http://localhost:3000/api/ticket/today?organizerId=${organizer.organizerId}`)
        // fetch(`http://localhost:3000/api/ticket/today?organizerId=${organizer.organizerId}`)
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar eventos');
                return res.json();
            })
            .then(data => setEvents(data.events))
            .catch(err => console.error(err));
    }, [organizer?.organizerId]);


    const eventId = selectedEvent; // depois vem do login ou URL

    useEffect(() => {
        if (!selectedEvent) return;

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 },
            false
        );

        scanner.render(
            async (decodedText) => {
                scanner.clear();

                try {
                    const res = await fetch("https://api-zavlosoft.shop/api/tickets/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ticketNumber: decodedText,
                            eventId: selectedEvent
                        })
                    });

                    const data = await res.json();

                    if (res.ok && data.success) {
                        setStatus("SUCCESS");
                        setMessage(`Entrada liberada: ${data.attendee}`);
                    } else {
                        setStatus("ERROR");
                        setMessage(data.message || data.error);
                    }
                } catch {
                    setStatus("ERROR");
                    setMessage("Erro ao validar ingresso");
                }

                setTimeout(() => {
                    setStatus("");
                    setMessage("");
                    scanner.render(() => { }, () => { });
                }, 2000);
            },
            () => { }
        );

        return () => {
            scanner.clear().catch(() => { });
        };
    }, [organizer, selectedEvent]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
            <h1 className="text-2xl font-bold">Scanner de Ingressos</h1>

            {selectedEvent && (
                <div id="reader" className="w-full max-w-md" />
            )}


            {!selectedEvent && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Eventos de Hoje</h2>

                    {events.map(event => (
                        <Button
                            key={event.id}
                            className="w-full"
                            onClick={() => setSelectedEvent(event.id)}
                        >
                            {event.name} — {event.time}
                        </Button>
                    ))}

                    {events.length === 0 && (
                        <p className="text-muted-foreground">
                            Nenhum evento hoje
                        </p>
                    )}
                </div>
            )}


            {message && (
                <div
                    className={`p-4 rounded-lg text-white text-lg font-bold ${status === "SUCCESS" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {message}
                </div>
            )}

            <Button variant="outline" onClick={() => window.location.reload()}>
                Reiniciar Scanner
            </Button>
        </div>
    );
};

export default Scanner;
