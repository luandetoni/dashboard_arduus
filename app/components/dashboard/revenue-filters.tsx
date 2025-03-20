"use client"

import React, { useState } from "react"
import { 
  Calendar, 
  ChevronDown, 
  Users, 
  Database, 
  Tag,
  Check,
  RefreshCcw,
  Filter
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"

export function RevenueFilters() {
  const [dateRange, setDateRange] = useState('Últimos 30 dias')
  const [segment, setSegment] = useState('Todos segmentos')
  const [team, setTeam] = useState('Todos times')
  const [source, setSource] = useState('Todos canais')
  
  const dateRanges = [
    'Hoje',
    'Últimos 7 dias',
    'Últimos 30 dias',
    'Este mês',
    'Este trimestre',
    'Este ano',
    'Ano anterior'
  ]
  
  const segments = [
    'Todos segmentos',
    'Enterprise',
    'Mid-market',
    'SMB',
    'Startup'
  ]
  
  const teams = [
    'Todos times',
    'Vendas Diretas',
    'Inside Sales',
    'Channel',
    'Customer Success'
  ]
  
  const sources = [
    'Todos canais',
    'Website',
    'Referência',
    'Eventos',
    'Parceiros',
    'Mídia paga'
  ]

  return (
    <div className="w-full bg-black/80 backdrop-blur-md rounded-lg border border-gray-900 blue-glow-sm">
      <div className="p-3">
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-300 button-glow"
              >
                <Calendar className="h-4 w-4 text-blue-400" />
                <span>{dateRange}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-52 bg-slate-900 border border-slate-800 blue-glow-sm"
            >
              <DropdownMenuLabel className="text-slate-300">Período</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              {dateRanges.map(range => (
                <DropdownMenuCheckboxItem
                  key={range}
                  checked={dateRange === range}
                  onCheckedChange={() => setDateRange(range)}
                  className="text-slate-300 focus:bg-blue-900/30 focus:text-blue-300"
                >
                  {range}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-300 button-glow"
              >
                <Database className="h-4 w-4 text-blue-400" />
                <span>{segment}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-48 bg-slate-900 border border-slate-800 blue-glow-sm"
            >
              <DropdownMenuLabel className="text-slate-300">Segmento</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              {segments.map(seg => (
                <DropdownMenuCheckboxItem
                  key={seg}
                  checked={segment === seg}
                  onCheckedChange={() => setSegment(seg)}
                  className="text-slate-300 focus:bg-blue-900/30 focus:text-blue-300"
                >
                  {seg}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-300 button-glow"
              >
                <Users className="h-4 w-4 text-blue-400" />
                <span>{team}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-44 bg-slate-900 border border-slate-800 blue-glow-sm"
            >
              <DropdownMenuLabel className="text-slate-300">Time</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              {teams.map(t => (
                <DropdownMenuCheckboxItem
                  key={t}
                  checked={team === t}
                  onCheckedChange={() => setTeam(t)}
                  className="text-slate-300 focus:bg-blue-900/30 focus:text-blue-300"
                >
                  {t}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-300 button-glow"
              >
                <Tag className="h-4 w-4 text-blue-400" />
                <span>{source}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-40 bg-slate-900 border border-slate-800 blue-glow-sm"
            >
              <DropdownMenuLabel className="text-slate-300">Canal</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              {sources.map(src => (
                <DropdownMenuCheckboxItem
                  key={src}
                  checked={source === src}
                  onCheckedChange={() => setSource(src)}
                  className="text-slate-300 focus:bg-blue-900/30 focus:text-blue-300"
                >
                  {src}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="ml-auto flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-300 button-glow"
            >
              <RefreshCcw className="mr-1 h-3.5 w-3.5 text-blue-400" />
              Limpar
            </Button>
            <Button 
              size="sm" 
              className="h-8 bg-blue-600 hover:bg-blue-700 text-white border-blue-500 blue-glow"
            >
              <Filter className="mr-1 h-3.5 w-3.5" />
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}