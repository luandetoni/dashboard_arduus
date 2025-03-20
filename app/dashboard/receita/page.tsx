"use client";

import { useState, useEffect, useRef } from "react"
import { RevenueFunnel } from "@/app/components/dashboard/revenue-funnel"
import { PerformanceTable } from "@/app/components/dashboard/performance-table"
import { RevenueFilters } from "@/app/components/dashboard/revenue-filters"
import { GapToPlan } from "@/app/components/dashboard/gap-to-plan"
import { ForecastCategories } from "@/app/components/dashboard/forecast-categories"

export default function RevenueDashboardPage() {
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(false)
  const mainRef = useRef(null)
  
  // Effect to observe the main element's position and size
  useEffect(() => {
    // Function to update CSS variables based on main element
    const updateMainDimensions = () => {
      const mainElement = document.querySelector('main')
      if (mainElement) {
        const rect = mainElement.getBoundingClientRect()
        document.documentElement.style.setProperty('--main-top', `${rect.top}px`)
        document.documentElement.style.setProperty('--main-height', `${rect.height}px`)
      }
    }
    
    // Initial update
    updateMainDimensions()
    
    // Update on resize
    window.addEventListener('resize', updateMainDimensions)
    
    // Delay update to ensure layout is complete
    const timeoutId = setTimeout(updateMainDimensions, 500)
    
    return () => {
      window.removeEventListener('resize', updateMainDimensions)
      clearTimeout(timeoutId)
    }
  }, [])
  
  return (
    <div className="flex flex-col space-y-5 relative">
      {/* Page header with futuristic design */}
      <div className="flex flex-col mb-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Dashboard de Receita
        </h1>
      </div>
      
      {/* Filters with very dark theme */}
      <div className="no-card-border">
        <RevenueFilters />
      </div>
      
      {/* Gap to Plan e Forecast Categories */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <GapToPlan />
        </div>
        <div className="lg:col-span-2">
          <ForecastCategories />
        </div>
      </div>
      
      {/* Funil de Receita - Deep dark theme with blue glow */}
      <div className="no-card-border">
        <RevenueFunnel />
      </div>
      
      {/* Performance Table */}
      <div className="no-card-border">
        <PerformanceTable />
      </div>
      
      {/* Intelligence Hub Toggle Button that follows the sliding panel */}
      <button 
        className={`fixed top-1/2 -translate-y-1/2 h-16 w-16 rounded-l-md border border-r-0 border-blue-900/50 ai-button-glow flex items-center justify-center z-50 ${isIntelligenceOpen ? 'bg-gray-950 right-[1100px]' : 'bg-gray-950 right-0'} transition-all duration-300 hover:bg-gray-900 shadow-lg p-2`}
        onClick={() => setIsIntelligenceOpen(!isIntelligenceOpen)}
        aria-label="Toggle Intelligence Hub"
      >
        <div className="flex flex-col items-center relative">
          <div className={`absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-300 animate-pulse`}></div>
          {/* AI icon from image (white version) */}
          <img 
            src="/images/icon-ai-white.png" 
            alt="AI" 
            className="h-6 w-6" 
          />
          <span className="text-xs font-bold text-white mt-1">AI</span>
          
        </div>
      </button>
      
      {/* Intelligence Hub Sliding Panel - widened to better distribute columns */}
      <div 
        className={`fixed right-0 w-[1100px] bg-gray-950 border-l border-blue-900/40 blue-glow-sm z-40 transition-transform duration-300 ease-in-out ${isIntelligenceOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          top: 'var(--main-top, 4rem)',
          height: 'var(--main-height, calc(100vh - 4rem))',
        }}
      >
        <div className="h-full flex flex-col p-4 md:p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <span className="mr-2">Intelligence Hub</span>
              <span className="text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded-full border border-blue-900/50">AI Powered</span>
            </h2>
            <div className="flex items-center space-x-2">
              <button className="text-xs px-3 py-1 rounded-md bg-gray-900 border border-gray-800 text-gray-400 hover:text-blue-400 hover:border-blue-900/50 transition-colors">
                Últimos 30 dias
              </button>
            </div>
          </div>
          
          {/* Tabs for Insights and Foresights */}
          <div className="border-b border-gray-900 mb-5">
            <div className="flex space-x-6">
              <button className="py-2 border-b-2 border-blue-500 text-white font-medium text-sm">
                Insights & Foresights
              </button>
              <button className="py-2 text-gray-500 hover:text-gray-300 text-sm">
                Assistente
              </button>
              <button className="py-2 text-gray-500 hover:text-gray-300 text-sm">
                Análise
              </button>
            </div>
          </div>
          
          {/* Content Sections with balanced columns */}
          <div className="grid grid-cols-10 gap-4 md:gap-6 flex-1 overflow-hidden h-full">
            {/* Insights Section */}
            <div className="col-span-3 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <h3 className="text-blue-400 font-medium text-sm">Insights</h3>
                <span className="text-xs text-gray-500">Análise Retroativa</span>
              </div>
              
              <div className="space-y-3 overflow-auto flex-1">
                <div className="p-3 bg-gray-900 rounded-md border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-blue-500">Anomalia Detectada</span>
                    <span className="text-xs text-gray-500">2 dias atrás</span>
                  </div>
                  <p className="text-sm text-gray-300">Queda de 23% na taxa de conversão no estágio de Prioritize para clientes Enterprise</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">Investigar →</button>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900 rounded-md border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-emerald-500">Oportunidade</span>
                    <span className="text-xs text-gray-500">1 semana atrás</span>
                  </div>
                  <p className="text-sm text-gray-300">Aumento de 15% em expansões no segmento Mid-market após nova feature X</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">Analisar →</button>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900 rounded-md border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-red-500">Alerta</span>
                    <span className="text-xs text-gray-500">Hoje</span>
                  </div>
                  <p className="text-sm text-gray-300">Atraso de pagamento em 3 contas Enterprise que representam 18% da receita mensal</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">Verificar →</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Foresights Section */}
            <div className="col-span-3 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <h3 className="text-blue-400 font-medium text-sm">Foresights</h3>
                <span className="text-xs text-gray-500">Análise Preditiva</span>
              </div>
              
              <div className="space-y-3 overflow-auto flex-1">
                <div className="p-3 bg-gray-900 rounded-md border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-amber-500">Previsão</span>
                    <span className="text-xs text-gray-500">Próximos 30 dias</span>
                  </div>
                  <p className="text-sm text-gray-300">Provável redução de 8% no pipeline de Q4 se a taxa atual de qualificação se mantiver</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">Simular cenários →</button>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900 rounded-md border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-purple-500">Tendência</span>
                    <span className="text-xs text-gray-500">Próximos 90 dias</span>
                  </div>
                  <p className="text-sm text-gray-300">Crescimento de 12% esperado em novas oportunidades do canal de Referências</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">Ver previsão →</button>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900 rounded-md border border-blue-900/30 hover:border-blue-700/40 transition-colors shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-blue-500">Projeção</span>
                    <span className="text-xs text-gray-500">Próximos 12 meses</span>
                  </div>
                  <p className="text-sm text-gray-300">Modelo de IA projeta ROI de 3.2x para expansão de vendas no mercado LATAM</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-blue-400 hover:text-blue-300">Explorar →</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Assistant - wider column */}
            <div className="col-span-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <h3 className="text-blue-400 font-medium text-sm">Assistente IA</h3>
                <div className="flex items-center text-xs">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-gray-400">Online</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto mb-3 bg-gray-900 rounded-md border border-blue-900/30 p-4 shadow-md">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 border border-blue-800 flex items-center justify-center text-blue-400 text-xs mr-2 flex-shrink-0">
                      A
                    </div>
                    <div className="bg-gray-800 rounded-lg rounded-tl-none p-2 text-xs text-gray-300">
                      <p>A análise de receita atual mostra que seu ciclo de vendas reduziu 15% desde o trimestre anterior. Como posso ajudar a explorar esse insight?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-end">
                    <div className="bg-blue-900/20 rounded-lg rounded-tr-none p-2 text-xs text-gray-200 max-w-[90%]">
                      <p>Quais fatores contribuíram para essa redução no ciclo de vendas?</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500/40 flex items-center justify-center text-white text-xs ml-2 flex-shrink-0">
                      U
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-900/50 border border-blue-800 flex items-center justify-center text-blue-400 text-xs mr-2 flex-shrink-0">
                      A
                    </div>
                    <div className="bg-gray-800 rounded-lg rounded-tl-none p-2 text-xs text-gray-300">
                      <p>Identificamos três fatores principais:</p>
                      <ol className="list-decimal pl-4 mt-1 space-y-1">
                        <li>Implementação de processos de qualificação mais eficientes</li>
                        <li>Redução no tempo de resposta da equipe técnica em demos</li>
                        <li>Nova política de descontos para decisões rápidas</li>
                      </ol>
                      <p className="mt-1">O maior impacto veio da redução no tempo entre demo e decisão final. Gostaria de ver os dados detalhados?</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Pergunte sobre seus dados de receita..." 
                    className="w-full h-9 rounded-md border border-blue-900/40 bg-gray-900 px-3 py-2 text-sm text-gray-300 placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-800 shadow-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
                
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                  <span>Sugestões:</span>
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 rounded-full border border-blue-900/40 bg-gray-900 hover:border-blue-700/50 hover:text-blue-400 transition-colors shadow-sm">
                      Projetar Q4
                    </button>
                    <button className="px-2 py-1 rounded-full border border-blue-900/40 bg-gray-900 hover:border-blue-700/50 hover:text-blue-400 transition-colors shadow-sm">
                      Comparar YoY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}