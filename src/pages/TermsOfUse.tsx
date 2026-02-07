import { Separator } from "@/components/ui/separator";

export default function TermsOfUse() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Termos de Uso — InGo</h1>
                <p className="text-sm text-muted-foreground mt-2">Última atualização: 20/01/2026</p>
            </header>

            <section className="space-y-4 text-muted-foreground">
                <p>
                    Ao acessar e utilizar o site <strong>InGo</strong>, você concorda com os termos e condições
                    descritos abaixo. Caso não concorde com algum dos termos, recomendamos que não utilize
                    a plataforma.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">1. Objeto</h2>
                <p className="text-muted-foreground">
                    O InGo é uma plataforma digital destinada à venda de ingressos para eventos públicos ou
                    privados, atuando exclusivamente como intermediadora de vendas.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">2. Cadastro e uso</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>A compra pode ser realizada sem necessidade de cadastro</li>
                    <li>O usuário é responsável por fornecer informações corretas e verdadeiras</li>
                    <li>
                        Não nos responsabilizamos por erros decorrentes de dados incorretos fornecidos pelo
                        usuário
                    </li>
                </ul>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">3. Pagamentos</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Os pagamentos são processados via Mercado Pago</li>
                    <li>
                        A confirmação da compra está sujeita à aprovação da operadora de pagamento
                    </li>
                </ul>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">4. Ingressos</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Os ingressos são digitais</li>
                    <li>O ingresso é de responsabilidade do comprador após o envio</li>
                    <li>
                        A InGo não se responsabiliza por perda, compartilhamento indevido ou uso incorreto do
                        ingresso
                    </li>
                </ul>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">5. Cancelamento e reembolso</h2>
                <p className="text-muted-foreground">
                    Solicitações de cancelamento ou reembolso devem ser feitas exclusivamente pelo contato:
                </p>
                <p className="text-muted-foreground font-medium">📞 WhatsApp: (31) 98406-6744</p>
                <p className="text-muted-foreground">
                    As condições de reembolso podem variar conforme o evento e a política do organizador.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">6. Responsabilidades</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>
                        A InGo não é responsável pela organização, execução ou cancelamento dos eventos
                    </li>
                    <li>
                        A responsabilidade pelo evento é integralmente do organizador
                    </li>
                </ul>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">7. Idade mínima</h2>
                <p className="text-muted-foreground">
                    A plataforma pode ser utilizada por pessoas de qualquer idade, sendo responsabilidade
                    do responsável legal em caso de menores de idade.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">8. Propriedade intelectual</h2>
                <p className="text-muted-foreground">
                    Todo o conteúdo do site (textos, marcas, layout e código) pertence à Zavlo Soft, sendo
                    proibida a reprodução total ou parcial sem autorização prévia.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">9. Alterações dos termos</h2>
                <p className="text-muted-foreground">
                    Os Termos de Uso podem ser modificados a qualquer momento, passando a valer a partir
                    de sua publicação no site.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">10. Foro</h2>
                <p className="text-muted-foreground">
                    Fica eleito o foro da comarca de <strong>Várzea da Palma – MG</strong>, para dirimir
                    quaisquer questões relativas a estes termos.
                </p>
            </section>
        </main>
    );
}
