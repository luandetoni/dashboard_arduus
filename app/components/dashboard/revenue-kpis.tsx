"use client"

import React from "react"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  BarChart, 
  DollarSign, 
  Users, 
  TrendingUp 
} from "lucide-react"
import { formatCurrency, formatPercentage } from "@/app/lib/utils"

type KpiCardProps = {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  isPercentage?: boolean
  isCurrency?: boolean
  isFilled?: boolean
}

function KpiCard({ 
  title, 
  value, 
  change, 
  icon, 
  isPercentage = false, 
  isCurrency = false,
  isFilled = false 
}: KpiCardProps) {
  const isPositive = change >= 0
  const formattedValue = isCurrency 
    ? formatCurrency(Number(value)) 
    : isPercentage 
      ? formatPercentage(Number(value))
      : value

  return (
    <div className={`kpi-card p-4 ${
      isFilled 
        ? 'bg-gradient-to-br from-blue-900 to-blue-950 border-blue-800 blue-glow text-blue-50' 
        : 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 border-slate-800 blue-glow-sm'
    }`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          isFilled ? 'text-blue-200' : 'text-slate-400'
        }`}>{title}</span>
        <div className={`rounded-full p-2 ${
          isFilled 
            ? 'bg-blue-800/40 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]' 
            : 'bg-slate-800 text-blue-400'
        }`}>
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <span className={`text-2xl font-bold ${
          isFilled ? 'text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'text-blue-100'
        }`}>{formattedValue}</span>
        <div className="mt-1 flex items-center gap-1">
          <span className={`flex items-center text-xs font-medium ${
            isPositive 
              ? isFilled ? 'text-emerald-300' : 'text-emerald-500' 
              : isFilled ? 'text-red-300' : 'text-red-500'
          }`}>
            {isPositive ? (
              <ArrowUpRight className="mr-0.5 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-0.5 h-3 w-3" />
            )}
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className={`text-xs ${
            isFilled ? 'text-blue-200/70' : 'text-slate-500'
          }`}>vs mês anterior</span>
        </div>
      </div>
    </div>
  )
}

export function RevenueKpis() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Net Revenue Retention"
        value={94}
        change={3.5}
        isPercentage={true}
        icon={<TrendingUp className="h-4 w-4" />}
        isFilled={true}
      />
      <KpiCard
        title="Tempo Médio de Contrato"
        value="24 meses"
        change={12.5}
        icon={<Clock className="h-4 w-4" />}
      />
      <KpiCard
        title="Ticket Médio"
        value={45000}
        change={-2.3}
        isCurrency={true}
        icon={<DollarSign className="h-4 w-4" />}
      />
      <KpiCard
        title="Clientes Ativos"
        value={187}
        change={8.2}
        icon={<Users className="h-4 w-4" />}
      />
    </div>
  )
}