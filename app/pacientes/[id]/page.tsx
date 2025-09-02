"use client"

import { useState } from "react"
import { ArrowLeft, Phone, Mail, MapPin, Calendar, FileText, Plus, Edit, AlertTriangle, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"

interface PatientDetail {
  id: number
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  cpf: string
  status: "active" | "inactive"
  condition: string
  allergies: string[]
  medications: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

interface MedicalRecord {
  id: number
  date: string
  type: string
  diagnosis: string
  treatment: string
  notes: string
  doctor: string
}

interface Appointment {
  id: number
  date: string
  time: string
  type: string
  status: string
  notes?: string
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app, fetch based on params.id
  const patient: PatientDetail = {
    id: 1,
    name: "Maria Silva",
    age: 45,
    gender: "Feminino",
    phone: "(11) 99999-9999",
    email: "maria.silva@email.com",
    address: "Rua das Flores, 123 - Jardim Paulista, São Paulo, SP - 01234-567",
    cpf: "123.456.789-00",
    status: "active",
    condition: "Hipertensão",
    allergies: ["Penicilina", "Dipirona"],
    medications: ["Losartana 50mg", "Hidroclorotiazida 25mg"],
    emergencyContact: {
      name: "João Silva",
      phone: "(11) 88888-8888",
      relationship: "Esposo",
    },
  }

  const medicalRecords: MedicalRecord[] = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Consulta",
      diagnosis: "Hipertensão controlada",
      treatment: "Manutenção da medicação atual",
      notes: "Paciente apresenta pressão arterial dentro dos parâmetros normais. Continuar com medicação atual.",
      doctor: "Dr. Carlos Medeiros",
    },
    {
      id: 2,
      date: "2023-12-10",
      type: "Exame",
      diagnosis: "Exames de rotina",
      treatment: "Acompanhamento",
      notes: "Hemograma completo e perfil lipídico dentro da normalidade.",
      doctor: "Dr. Carlos Medeiros",
    },
    {
      id: 3,
      date: "2023-11-05",
      type: "Consulta",
      diagnosis: "Ajuste medicamentoso",
      treatment: "Alteração da dosagem",
      notes: "Ajustada dosagem da Losartana devido a episódios de hipotensão.",
      doctor: "Dr. Carlos Medeiros",
    },
  ]

  const appointments: Appointment[] = [
    {
      id: 1,
      date: "2024-02-15",
      time: "14:00",
      type: "Consulta de retorno",
      status: "agendado",
      notes: "Avaliação da pressão arterial",
    },
    {
      id: 2,
      date: "2024-03-15",
      time: "09:00",
      type: "Exames de rotina",
      status: "agendado",
    },
  ]

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
        <div className="flex items-center gap-3 mb-3">
          <Link href="/pacientes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
              {getInitials(patient.name)}
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{patient.name}</h1>
              <p className="text-sm text-muted-foreground">
                {patient.age} anos • {patient.gender}
              </p>
            </div>
          </div>
          <Badge variant={patient.status === "active" ? "default" : "secondary"}>
            {patient.status === "active" ? "Ativo" : "Inativo"}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Calendar className="h-4 w-4 mr-1" />
            Agendar
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="appointments">Consultas</TabsTrigger>
            <TabsTrigger value="documents">Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Contact Info */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </CardContent>
            </Card>

            {/* Medical Info */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Informações Médicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Condição Principal</h4>
                  <Badge variant="secondary">{patient.condition}</Badge>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Alergias
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    Medicações Atuais
                  </h4>
                  <div className="space-y-2">
                    {patient.medications.map((medication, index) => (
                      <div key={index} className="text-sm bg-muted p-2 rounded">
                        {medication}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Contato de Emergência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-sm">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.emergencyContact.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Histórico Médico</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Novo Registro
              </Button>
            </div>

            <div className="space-y-3">
              {medicalRecords.map((record) => (
                <Card key={record.id} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-sm">{record.type}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(record.date)} • {record.doctor}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {record.type}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Diagnóstico</p>
                        <p className="text-sm">{record.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">Tratamento</p>
                        <p className="text-sm">{record.treatment}</p>
                      </div>
                      {record.notes && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Observações</p>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Consultas Agendadas</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Agendar
              </Button>
            </div>

            <div className="space-y-3">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{appointment.type}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(appointment.date)} às {appointment.time}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {appointment.status}
                      </Badge>
                    </div>

                    {appointment.notes && <p className="text-sm text-muted-foreground">{appointment.notes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Documentos</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>

            <Card className="bg-card">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Nenhum documento</h3>
                <p className="text-sm text-muted-foreground mb-4">Adicione exames, receitas e outros documentos</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Documento
                </Button>
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
