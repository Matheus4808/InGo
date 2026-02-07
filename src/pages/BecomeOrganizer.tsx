import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, MessageCircle } from "lucide-react";

export default function BecomeOrganizer() {
    const whatsappNumber = "5531984066744";

    const messageTemplate = encodeURIComponent(
        "Olá, gostaria de me tornar um organizador na plataforma InGo.%0A%0A" +
        "Nome do organizador:%0A" +
        "Nome da pessoa responsável:%0A" +
        "Possui conta no Mercado Pago? (S/N):%0A" +
        "E-mail de contato:"
    );

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${messageTemplate}`;

    return (
        <main className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Header */}
            <header className="text-center mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Seja um organizador no InGo
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Venda ingressos online de forma simples, rápida e segura.
                    Conecte seu evento ao público certo e gerencie tudo em um só lugar.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Coluna esquerda */}
                <div className="space-y-8">
                    {/* Como funciona */}
                    <Card className="border-border">
                        <CardContent className="p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-foreground">
                                Como funciona
                            </h2>

                            <ul className="space-y-4 text-muted-foreground">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>
                                        Você envia suas informações básicas pelo WhatsApp do suporte
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>
                                        Avaliamos os dados e realizamos a configuração do organizador
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>
                                        Após aprovação, você já pode cadastrar e vender ingressos
                                    </span>
                                </li>
                            </ul>

                            <Separator />

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>
                                    A aprovação pode levar até <strong>24 horas</strong>
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Planos e benefícios */}
                    <Card className="border-border">
                        <CardContent className="p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-foreground">
                                Planos e benefícios
                            </h2>

                            <p className="text-muted-foreground">
                                Para se tornar um organizador no <strong>InGo</strong>, o
                                investimento é de{" "}
                                <strong className="text-foreground">
                                    R$ 34,90 por mês
                                </strong>
                                .
                                <br />
                                <span className="text-primary font-medium">
                                    🎉 O primeiro mês é totalmente gratuito
                                </span>{" "}
                                para você testar a plataforma sem compromisso.
                            </p>

                            <Separator />

                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>Painel administrativo completo</span>
                                </li>

                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>Criação e gerenciamento de eventos</span>
                                </li>

                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>Controle de vendas em tempo real</span>
                                </li>

                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>Scanner de QR Code para validação de ingressos</span>
                                </li>

                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>Controle de entrada no evento</span>
                                </li>

                                <li className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                    <span>
                                        Pagamentos dos ingressos direto na{" "}
                                        <strong>sua conta do Mercado Pago</strong>
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Coluna direita - Form preview */}
                <Card className="border-border">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-foreground">
                            Informações necessárias
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Nome do organizador</Label>
                                <Input placeholder="Ex: Eventos XPTO" disabled />
                            </div>

                            <div className="space-y-2">
                                <Label>Nome da pessoa responsável</Label>
                                <Input placeholder="Ex: João da Silva" disabled />
                            </div>

                            <div className="space-y-2">
                                <Label>Possui conta no Mercado Pago?</Label>
                                <Input placeholder="S ou N" disabled />
                            </div>

                            <div className="space-y-2">
                                <Label>E-mail de contato</Label>
                                <Input placeholder="seuemail@email.com" disabled />
                            </div>
                        </div>

                        <Button asChild size="lg" className="w-full gap-2">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Enviar dados pelo WhatsApp
                            </a>
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                            Ao clicar no botão, você será redirecionado para o WhatsApp
                            com uma mensagem pré-preenchida.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
