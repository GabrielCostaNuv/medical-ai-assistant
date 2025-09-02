"use client"

import { useState, useRef, useEffect } from "react"
import {
  Brain,
  Send,
  Mic,
  Plus,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Clock,
  User,
  Bot,
  Stethoscope,
  Pill,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: string
  category?: "diagnosis" | "treatment" | "general" | "emergency"
}

interface Suggestion {
  id: number
  title: string
  description: string
  category: "diagnosis" | "treatment" | "medication" | "followup"
  priority: "high" | "medium" | "low"
  icon: any
}

interface QuickAction {
  id: number
  title: string
  description: string
  icon: any
  action: string
}

export default function AssistenteIAPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages: Message[] = [
    {
      id: 1,
      type: "ai",
      content:
        "Olá! Sou seu assistente médico inteligente. Como posso ajudá-lo hoje? Posso auxiliar com diagnósticos, sugestões de tratamento, análise de sintomas e muito mais.",
      timestamp: "09:00",
      category: "general",
    },
    {
      id: 2,
      type: "user",
      content: "Paciente de 45 anos com dor no peito e falta de ar. O que devo investigar?",
      timestamp: "09:02",
    },
    {
      id: 3,
      type: "ai",
      content:
        "Baseado nos sintomas relatados, recomendo investigação imediata para descartar síndrome coronariana aguda. Sugestões: ECG, troponinas, radiografia de tórax. Considere também embolia pulmonar se houver fatores de risco. Monitore sinais vitais continuamente.",
      timestamp: "09:02",
      category: "emergency",
    },
    {
      id: 4,
      type: "user",
      content: "ECG mostra alterações em V2-V4. Troponina elevada.",
      timestamp: "09:05",
    },
    {
      id: 5,
      type: "ai",
      content:
        "Achados sugestivos de infarto agudo do miocárdio anterior. Ações imediatas: AAS 300mg, clopidogrel, atorvastatina, metoprolol se PA estável. Considere terapia de reperfusão urgente. Contate cardiologia/hemodinâmica imediatamente.",
      timestamp: "09:05",
      category: "emergency",
    },
  ]

  const suggestions: Suggestion[] = [
    {
      id: 1,
      title: "Protocolo Hipertensão",
      description: "Diretrizes atualizadas para manejo da hipertensão arterial",
      category: "treatment",
      priority: "high",
      icon: Activity,
    },
    {
      id: 2,
      title: "Interações Medicamentosas",
      description: "Verificar interações entre Losartana e Sinvastatina",
      category: "medication",
      priority: "medium",
      icon: Pill,
    },
    {
      id: 3,
      title: "Exames de Rotina",
      description: "Pacientes diabéticos precisam de HbA1c trimestral",
      category: "followup",
      priority: "medium",
      icon: Stethoscope,
    },
    {
      id: 4,
      title: "Sintomas Cardíacos",
      description: "Algoritmo para avaliação de dor torácica aguda",
      category: "diagnosis",
      priority: "high",
      icon: AlertTriangle,
    },
  ]

  const quickActions: QuickAction[] = [
    {
      id: 1,
      title: "Analisar Sintomas",
      description: "Descreva os sintomas do paciente para análise",
      icon: Stethoscope,
      action: "symptoms",
    },
    {
      id: 2,
      title: "Verificar Medicação",
      description: "Consultar interações e dosagens",
      icon: Pill,
      action: "medication",
    },
    {
      id: 3,
      title: "Protocolo Emergência",
      description: "Acesso rápido a protocolos",
      icon: AlertTriangle,
      action: "emergency",
    },
    {
      id: 4,
      title: "Calcular Dosagem",
      description: "Calculadora de doses pediátricas",
      icon: Brain,
      action: "calculator",
    },
  ]

  const recentTopics = [
    "Manejo da diabetes tipo 2",
    "Protocolo de sepse",
    "Interações medicamentosas",
    "Exames cardiológicos",
    "Pediatria - febre",
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send to AI API
      setMessage("")
    }
  }

  const handleQuickAction = (action: string) => {
    const prompts = {
      symptoms: "Descreva os sintomas do paciente para análise:",
      medication: "Qual medicação você gostaria de verificar?",
      emergency: "Qual protocolo de emergência você precisa?",
      calculator: "Informe peso, idade e medicação para cálculo:",
    }
    setMessage(prompts[action as keyof typeof prompts] || "")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emergency":
        return "text-destructive"
      case "diagnosis":
        return "text-primary"
      case "treatment":
        return "text-secondary"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-accent text-accent-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Assistente IA</h1>
              <p className="text-sm text-muted-foreground">Seu copiloto médico inteligente</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            <div className="w-2 h-2 bg-secondary rounded-full mr-1" />
            Online
          </Badge>
        </div>
      </header>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
            <TabsTrigger value="tools">Ferramentas</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className="h-auto p-3 flex-col gap-1 bg-transparent"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{action.title}</span>
                </Button>
              ))}
            </div>

            {/* Chat Messages */}
            <Card className="bg-card">
              <CardContent className="p-0">
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {msg.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`max-w-[80%] ${
                          msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        } rounded-lg p-3`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                          {msg.category && (
                            <Badge variant="outline" className="text-xs">
                              {msg.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Digite sua pergunta médica..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[40px] max-h-24 resize-none pr-12"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-2"
                        onClick={() => setIsRecording(!isRecording)}
                      >
                        <Mic className={`h-4 w-4 ${isRecording ? "text-destructive" : ""}`} />
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Sugestões Inteligentes</h3>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Personalizar
              </Button>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <suggestion.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <Badge className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Ver Detalhes
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Lightbulb className="h-4 w-4 mr-1" />
                            Aplicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            {/* Medical Tools */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ferramentas Médicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                    <Stethoscope className="h-5 w-5" />
                    <span className="text-xs">Calculadora IMC</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                    <Pill className="h-5 w-5" />
                    <span className="text-xs">Doses Pediátricas</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                    <Activity className="h-5 w-5" />
                    <span className="text-xs">Score APACHE</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1 bg-transparent">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-xs">Escala Glasgow</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Topics */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tópicos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentTopics.map((topic, index) => (
                  <Button key={index} variant="ghost" size="sm" className="w-full justify-start">
                    <span className="text-sm">{topic}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Knowledge Base */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Base de Conhecimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    Acesse protocolos, diretrizes e literatura médica atualizada
                  </p>
                  <Button size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explorar Conhecimento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
