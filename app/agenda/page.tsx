"use client"

import { useState } from "react"
import { Calendar, Clock, Plus, Search, ChevronLeft, ChevronRight, Edit, Trash2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Appointment {
  id: number
  patient: string
  time: string
  duration: number
  type: string
  status: "confirmed" | "pending" | "cancelled"
  phone?: string
  notes?: string
}

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week">("day")
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)

  const appointments: Appointment[] = [
    {
      id: 1,
      patient: "Maria Silva",
      time: "09:00",
      duration: 30,
      type: "Consulta",
      status: "confirmed",
      phone: "(11) 99999-9999",
      notes: "Paciente com histórico de hipertensão",
    },
    {
      id: 2,
      patient: "João Santos",
      time: "10:30",
      duration: 45,
      type: "Retorno",
      status: "confirmed",
      phone: "(11) 88888-8888",
    },
    {
      id: 3,
      patient: "Ana Costa",
      time: "14:00",
      duration: 30,
      type: "Consulta",
      status: "pending",
      phone: "(11) 77777-7777",
    },
    {
      id: 4,
      patient: "Carlos Lima",
      time: "15:30",
      duration: 60,
      type: "Exame",
      status: "confirmed",
      phone: "(11) 66666-6666",
    },
  ]

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-secondary text-secondary-foreground"
      case "pending":
        return "bg-accent text-accent-foreground"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Agenda</h1>
            <p className="text-sm text-muted-foreground capitalize">{formatDate(selectedDate)}</p>
          </div>
          <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Nova Consulta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Consulta</DialogTitle>
                <DialogDescription>Agende uma nova consulta para o paciente</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patient">Paciente</Label>
                  <Input id="patient" placeholder="Nome do paciente" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="retorno">Retorno</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="procedimento">Procedimento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duração (min)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="30" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 min</SelectItem>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                        <SelectItem value="60">60 min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea id="notes" placeholder="Observações sobre a consulta" rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setIsNewAppointmentOpen(false)}>
                    Agendar Consulta
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              Hoje
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-1">
            <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>
              Dia
            </Button>
            <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>
              Semana
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">{appointments.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-secondary">
                {appointments.filter((a) => a.status === "confirmed").length}
              </p>
              <p className="text-xs text-muted-foreground">Confirmadas</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-accent">
                {appointments.filter((a) => a.status === "pending").length}
              </p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{appointment.patient}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.type} • {appointment.duration} min
                    </p>
                  </div>

                  {appointment.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {appointment.phone}
                    </div>
                  )}

                  {appointment.notes && (
                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{appointment.notes}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Iniciar Consulta
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card className="bg-card">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Nenhuma consulta encontrada</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm ? "Tente buscar por outro nome" : "Não há consultas agendadas para hoje"}
              </p>
              <Button onClick={() => setIsNewAppointmentOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agendar Consulta
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
