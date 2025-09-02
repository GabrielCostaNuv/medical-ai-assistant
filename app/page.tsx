"use client"

import { ArrowRight, Calendar, Users, Brain, Star, Plus, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <span className="font-medium text-foreground text-lg">{question}</span>
        {isOpen ? (
          <X className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 bg-blue-50/50 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1) // Controla qual FAQ está aberto, começando com o segundo item aberto

  const features = [
    {
      icon: Brain,
      title: "Assistente IA Inteligente",
      description:
        "Receba insights médicos em tempo real, sugestões de diagnóstico e análise de sintomas com tecnologia de ponta.",
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: Calendar,
      title: "Gestão Completa de Agenda",
      description: "Organize consultas, gerencie horários e otimize seu tempo com um sistema intuitivo e eficiente.",
      gradient: "from-green-500/20 to-teal-500/20",
    },
    {
      icon: Users,
      title: "Prontuário Digital Avançado",
      description:
        "Mantenha histórico completo dos pacientes, relatórios automáticos e acesso rápido a informações críticas.",
      gradient: "from-orange-500/20 to-red-500/20",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Carlos Mendes",
      specialty: "Cardiologista",
      content: "O MediCare Pro revolucionou minha prática. A IA me ajuda a identificar padrões que eu não via antes.",
      rating: 5,
      avatar: "/placeholder-ikmmd.png",
    },
    {
      name: "Dra. Ana Silva",
      specialty: "Pediatra",
      content: "Economizo 2 horas por dia com a gestão automatizada. Posso focar mais nos meus pacientes.",
      rating: 5,
      avatar: "/placeholder-vbbmf.png",
    },
    {
      name: "Dr. Roberto Lima",
      specialty: "Clínico Geral",
      content: "Interface intuitiva e recursos poderosos. Indispensável para qualquer consultório moderno.",
      rating: 5,
      avatar: "/placeholder-xb4cl.png",
    },
  ]

  const faqs = [
    {
      question: "O que a IA neste aplicativo faz?",
      answer:
        "Nossa IA médica analisa dados de pacientes, sugere diagnósticos, identifica padrões em exames e oferece insights em tempo real para auxiliar na tomada de decisões clínicas.",
    },
    {
      question: "Meus dados ficam seguros com este aplicativo de IA?",
      answer:
        "Sim, seus dados ficam seguros com este aplicativo de IA. Priorizamos sua privacidade e implementamos medidas de segurança robustas, incluindo criptografia e controles de acesso rigorosos, para proteger suas informações.",
    },
    {
      question: "Como funciona o feedback médico em tempo real?",
      answer:
        "O sistema monitora continuamente os dados inseridos e fornece alertas instantâneos sobre interações medicamentosas, valores críticos de exames e sugestões baseadas em protocolos médicos atualizados.",
    },
    {
      question: "Posso personalizar meus protocolos médicos?",
      answer:
        "Sim, você pode personalizar completamente seus protocolos médicos de acordo com sua especialidade e preferências, criando templates personalizados para diferentes tipos de consulta.",
    },
  ]

  const pricingPlans = [
    {
      name: "Básico",
      price: "Gratuito",
      period: "",
      description: "Para médicos que estão começando a digitalizar sua prática",
      features: ["Até 50 pacientes", "Agenda básica", "Relatórios simples", "Suporte por email"],
      limitations: ["IA limitada", "Sem integração", "Sem backup automático"],
      buttonText: "Começar Grátis",
      popular: false,
    },
    {
      name: "Profissional",
      price: "R$ 97",
      period: "/mês",
      description: "Para médicos que querem otimizar completamente sua prática",
      features: [
        "Pacientes ilimitados",
        "IA médica completa",
        "Relatórios inteligentes",
        "Integrações avançadas",
        "Backup automático",
        "Suporte prioritário",
      ],
      limitations: [],
      buttonText: "Escolher Profissional",
      popular: true,
    },
    {
      name: "Clínica",
      price: "R$ 197",
      period: "/mês",
      description: "Para clínicas e consultórios com múltiplos médicos",
      features: [
        "Todos os recursos Pro",
        "Múltiplos usuários",
        "Dashboard administrativo",
        "Relatórios gerenciais",
        "API personalizada",
        "Suporte 24/7",
      ],
      limitations: [],
      buttonText: "Escolher Clínica",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MediCare Pro</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Depoimentos
              </Link>
              <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Preços
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="hidden md:inline-flex">
                  Entrar
                </Button>
              </Link>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Teste Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <Badge className="bg-accent/10 text-accent border-accent/20">🚀 Novo: IA Médica Avançada</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
                  Revolucione Sua Prática Médica com <span className="text-primary">Inteligência Artificial</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto lg:mx-0">
                  O copiloto médico que transforma sua rotina. Gestão inteligente, diagnósticos precisos e mais tempo
                  para seus pacientes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 mx-auto lg:mx-0">
                  Começar Teste Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="mx-auto lg:mx-0 bg-transparent">
                  Ver Demonstração
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">Médicos Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Suporte</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative flex items-center justify-center">
                {/* Main phone */}
                <div className="relative z-10">
                  <div className="w-64 h-[520px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <Image
                        src="/placeholder-v11ad.png"
                        alt="MediCare Pro Dashboard"
                        width={240}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary phone - left */}
                <div className="absolute -left-8 top-12 z-0 transform rotate-12">
                  <div className="w-48 h-96 bg-gradient-to-br from-gray-800 to-gray-700 rounded-[2.5rem] p-2 shadow-xl opacity-80">
                    <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                      <Image
                        src="/placeholder-6xw5r.png"
                        alt="Agenda"
                        width={180}
                        height={380}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary phone - right */}
                <div className="absolute -right-8 top-20 z-0 transform -rotate-12">
                  <div className="w-48 h-96 bg-gradient-to-br from-gray-800 to-gray-700 rounded-[2.5rem] p-2 shadow-xl opacity-80">
                    <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                      <Image
                        src="/placeholder-6zkgb.png"
                        alt="Pacientes"
                        width={180}
                        height={380}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">Recursos Avançados</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Tudo que você precisa para uma prática médica moderna
            </h2>
          </div>

          <div className="space-y-32">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""} text-center lg:text-left`}>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto lg:mx-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto lg:mx-0">
                      {feature.description}
                    </p>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mx-auto lg:mx-0">
                    Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl scale-150`}
                  />
                  <div className="relative flex justify-center">
                    <div className="w-64 h-[520px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                        <Image
                          src={`/placeholder-zf8az.png?key=70zmh&height=500&width=240&query=medical+app+${feature.title.toLowerCase().replace(/\s+/g, "+")}`}
                          alt={feature.title}
                          width={240}
                          height={500}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20  relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Planos Flexíveis de Preços</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Nossas opções flexíveis de preços garantem que você obtenha o melhor valor para sua experiência médica
              personalizada com IA.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border"} bg-card`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Popular ⚡</Badge>
                  </div>
                )}

                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                      {index === 0 && <Users className="h-6 w-6 text-primary" />}
                      {index === 1 && <Brain className="h-6 w-6 text-primary" />}
                      {index === 2 && <Star className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">
                      {plan.price}
                      <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-foreground hover:bg-muted/80"}`}
                  >
                    {plan.buttonText}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center gap-3">
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative ">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              O que nossos usuários dizem sobre nós?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Confiado por médicos em todo o Brasil
            </p>
          </div>

          <div className="relative">
            <div className="flex justify-center mb-12">
              <div className="relative w-80 h-80">
                {testimonials.map((testimonial, index) => {
                  const angle = index * 120 - 90 // Distribute in circle
                  const x = Math.cos((angle * Math.PI) / 180) * 120
                  const y = Math.sin((angle * Math.PI) / 180) * 120

                  return (
                    <div
                      key={index}
                      className="absolute w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-lg"
                      style={{
                        left: `calc(50% + ${x}px - 2.5rem)`,
                        top: `calc(50% + ${y}px - 2.5rem)`,
                      }}
                    >
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                })}

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
                    <div className="text-2xl font-bold text-foreground">10k+</div>
                    <div className="text-sm text-muted-foreground">Médicos Satisfeitos</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground text-pretty">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3 border-t border-border pt-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.specialty}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Frequently Asked Questions</h2>
          </div>

          {/* Added 20px spacing between FAQ items */}
          <div className="rounded-lg overflow-hidden space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border border-b rounded-lg bg-card border-border last:border-b-0"
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder-oxbug.png')] opacity-5" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Experimente a Medicina como Nunca Antes com IA.
            </h2>
            <p className="text-xl text-white/90 text-pretty max-w-3xl mx-auto">
              Com feedback em tempo real e acompanhamento de progresso, você ficará motivado e alcançará seus melhores
              resultados ainda.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 lg:gap-16">
            {/* App Store Badge - Esquerda */}
            <div className="hidden lg:flex items-center gap-2 bg-black rounded-lg px-6 py-4 cursor-pointer hover:bg-black/80 transition-colors">
              <Image src="/apple-logo-minimalist.png" alt="Apple Store" width={32} height={32} className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs text-white/70">Disponível na</div>
                <div className="text-lg font-semibold text-white">App Store</div>
              </div>
            </div>

            {/* Celular Centralizado */}
            <div className="flex items-center justify-center">
              <div className="w-64 h-[520px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/medical-app-main-dashboard.png"
                    alt="MediCare Pro App"
                    width={240}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Google Play Badge - Direita */}
            <div className="hidden lg:flex items-center gap-2 bg-black rounded-lg px-6 py-4 cursor-pointer hover:bg-black/80 transition-colors">
              <Image src="/google-play-logo.png" alt="Google Play" width={32} height={32} className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs text-white/70">Disponível no</div>
                <div className="text-lg font-semibold text-white">Google Play</div>
              </div>
            </div>
          </div>

          {/* Badges das lojas para mobile - abaixo do celular */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 lg:hidden">
            <div className="flex items-center gap-2 bg-black rounded-lg px-4 py-3 cursor-pointer hover:bg-black/80 transition-colors">
              <Image src="/apple-logo-minimalist.png" alt="Apple Store" width={24} height={24} className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-white/70">Disponível na</div>
                <div className="text-sm font-semibold text-white">App Store</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-black rounded-lg px-4 py-3 cursor-pointer hover:bg-black/80 transition-colors">
              <Image src="/google-play-logo.png" alt="Google Play" width={24} height={24} className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-white/70">Disponível no</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">MediCare Pro</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                O futuro da medicina está aqui. Transforme sua prática com inteligência artificial.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Produto</h3>
              <div className="space-y-2">
                <Link href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Recursos
                </Link>
                <Link href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Preços
                </Link>
                <Link href="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Demo
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Suporte</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Central de Ajuda
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Treinamento
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Legal</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Termos
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  LGPD
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 MediCare Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
