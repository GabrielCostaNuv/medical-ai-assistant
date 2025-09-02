"use client"

import { useState } from "react"
import { Download, Calendar, TrendingUp, Users, Clock, Brain, Plus, Eye, Share, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Report {
  id: number
  title: string
  type: "consulta" | "mensal" | "anual" | "estatisticas"
  patient?: string
  date: string
  generatedBy: "ai" | "manual"
  status: "completed" | "processing" | "pending"
  summary: string
  insights?: string[]
}

interface Statistic {
  label: string
  value: string
  change: number
  icon: any
  color: string
}

export default function RelatoriosPage() {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPeriod, setFilterPeriod] = useState<string>("month")
  const [activeTab, setActiveTab] = useState("reports")
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)

  const reports: Report[] = [
    {
      id: 1,
      title: "Consulta - Maria Silva",
      type: "consulta",
      patient: "Maria Silva",
      date: "2024-01-15",
      generatedBy: "ai",
      status: "completed",
      summary: "Paciente apresentou melhora significativa na pressão arterial. Medicação atual mantida.",
      insights: [
        "Pressão arterial dentro dos parâmetros normais",
        "Aderência ao tratamento excelente",
        "Recomendado manter medicação atual",
      ],
    },
    {
      id: 2,
      title: "Relatório Mensal - Janeiro 2024",
      type: "mensal",
      date: "2024-01-31",
      generatedBy: "ai",
      status: "completed",
      summary:
        "Mês com 89 consultas realizadas, 94% de taxa de comparecimento. Principais diagnósticos: hipertensão e diabetes.",
      insights: [
        "Taxa de comparecimento acima da média",
        "Aumento de 15% em consultas de retorno",
        "Redução de 8% em faltas não justificadas",
      ],
    },
    {
      id: 3,
      title: "Consulta - João Santos",
      type: "consulta",
      patient: "João Santos",
      date: "2024-01-10",
      generatedBy: "ai",
      status: "completed",
      summary: "Ajuste medicamentoso realizado. Paciente orientado sobre dieta e exercícios.",
      insights: ["Glicemia controlada", "IMC dentro do ideal", "Aderência medicamentosa boa"],
    },
    {
      id: 4,
      title: "Estatísticas do Consultório",
      type: "estatisticas",
      date: "2024-01-20",
      generatedBy: "ai",
      status: "processing",
      summary: "Análise detalhada do desempenho do consultório nos últimos 6 meses.",
    },
  ]

  const statistics: Statistic[] = [
    {
      label: "Consultas este mês",
      value: "89",
      change: 12,
      icon: Calendar,
      color: "text-primary",
    },
    {
      label: "Taxa de comparecimento",
      value: "94%",
      change: 3,
      icon: TrendingUp,
      color: "text-secondary",
    },
    {
      label: "Pacientes ativos",
      value: "156",
      change: 8,
      icon: Users,
      color: "text-accent",
    },
    {
      label: "Tempo médio consulta",
      value: "32min",
      change: -5,
      icon: Clock,
      color: "text-primary",
    },
  ]

  const monthlyData = [
    { month: "Set", consultas: 78, receita: 15600 },
    { month: "Out", consultas: 82, receita: 16400 },
    { month: "Nov", consultas: 85, receita: 17000 },
    { month: "Dez", consultas: 91, receita: 18200 },
    { month: "Jan", consultas: 89, receita: 17800 },
  ]

  const filteredReports = reports.filter((report) => {
    if (filterType === "all") return true
    return report.type === filterType
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground"
      case "processing":
        return "bg-accent text-accent-foreground"
      case "pending":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "processing":
        return "Processando"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "consulta":
        return "Consulta"
      case "mensal":
        return "Mensal"
      case "anual":
        return "Anual"
      case "estatisticas":
        return "Estatísticas"
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Relatórios</h1>
            <p className="text-sm text-muted-foreground">Insights gerados por IA</p>
          </div>
          <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Gerar Relatório
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Gerar Novo Relatório</DialogTitle>
                <DialogDescription>Selecione o tipo de relatório que deseja gerar</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tipo de Relatório</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensal">Relatório Mensal</SelectItem>
                      <SelectItem value="anual">Relatório Anual</SelectItem>
                      <SelectItem value="estatisticas">Estatísticas do Consultório</SelectItem>
                      <SelectItem value="paciente">Relatório por Paciente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Período</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Mês Atual</SelectItem>
                      <SelectItem value="last-month">Mês Anterior</SelectItem>
                      <SelectItem value="quarter">Último Trimestre</SelectItem>
                      <SelectItem value="year">Ano Atual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setIsGenerateOpen(false)}>
                    <Brain className="h-4 w-4 mr-2" />
                    Gerar com IA
                  </Button>
                  <Button variant="outline" onClick={() => setIsGenerateOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="consulta">Consultas</SelectItem>
              <SelectItem value="mensal">Mensais</SelectItem>
              <SelectItem value="estatisticas">Estatísticas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-card">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{reports.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-secondary">
                    {reports.filter((r) => r.generatedBy === "ai").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Gerados por IA</p>
                </CardContent>
              </Card>
            </div>

            {/* Reports List */}
            <div className="space-y-3">
              {filteredReports.map((report) => (
                <Card key={report.id} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-foreground">{report.title}</h3>
                          {report.generatedBy === "ai" && (
                            <Badge variant="secondary" className="text-xs">
                              <Brain className="h-3 w-3 mr-1" />
                              IA
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {getTypeText(report.type)} • {formatDate(report.date)}
                        </p>
                        <p className="text-sm text-foreground">{report.summary}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </Badge>
                    </div>

                    {report.insights && (
                      <div className="mb-3">
                        <h4 className="text-xs font-medium text-muted-foreground mb-2">Insights da IA:</h4>
                        <div className="space-y-1">
                          {report.insights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-accent rounded-full mt-2" />
                              <p className="text-xs text-foreground">{insight}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" disabled={report.status !== "completed"}>
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {statistics.map((stat, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <Badge variant={stat.change > 0 ? "default" : "secondary"} className="text-xs">
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Overview */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Desempenho Mensal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-muted-foreground">{data.consultas} consultas</span>
                    </div>
                    <Progress value={(data.consultas / 100) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Diagnósticos */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Principais Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hipertensão</span>
                  <Badge variant="secondary">32%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Diabetes</span>
                  <Badge variant="secondary">24%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consulta de rotina</span>
                  <Badge variant="secondary">18%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cardiologia</span>
                  <Badge variant="secondary">15%</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Analytics Avançado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Analytics em Desenvolvimento</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Gráficos interativos e análises avançadas estarão disponíveis em breve
                  </p>
                  <Button>
                    <Brain className="h-4 w-4 mr-2" />
                    Solicitar Análise IA
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
