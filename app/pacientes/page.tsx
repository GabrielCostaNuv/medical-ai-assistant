"use client"

import { useState } from "react"
import { Search, Plus, User, Phone, Calendar, Edit, Eye, MoreVertical } from "lucide-react"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Patient {
  id: number
  name: string
  age: number
  phone: string
  email?: string
  address?: string
  lastVisit: string
  nextAppointment?: string
  condition?: string
  status: "active" | "inactive"
  avatar?: string
}

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false)

  const patients: Patient[] = [
    {
      id: 1,
      name: "Maria Silva",
      age: 45,
      phone: "(11) 99999-9999",
      email: "maria.silva@email.com",
      address: "Rua das Flores, 123 - São Paulo, SP",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-15",
      condition: "Hipertensão",
      status: "active",
    },
    {
      id: 2,
      name: "João Santos",
      age: 38,
      phone: "(11) 88888-8888",
      email: "joao.santos@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-10",
      condition: "Diabetes Tipo 2",
      status: "active",
    },
    {
      id: 3,
      name: "Ana Costa",
      age: 29,
      phone: "(11) 77777-7777",
      email: "ana.costa@email.com",
      lastVisit: "2023-12-20",
      condition: "Acompanhamento",
      status: "active",
    },
    {
      id: 4,
      name: "Carlos Lima",
      age: 52,
      phone: "(11) 66666-6666",
      lastVisit: "2023-11-15",
      condition: "Cardiologia",
      status: "inactive",
    },
    {
      id: 5,
      name: "Fernanda Oliveira",
      age: 34,
      phone: "(11) 55555-5555",
      email: "fernanda.oliveira@email.com",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-02-20",
      condition: "Dermatologia",
      status: "active",
    },
  ]

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      (patient.condition && patient.condition.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = filterStatus === "all" || patient.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const activePatients = patients.filter((p) => p.status === "active").length
  const totalPatients = patients.length

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Pacientes</h1>
            <p className="text-sm text-muted-foreground">
              {activePatients} ativos de {totalPatients} total
            </p>
          </div>
          <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Novo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Novo Paciente</DialogTitle>
                <DialogDescription>Cadastre um novo paciente no sistema</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do paciente" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input id="age" type="number" placeholder="35" />
                  </div>
                  <div>
                    <Label htmlFor="gender">Sexo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="paciente@email.com" />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Textarea id="address" placeholder="Rua, número, bairro, cidade, estado" rows={2} />
                </div>
                <div>
                  <Label htmlFor="condition">Condição/Especialidade</Label>
                  <Input id="condition" placeholder="Ex: Hipertensão, Diabetes, Cardiologia" />
                </div>
                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea id="notes" placeholder="Histórico médico, alergias, medicamentos..." rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setIsNewPatientOpen(false)}>
                    Cadastrar Paciente
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewPatientOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, telefone ou condição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              Todos
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("active")}
            >
              Ativos
            </Button>
            <Button
              variant={filterStatus === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("inactive")}
            >
              Inativos
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">{totalPatients}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-secondary">{activePatients}</p>
              <p className="text-xs text-muted-foreground">Ativos</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-accent">{patients.filter((p) => p.nextAppointment).length}</p>
              <p className="text-xs text-muted-foreground">Agendados</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="bg-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {getInitials(patient.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.age} anos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={patient.status === "active" ? "default" : "secondary"} className="text-xs">
                      {patient.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/pacientes/${patient.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar Consulta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {patient.phone}
                  </div>

                  {patient.condition && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-foreground">{patient.condition}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Última consulta: {formatDate(patient.lastVisit)}</span>
                    {patient.nextAppointment && <span>Próxima: {formatDate(patient.nextAppointment)}</span>}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/pacientes/${patient.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Histórico
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="bg-card">
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Nenhum paciente encontrado</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm ? "Tente buscar por outro termo" : "Não há pacientes cadastrados"}
              </p>
              <Button onClick={() => setIsNewPatientOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Paciente
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
