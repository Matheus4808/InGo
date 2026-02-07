import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Política de Privacidade — InGo</h1>
                <p className="text-sm text-muted-foreground mt-2">Última atualização: 20/01/2026</p>
            </header>

            <section className="space-y-4 text-muted-foreground">
                <p>
                    A <strong>InGo</strong>, operada pela <strong>Zavlo Soft</strong>, respeita a sua privacidade e está
                    comprometida com a proteção dos dados pessoais dos usuários, em conformidade com a
                    Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">1. Quem somos</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li><strong>Empresa:</strong> Zavlo Soft</li>
                    <li><strong>Plataforma:</strong> InGo</li>
                    <li><strong>Cidade:</strong> Várzea da Palma – MG – Brasil</li>
                    <li><strong>E-mail de contato:</strong> matheus.dev48@gmail.com</li>
                </ul>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">2. Dados coletados</h2>
                <p className="text-muted-foreground">Ao utilizar nosso site, podemos coletar os seguintes dados:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Nome completo</li>
                    <li>CPF</li>
                    <li>E-mail</li>
                    <li>Telefone</li>
                    <li>Dados necessários para pagamento</li>
                    <li>Dados técnicos de navegação (IP, tipo de navegador, data e hora de acesso)</li>
                </ul>
                <p className="text-muted-foreground">
                    Os dados de pagamento são processados de forma segura por meio da API do Mercado Pago,
                    não sendo armazenados diretamente por nós.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">3. Finalidade do uso dos dados</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Processar a compra de ingressos</li>
                    <li>Enviar ingressos digitais e comunicações relacionadas à compra</li>
                    <li>Cumprir obrigações legais</li>
                    <li>Prevenir fraudes</li>
                    <li>Melhorar a experiência do usuário</li>
                </ul>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">4. Compartilhamento de dados</h2>
                <p className="text-muted-foreground">Seus dados poderão ser compartilhados apenas quando necessário, com:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Mercado Pago, para processamento dos pagamentos</li>
                    <li>Autoridades legais, mediante obrigação judicial ou legal</li>
                </ul>
                <p className="text-muted-foreground">Não vendemos ou comercializamos dados pessoais.</p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">5. Cookies e tecnologias</h2>
                <p className="text-muted-foreground">Utilizamos cookies e tecnologias semelhantes para:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Garantir o funcionamento do site</li>
                    <li>Melhorar a experiência de navegação</li>
                    <li>Analisar acessos e desempenho da plataforma</li>
                </ul>
                <p className="text-muted-foreground">
                    O usuário pode gerenciar ou desativar cookies diretamente em seu navegador.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">6. Direitos do titular dos dados</h2>
                <p className="text-muted-foreground">Você tem direito de:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Acessar seus dados</li>
                    <li>Corrigir dados incorretos</li>
                    <li>Solicitar a exclusão dos dados</li>
                    <li>Revogar consentimentos</li>
                </ul>
                <p className="text-muted-foreground">
                    Para exercer seus direitos, entre em contato pelo e-mail: <strong>matheus.dev48@gmail.com</strong>
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">7. Segurança das informações</h2>
                <p className="text-muted-foreground">
                    Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acessos
                    não autorizados, vazamentos ou usos indevidos.
                </p>
            </section>

            <Separator className="my-8" />

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-foreground">8. Alterações nesta política</h2>
                <p className="text-muted-foreground">
                    Esta Política de Privacidade pode ser atualizada a qualquer momento. Recomendamos a revisão
                    periódica deste documento.
                </p>
            </section>
        </main>
    );
}
