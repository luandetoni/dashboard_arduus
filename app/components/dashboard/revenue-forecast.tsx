"use client"

import React, { useState } from "react"
import { Calendar, Download, ExternalLink, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"
import { formatCurrency } from "@/app/lib/utils"

// Este componente simularia um gráfico de linha real com uma biblioteca de gráficos
// como Recharts, mas para simplicidade, estamos fazendo um mockup visual.
function LineChart({ data, isComparison = false }: { data: number[], isComparison?: boolean }) {
  // Determinando o valor máximo para escala
  const maxValue = Math.max(...data) * 1.1
  
  // Altura relativa de cada ponto baseada no valor máximo
  const heights = data.map(val => (val / maxValue) * 100)
  
  return (
    <div className="h-[200px] w-full relative mt-6">
      {/* Linhas horizontais de grid */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-full border-t border-gray-100 flex items-center"
          >
            <span className="text-xs text-gray-400 pr-2">
              {formatCurrency(maxValue - (i * (maxValue / 4)))}
            </span>
          </div>
        ))}
      </div>
      
      {/* Pontos e linhas do gráfico */}
      <div className="absolute inset-0 flex items-end justify-between pt-6">
        {heights.map((height, i) => (
          <div key={i} className="flex flex-col items-center gap-1 relative">
            <div 
              className={`w-2 rounded-full ${isComparison ? 'bg-blue-500' : 'bg-primary'}`}
              style={{ height: `${height}%` }}
            />
            <div className="h-px w-full absolute bottom-0" style={{ bottom: `${height}%` }}>
              {i < heights.length - 1 && (
                <div 
                  className={`h-px w-full ${isComparison ? 'bg-blue-500' : 'bg-primary'}`}
                  style={{ 
                    transformOrigin: 'left',
                    transform: `rotate(${Math.atan2(
                      (heights[i+1] - height), 
                      100 / heights.length
                    ) * (180 / Math.PI)}deg)`,
                    width: `${100 / (heights.length - 1)}%`
                  }}
                />
              )}
            </div>
            <span className="text-xs text-gray-500 rotate-45 origin-left translate-y-2">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i % 12]}
            </span>
          </div>
        ))}
      </div>
      
      {/* Linha de meta */}
      {isComparison && (
        <div 
          className="absolute border-t-2 border-dashed border-gray-400 left-0 right-0" 
          style={{ bottom: '70%' }}
        >
          <span className="absolute right-0 -top-6 text-xs text-gray-500">
            Meta: {formatCurrency(maxValue * 0.7)}
          </span>
        </div>
      )}
    </div>
  )
}

export function RevenueForecast() {
  const [activeTab, setActiveTab] = useState('mensal')
  
  // Dados de exemplo
  const monthlyData = {
    actual: [1200000, 1350000, 1400000, 1600000, 1750000, 1850000],
    forecast: [1950000, 2100000, 2200000, 2350000, 2500000, 2650000]
  }
  
  const quarterlyData = {
    actual: [3950000, 5200000],
    forecast: [6250000, 7500000]
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Forecast de Receita</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-4 w-4" />
            <span>2023</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Visualização da projeção de receita ao longo do tempo, comparando dados reais
                  com previsões e metas.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mensal" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="mensal">Mensal</TabsTrigger>
              <TabsTrigger value="trimestral">Trimestral</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span>Realizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Previsto</span>
              </div>
            </div>
          </div>
          
          <TabsContent value="mensal" className="mt-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-2">
                <div className="bg-card p-3">
                  <h4 className="font-medium">Receita Mensal (R$)</h4>
                  <div className="relative">
                    <LineChart data={[...monthlyData.actual, ...monthlyData.forecast]} />
                    <div className="absolute inset-x-0 top-1/2 border-l border-dashed border-gray-300" style={{ left: `${(monthlyData.actual.length / (monthlyData.actual.length + monthlyData.forecast.length)) * 100}%` }} />
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-gray-500">
                    <span>Dados históricos</span>
                    <span>Previsão</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-gray-500">Receita Atual (YTD)</h4>
                    <p className="mt-2 text-3xl font-bold text-primary">{formatCurrency(monthlyData.actual.reduce((a, b) => a + b, 0))}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">+12%</span>
                      <span className="text-gray-500">vs. mesmo período ano anterior</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-gray-500">Previsão para o Ano</h4>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                      {formatCurrency([...monthlyData.actual, ...monthlyData.forecast].reduce((a, b) => a + b, 0))}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">+18%</span>
                      <span className="text-gray-500">vs. ano anterior</span>
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-gray-600">Meta Anual:</span>
                      <span className="font-medium">{formatCurrency(22000000)}</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          width: `${([...monthlyData.actual, ...monthlyData.forecast].reduce((a, b) => a + b, 0) / 22000000) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="mt-1 text-right text-xs text-gray-500">
                      {Math.round(([...monthlyData.actual, ...monthlyData.forecast].reduce((a, b) => a + b, 0) / 22000000) * 100)}% da meta
                    </div>
                  </div>
                  
                  <Button variant="link" className="h-8 px-0 text-sm" asChild>
                    <a href="#" className="flex items-center">
                      <span>Ver relatório detalhado</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trimestral" className="mt-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-2">
                <div className="bg-card p-3">
                  <h4 className="font-medium">Receita Trimestral (R$)</h4>
                  <div className="relative">
                    <LineChart data={[...quarterlyData.actual, ...quarterlyData.forecast]} />
                    <div 
                      className="absolute inset-x-0 top-1/2 border-l border-dashed border-gray-300" 
                      style={{ 
                        left: `${(quarterlyData.actual.length / (quarterlyData.actual.length + quarterlyData.forecast.length)) * 100}%` 
                      }} 
                    />
                  </div>
                  <div className="mt-4 flex justify-between text-xs text-gray-500">
                    <span>Dados históricos</span>
                    <span>Previsão</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-gray-500">Receita Atual (YTD)</h4>
                    <p className="mt-2 text-3xl font-bold text-primary">{formatCurrency(quarterlyData.actual.reduce((a, b) => a + b, 0))}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">+14%</span>
                      <span className="text-gray-500">vs. mesmo período ano anterior</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium text-gray-500">Previsão para o Ano</h4>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                      {formatCurrency([...quarterlyData.actual, ...quarterlyData.forecast].reduce((a, b) => a + b, 0))}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">+22%</span>
                      <span className="text-gray-500">vs. ano anterior</span>
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-gray-600">Meta Anual:</span>
                      <span className="font-medium">{formatCurrency(22000000)}</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          width: `${([...quarterlyData.actual, ...quarterlyData.forecast].reduce((a, b) => a + b, 0) / 22000000) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="mt-1 text-right text-xs text-gray-500">
                      {Math.round(([...quarterlyData.actual, ...quarterlyData.forecast].reduce((a, b) => a + b, 0) / 22000000) * 100)}% da meta
                    </div>
                  </div>
                  
                  <Button variant="link" className="h-8 px-0 text-sm" asChild>
                    <a href="#" className="flex items-center">
                      <span>Ver relatório detalhado</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}