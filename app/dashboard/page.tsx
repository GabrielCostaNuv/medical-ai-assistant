import { Calendar, Users, FileText, Brain, Bell, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MedicalDashboard() {
  const todayAppointments = [
    { id: 1, patient: "Maria Silva", time: "09:00", type: "Consulta", status: "confirmed" },
    { id: 2, patient: "João Santos", time: "10:30", type: "Retorno", status: "confirmed" },
    { id: 3, patient: "Ana Costa", time: "14:00", type: "Consulta", status: "pending" },
    { id: 4, patient: "Carlos Lima", time: "15:30", type: "Exame", status: "confirmed" },
  ]

  const aiInsights = [
    { id: 1, message: "Paciente João Santos tem histórico de hipertensão - verificar pressão", priority: "high" },
    { id: 2, message: "3 pacientes agendados precisam de exames de rotina", priority: "medium" },
    { id: 3, message: "Relatório mensal disponível para download", priority: "low" },
  ]

  const stats = [
    { label: "Consultas Hoje", value: "8", icon: Calendar, color: "text-primary" },
    { label: "Pacientes Ativos", value: "156", icon: Users, color: "text-secondary" },
    { label: "Relatórios Pendentes", value: "3", icon: FileText, color: "text-accent" },
    { label: "Insights IA", value: "5", icon: Brain, color: "text-primary" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">MediCare Pro</h1>
            <p className="text-sm text-muted-foreground">Seu copiloto médico</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs">3</Badge>
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nova Consulta
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 pb-20 md:pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              Insights da IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    insight.priority === "high"
                      ? "bg-destructive"
                      : insight.priority === "medium"
                        ? "bg-accent"
                        : "bg-muted-foreground"
                  }`}
                />
                <p className="text-sm text-foreground flex-1">{insight.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Consultas de Hoje
              </span>
              <Badge variant="secondary" className="text-xs">
                {todayAppointments.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {appointment.time}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{appointment.patient}</p>
                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                  {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/agenda">
            <Button className="h-12 bg-primary text-primary-foreground w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Agenda
            </Button>
          </Link>
          <Link href="/pacientes">
            <Button variant="outline" className="h-12 w-full bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Pacientes
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
