"use client"

import React, { useState } from "react"
import { 
  Info, 
  Download,
  ChevronUp,
  ChevronDown,
  Search,
  X
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"
import { formatPercentage } from "@/app/lib/utils"

type PerformanceData = {
  acv: string
  salesCycle: string
  awareness: number
  education: number
  prioritize: number
  selection: number
  onboarding: number
  retention: number
  expansion: number
}

const defaultData: PerformanceData[] = [
  { 
    acv: "<1k", 
    salesCycle: "0-10", 
    awareness: 5, 
    education: 15, 
    prioritize: 80, 
    selection: 15, 
    onboarding: 90, 
    retention: 90, 
    expansion: 105 
  },
  { 
    acv: "1k - 5k", 
    salesCycle: "10-20", 
    awareness: 10, 
    education: 20, 
    prioritize: 85, 
    selection: 17, 
    onboarding: 92, 
    retention: 92, 
    expansion: 110 
  },
  { 
    acv: "5k - 15k", 
    salesCycle: "30-60", 
    awareness: 15, 
    education: 20, 
    prioritize: 90, 
    selection: 20, 
    onboarding: 93, 
    retention: 95, 
    expansion: 115 
  },
  { 
    acv: "15k - 50k", 
    salesCycle: "60-90", 
    awareness: 20, 
    education: 25, 
    prioritize: 95, 
    selection: 30, 
    onboarding: 94, 
    retention: 96, 
    expansion: 120 
  },
  { 
    acv: "50k - 150k", 
    salesCycle: "90-180", 
    awareness: 30, 
    education: 25, 
    prioritize: 95, 
    selection: 35, 
    onboarding: 98, 
    retention: 97, 
    expansion: 125 
  },
  { 
    acv: "150k+", 
    salesCycle: "180+", 
    awareness: 30, 
    education: 25, 
    prioritize: 100, 
    selection: 30, 
    onboarding: 99, 
    retention: 98, 
    expansion: 130 
  }
]

export function PerformanceTable() {
  const [data, setData] = useState<PerformanceData[]>(defaultData)
  const [sortField, setSortField] = useState<keyof PerformanceData | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (field: keyof PerformanceData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getFieldColor = (value: number) => {
    if (value >= 90) return "text-emerald-500 font-medium"
    if (value >= 70) return "text-blue-500"
    if (value >= 50) return "text-amber-500"
    return "text-red-500"
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const filteredData = sortedData.filter(row => 
    row.acv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.salesCycle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full bg-black border border-gray-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-white drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]">Performance por Segmento</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
            <input
              type="text"
              placeholder="Buscar segmento..."
              className="h-9 rounded-md border border-gray-800 bg-gray-950 pl-9 pr-9 py-2 text-sm text-gray-300 placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-2.5 top-2.5 text-gray-500 hover:text-blue-500 transition-colors"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 bg-gray-950 border-gray-800 text-gray-400 hover:text-blue-400 hover:bg-gray-900 hover:border-blue-900/50 button-glow"
          >
            <Download className="mr-2 h-4 w-4 text-blue-500" />
            Exportar
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-white">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-950 border border-gray-800 text-gray-300">
                <p className="max-w-xs">
                  Tabela comparativa de performance por segmento de cliente (ACV) e duração de ciclo de vendas,
                  mostrando taxas de conversão em cada etapa da jornada.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto table-dark">
            <thead>
              <tr className="border-b border-gray-900">
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-blue-400 cursor-pointer"
                  onClick={() => handleSort('acv')}
                >
                  <div className="flex items-center">
                    ACV (R$)
                    {sortField === 'acv' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('salesCycle')}
                >
                  <div className="flex items-center">
                    Ciclo Vendas
                    {sortField === 'salesCycle' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('awareness')}
                >
                  <div className="flex items-center">
                    Awareness
                    {sortField === 'awareness' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('education')}
                >
                  <div className="flex items-center">
                    Education
                    {sortField === 'education' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('prioritize')}
                >
                  <div className="flex items-center">
                    Prioritize
                    {sortField === 'prioritize' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('selection')}
                >
                  <div className="flex items-center">
                    Selection
                    {sortField === 'selection' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('onboarding')}
                >
                  <div className="flex items-center">
                    Onboarding
                    {sortField === 'onboarding' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('retention')}
                >
                  <div className="flex items-center">
                    Retention
                    {sortField === 'retention' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleSort('expansion')}
                >
                  <div className="flex items-center">
                    Expansion
                    {sortField === 'expansion' && (
                      sortDirection === 'asc' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`border-b border-gray-900 hover:bg-blue-950/20 ${
                    rowIndex % 2 === 0 ? 'bg-gray-950/50' : ''
                  }`}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-300">{row.acv}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">{row.salesCycle}</td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.awareness)}`}>
                    {formatPercentage(row.awareness)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.education)}`}>
                    {formatPercentage(row.education)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.prioritize)}`}>
                    {formatPercentage(row.prioritize)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.selection)}`}>
                    {formatPercentage(row.selection)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.onboarding)}`}>
                    {formatPercentage(row.onboarding)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.retention)}`}>
                    {formatPercentage(row.retention)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-3 text-sm ${getFieldColor(row.expansion)}`}>
                    {formatPercentage(row.expansion)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}