"use client"

import React, { useState, useEffect } from "react"
import { 
  ArrowRight, 
  Calendar, 
  Info, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"
import { formatCurrency, formatNumber, formatPercentage } from "@/app/lib/utils"

type FunnelStage = {
  id: string
  name: string
  volume: number
  amount: number
  conversion: number
  days: number
  badges?: {
    text: string
    color: string
  }[]
}

const defaultStages: FunnelStage[] = [
  {
    id: "awareness",
    name: "Awareness",
    volume: 150,
    amount: 1075000,
    conversion: 87, // Convertendo para Education: 130/150 = 87%
    days: 8.05,
    badges: [
      { text: "29% LTO", color: "bg-slate-200 text-slate-800" }
    ]
  },
  {
    id: "education",
    name: "Education",
    volume: 130,
    amount: 920750,
    conversion: 81, // Convertendo para Prioritize: 105/130 = 81%
    days: 10.65
  },
  {
    id: "prioritize",
    name: "Prioritize",
    volume: 105,
    amount: 810500,
    conversion: 90, // Convertendo para Selection: 95/105 = 90%
    days: 21.65,
    badges: [
      { text: "19% OTC", color: "bg-slate-200 text-slate-800" }
    ]
  },
  {
    id: "selection",
    name: "Selection",
    volume: 95,
    amount: 701600,
    conversion: 84, // Convertendo para Onboarding: 80/95 = 84%
    days: 2.16
  },
  {
    id: "onboarding",
    name: "Onboarding",
    volume: 80,
    amount: 599100,
    conversion: 81, // Convertendo para Retention: 65/80 = 81%
    days: 20.11
  },
  {
    id: "retention",
    name: "Retention",
    volume: 65,
    amount: 463350,
    conversion: 62, // Convertendo para Expansion: 40/65 = 62%
    days: 45.89,
    badges: [
      { text: "NRR", color: "bg-emerald-100 text-emerald-800" }
    ]
  },
  {
    id: "expansion",
    name: "Expansion",
    volume: 40,
    amount: 325000,
    conversion: 138, // OUT > IN: 55/40 = 138% (expansão de receita)
    days: 130,
    badges: [
      { text: "31% Bmk", color: "bg-slate-200 text-slate-800" }
    ]
  }
]

export function RevenueFunnel() {
  const [stages, setStages] = useState<FunnelStage[]>(defaultStages)
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

  const handleStageClick = (stageId: string) => {
    setExpandedStage(expandedStage === stageId ? null : stageId)
  }

  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  
  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return (
    <Card className="w-full responsive-card">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 gap-2">
        <CardTitle className="text-lg sm:text-xl font-bold text-white">
          Funil de Receita
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1 bg-black border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900 text-xs sm:text-sm"
          >
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
            <span className="hidden sm:inline">Últimos 30 dias</span>
            <span className="sm:hidden">30d</span>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black border border-gray-800 text-gray-300">
                <p className="max-w-xs text-xs sm:text-sm">
                  Visualização da jornada do cliente através das etapas de vendas, 
                  com volume, valor, conversão e tempo médio em cada etapa.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop visualization (hidden on mobile) */}
        <div className={`revenue-funnel mt-2 ${hasMounted && isMobile ? 'hidden' : 'block'}`}>
          {/* Header row with stage names */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {stages.map((stage) => (
              <div 
                key={`header-${stage.id}`} 
                className="text-sm font-medium text-blue-400 px-1"
              >
                {stage.name}
              </div>
            ))}
          </div>
          
          {/* Volume and Amount row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {stages.map((stage) => (
              <div 
                key={`stats-${stage.id}`} 
                className="flex flex-col text-xs bg-gray-950 rounded-md border border-gray-800 p-2"
              >
                <div className="text-xs text-gray-400">Volume: <span className="text-gray-200">{formatNumber(stage.volume)}</span></div>
                <div className="text-xs text-gray-400">Amount: <span className="text-blue-300">{formatCurrency(stage.amount)}</span></div>
              </div>
            ))}
          </div>
          
          {/* KPI Metrics row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {[
              { stage: "awareness", kpi: "MQL" },
              { stage: "education", kpi: "SQO" },
              { stage: "prioritize", kpi: "SAL • DEMO • POV" },
              { stage: "selection", kpi: "VAG • NEG" },
              { stage: "onboarding", kpi: "ON BOARDING • DEPLOYED" },
              { stage: "retention", kpi: "ARCHIVE IMPACT" },
              { stage: "expansion", kpi: "EXPANSION" }
            ].map((item, index) => (
              <div 
                key={`kpi-${index}`} 
                className="text-xs font-medium text-blue-300 p-1 rounded-md bg-blue-950/20 border border-blue-900/30"
              >
                {item.kpi}
              </div>
            ))}
          </div>
          
          {/* Conversion row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-3">
            {stages.map((stage) => (
              <div 
                key={`conversion-${stage.id}`} 
                className="text-sm font-medium p-1"
              >
                <span className={`${stage.conversion >= 70 ? 'text-emerald-500' : stage.conversion >= 40 ? 'text-blue-500' : 'text-amber-500'} font-bold`}>
                  {formatPercentage(stage.conversion)}
                </span>
                <span className="text-gray-400 ml-1 text-xs">Conversion</span>
              </div>
            ))}
          </div>
          
          {/* Horizontal Funnel Flow Visualization */}
          <div className="relative h-72 mt-6 mb-6">
            {/* Dark container with subtle border */}
            <div className="absolute inset-0 bg-gray-950 rounded-lg border border-gray-800"></div>
            
            {/* Labels for stages */}
            <div className="absolute top-0 left-0 w-full grid grid-cols-7 gap-0.5 px-1 pt-1">
              {stages.map((stage) => (
                <div 
                  key={`label-${stage.id}`}
                  className="text-xs font-medium text-blue-400 text-center"
                >
                  {stage.name}
                </div>
              ))}
            </div>

            {/* KPI labels below stage names */}
            <div className="absolute top-5 left-0 w-full grid grid-cols-7 gap-0.5 px-1">
              {[
                "MQL", 
                "SQO", 
                "SAL•DEMO•POV", 
                "VAG•NEG", 
                "ON BOARDING•DEPLOYED", 
                "ARCHIVE IMPACT", 
                "EXPANSION"
              ].map((kpi, i) => (
                <div 
                  key={`kpi-label-${i}`} 
                  className="text-[0.6rem] text-center text-blue-300 font-medium overflow-hidden text-ellipsis whitespace-nowrap px-0.5"
                >
                  {kpi}
                </div>
              ))}
            </div>
            
            {/* Main funnel flow visualization */}
            <div className="absolute top-12 left-0 right-0 bottom-12 px-1">
              {stages.map((stage, index) => {
                // Calculate output volume (using next stage volume or 55 for expansion)
                const outputVolume = index < stages.length - 1 ? stages[index + 1].volume : 55; // 55 for expansion (greater than its input of 40)
                
                // Calculate relative heights based on volumes
                const inputHeight = (stage.volume / Math.max(...stages.map(s => s.volume))) * 100;
                const outputHeight = (outputVolume / Math.max(...stages.map(s => s.volume))) * 100;
                
                // Color based on conversion rate
                const highConversion = stage.conversion >= 70;
                const midConversion = stage.conversion >= 40 && stage.conversion < 70;
                
                let bgGradient = "";
                if (highConversion) {
                  bgGradient = "from-blue-600/90 to-blue-700/90";
                } else if (midConversion) {
                  bgGradient = "from-blue-500/80 to-blue-600/80";
                } else {
                  bgGradient = "from-blue-400/70 to-blue-500/70";
                }
                
                return (
                  <div 
                    key={`flow-${stage.id}`}
                    className="relative group h-full inline-block"
                    style={{ width: `${100/7}%` }}
                    onClick={() => handleStageClick(stage.id)}
                  >
                    {/* Container for the funnel segment */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Funnel segment shape */}
                      <div 
                        className={`w-full relative bg-gradient-to-r ${bgGradient} border border-blue-500/20 cursor-pointer transition-all duration-300 ${expandedStage === stage.id ? "scale-[1.03] z-10" : ""}`}
                        style={{ 
                          clipPath: `polygon(
                            0% ${50 - inputHeight/2}%, 
                            100% ${50 - outputHeight/2}%, 
                            100% ${50 + outputHeight/2}%, 
                            0% ${50 + inputHeight/2}%
                          )`,
                          height: "100%"
                        }}
                      >
                        {/* Conversion rate in center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-xs font-bold bg-gray-900/60 px-2 py-0.5 rounded-md border border-blue-500/30">
                            {formatPercentage(stage.conversion)}
                          </div>
                        </div>
                        
                        {/* Hover effect with details */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center bg-blue-900/80 text-white">
                          <div className="text-xs font-bold">{stage.name}</div>
                          <div className="text-[0.6rem]">Conv: {formatPercentage(stage.conversion)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Volume indicators within each funnel segment */}
            <div className="absolute inset-y-0 left-0 w-full grid grid-cols-7 pointer-events-none px-1">
              {stages.map((stage, index) => {
                // Get the output volume (next stage's input or 55 for expansion)
                const outputVolume = index < stages.length - 1 ? stages[index + 1].volume : 55; // 55 for expansion
                
                // Calculate relative heights based on volumes for positioning
                const inputHeight = (stage.volume / Math.max(...stages.map(s => s.volume))) * 100;
                const outputHeight = (outputVolume / Math.max(...stages.map(s => s.volume))) * 100;
                
                return (
                  <div key={`volumes-${stage.id}`} className="relative h-full">
                    {/* Input volume (left side) */}
                    <div 
                      className="absolute left-0.5 text-[0.65rem] text-gray-300 font-medium bg-gray-950/80 px-1 rounded-sm border border-blue-900/30 z-10"
                      style={{ 
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    >
                      <span className="text-blue-400 mr-0.5">IN:</span> {formatNumber(stage.volume)}
                    </div>
                    
                    {/* Output volume (right side) */}
                    <div 
                      className="absolute right-0.5 text-[0.65rem] text-gray-300 font-medium bg-gray-950/80 px-1 rounded-sm border border-blue-900/30 z-10"
                      style={{ 
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    >
                      <span className="text-blue-400 mr-0.5">OUT:</span> {formatNumber(outputVolume)}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Metrics legend at the top */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4 text-[0.65rem] text-gray-400">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-400 mr-1 rounded-sm"></span>
                <span>IN: Volume Entrada</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-600 mr-1 rounded-sm"></span>
                <span>%: Taxa Conversão</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-400 mr-1 rounded-sm"></span>
                <span>OUT: Volume Saída</span>
              </div>
            </div>
            
            {/* Subtle divider lines between stages */}
            <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-gray-800 h-full"></div>
              ))}
            </div>
          </div>
          
          {/* Days row */}
          <div className="grid grid-cols-7 gap-1 text-center mt-4">
            {stages.map((stage) => (
              <div 
                key={`days-${stage.id}`} 
                className="text-xs text-gray-400 flex items-center justify-center gap-1"
              >
                <ArrowRight className="h-3 w-3 text-gray-500" />
                {stage.days} days
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile visualization (shown only on mobile) */}
        <div className={`revenue-funnel-mobile mt-4 ${hasMounted && isMobile ? 'block' : 'hidden'}`}>
          {stages.map((stage, index) => {
            // Get the output volume (next stage's input or 55 for expansion)
            const outputVolume = index < stages.length - 1 ? stages[index + 1].volume : 55; // 55 for expansion
            
            // Color based on conversion rate
            const conversionColor = stage.conversion >= 70 
              ? 'text-emerald-500' 
              : stage.conversion >= 40 
                ? 'text-blue-500' 
                : 'text-amber-500';
            
            return (
              <div
                key={`mobile-${stage.id}`}
                className={`revenue-funnel-mobile-stage mb-3 ${expandedStage === stage.id ? 'blue-glow' : ''}`}
                onClick={() => handleStageClick(stage.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-bold text-blue-400">{stage.name}</div>
                  <div className={`text-sm font-bold ${conversionColor}`}>
                    {formatPercentage(stage.conversion)} 
                    <span className="text-xs text-gray-400"> (Conversion)</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs mb-1">
                  <div>
                    <span className="text-gray-400 mr-1">Volume:</span>
                    <span className="text-gray-200">{formatNumber(stage.volume)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 mr-1">Amount:</span>
                    <span className="text-blue-300">{formatCurrency(stage.amount)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="text-blue-500 mr-1">IN:</span>
                    <span className="text-gray-300">{formatNumber(stage.volume)}</span>
                  </div>
                  <div>
                    <span className="text-blue-500 mr-1">OUT:</span>
                    <span className="text-gray-300">
                      {formatNumber(outputVolume)}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-blue-300 mt-2 bg-blue-950/20 border border-blue-900/30 rounded px-2 py-1 text-center">
                  {[
                    "MQL", "SQO", "SAL•DEMO•POV", "VAG•NEG", 
                    "ON BOARDING•DEPLOYED", "ARCHIVE IMPACT", "EXPANSION"
                  ][index]}
                </div>
                
                <div className="text-xs text-gray-400 mt-2 flex items-center gap-1 justify-end">
                  <ArrowRight className="h-3 w-3 text-gray-500" />
                  {stage.days} days
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary section */}
        <div className="mt-6 border-t border-gray-900 pt-4">
          {/* Responsive table container for mobile scrolling */}
          <div className="responsive-table-container">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="text-xs sm:text-sm text-blue-400">
                  <th className="text-left font-medium py-2 px-1">ACV (R$)</th>
                  <th className="text-left font-medium py-2 px-1">CICLO</th>
                  {stages.map((stage) => (
                    <th key={`th-${stage.id}`} className="text-left font-medium py-2 px-1">
                      {stage.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { acv: '<1k', cycle: '0-10', metrics: [5, 15, 80, 15, 90, 90, 105] },
                  { acv: '1k-5k', cycle: '10-20', metrics: [10, 20, 85, 17, 92, 92, 110] },
                  { acv: '5k-15k', cycle: '30-60', metrics: [15, 20, 90, 20, 93, 95, 115] }
                ].map((row, idx) => (
                  <tr 
                    key={`row-${idx}`} 
                    className={`text-xs sm:text-sm py-2 border-b border-gray-900 ${idx % 2 === 0 ? 'bg-gray-950/50' : ''}`}
                  >
                    <td className="text-gray-300 py-2 px-1">{row.acv}</td>
                    <td className="text-gray-400 py-2 px-1">{row.cycle}</td>
                    {row.metrics.map((val, i) => {
                      let textColor = "";
                      if (val >= 90) textColor = "text-emerald-500 font-medium";
                      else if (val >= 70) textColor = "text-blue-500";
                      else if (val >= 50) textColor = "text-amber-500";
                      else textColor = "text-red-500";
                      
                      return (
                        <td key={i} className={`${textColor} py-2 px-1`}>
                          {formatPercentage(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}