"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { formatCurrency } from "@/app/lib/utils"
import { Edit2, Lightbulb, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"

type ForecastCategory = {
  title: string
  amount: number
  percentage?: number
  icon?: React.ReactNode
  progressColor?: string
  sparkline?: number[]
}

export function ForecastCategories() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Client-side detection of screen size
  useEffect(() => {
    setHasMounted(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Format currency in a more compact way for smaller screens
  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `R$ ${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
      return `R$ ${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `R$ ${(amount / 1000).toFixed(1)}K`
    } else {
      return `R$ ${amount}`
    }
  }
  
  // Dados estáticos baseados na imagem
  const categories: ForecastCategory[] = [
    {
      title: "FORECAST",
      amount: 902200000,
      percentage: 109,
      icon: <Edit2 className="h-4 w-4 text-white" />,
      progressColor: "bg-gradient-to-r from-emerald-500 to-emerald-400",
      sparkline: []
    },
    {
      title: "AI FORECAST",
      amount: 672700000,
      percentage: 81,
      // AI icon now from image file
      progressColor: "bg-gradient-to-r from-amber-500 to-amber-400",
      sparkline: []
    },
    {
      title: "COMMIT",
      amount: 676388266,
      sparkline: [70, 85, 80, 75, 77, 85, 80, 82, 79, 72]
    },
    {
      title: "PROBABLE",
      amount: 512329180,
      sparkline: [65, 68, 70, 72, 75, 82, 80, 82, 85, 84]
    },
    {
      title: "BEST CASE",
      amount: 612413311,
      sparkline: [60, 75, 70, 68, 69, 72, 75, 78, 82, 85]
    }
  ]

  // Função para renderizar sparkline
  const renderSparkline = (data: number[]) => {
    if (!data || data.length === 0) return null
    
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min
    const normalized = data.map(val => 100 - ((val - min) / range) * 80)
    
    const points = normalized.map((val, i) => `${(i / (data.length - 1)) * 100}% ${val}%`).join(', ')
    
    return (
      <div className="h-6 w-full relative">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke="rgba(148, 163, 184, 0.7)"
            strokeWidth="2"
          />
          <circle 
            cx={`${((data.length - 1) / (data.length - 1)) * 100}%`} 
            cy={`${normalized[normalized.length - 1]}%`} 
            r="3" 
            fill="white" 
          />
        </svg>
      </div>
    )
  }
  
  // Navigation functions for mobile carousel
  const nextCategory = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length)
  }
  
  const prevCategory = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }

  return (
    <Card className="w-full h-auto sm:h-[290px] flex flex-col overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-white">
          Forecast Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4 flex flex-col flex-1 overflow-hidden px-4 sm:px-6"> 
        {/* Desktop View */}
        {(!hasMounted || !isMobile) && (
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 h-full">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="flex flex-col h-full border rounded-md border-blue-950/40 px-3 py-3 blue-glow-sm bg-gradient-to-b from-black to-gray-950"
              >
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-3 truncate">
                  {category.title}
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  <div className="text-base sm:text-lg font-bold text-white truncate">
                    {(hasMounted && window.innerWidth < 1280) 
                      ? formatCompactCurrency(category.amount) 
                      : formatCurrency(category.amount)}
                  </div>
                  {category.icon && category.title !== "AI FORECAST" && (
                    <div className="h-5 w-5 flex-shrink-0">{category.icon}</div>
                  )}
                </div>
                
                {category.percentage && (
                  <div className="space-y-1 mb-3">
                    <div className="text-sm font-medium text-blue-400">
                      {category.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${category.progressColor}`}
                        style={{ width: `${Math.min(category.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {category.sparkline && category.sparkline.length > 0 && (
                  <div className="mt-auto">
                    {renderSparkline(category.sparkline)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Mobile Carousel View */}
        {hasMounted && isMobile && (
          <div className="flex flex-col h-full">
            {/* Navigation dots */}
            <div className="flex justify-center mb-3">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    index === activeIndex ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            
            {/* Active category card */}
            <div className="relative flex-1">
              <div className="flex flex-col h-full border rounded-md border-blue-950/40 px-4 py-4 blue-glow-sm bg-gradient-to-b from-black to-gray-950">
                <div className="text-base text-blue-400 uppercase tracking-wider mb-3">
                  {categories[activeIndex].title}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-xl font-bold text-white drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">
                    {formatCurrency(categories[activeIndex].amount)}
                  </div>
                  {categories[activeIndex].icon && categories[activeIndex].title !== "AI FORECAST" && (
                    <div className="h-5 w-5">{categories[activeIndex].icon}</div>
                  )}
                </div>
                
                {categories[activeIndex].percentage && (
                  <div className="space-y-2 mb-4">
                    <div className="text-base font-medium text-blue-400">
                      {categories[activeIndex].percentage}% of Plan
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${categories[activeIndex].progressColor}`}
                        style={{ width: `${Math.min(categories[activeIndex].percentage || 0, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {categories[activeIndex].sparkline && categories[activeIndex].sparkline.length > 0 && (
                  <div className="mt-auto h-12">
                    {renderSparkline(categories[activeIndex].sparkline)}
                  </div>
                )}
                
                {/* Left arrow */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gradient-to-b from-black to-gray-950 text-blue-400 rounded-full border border-blue-900/50"
                  onClick={prevCategory}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Right arrow */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-gradient-to-b from-black to-gray-950 text-blue-400 rounded-full border border-blue-900/50"
                  onClick={nextCategory}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Last updated info */}
        <div className="mt-auto text-xs text-gray-600 pt-3 border-t border-gray-900 text-center">
          Last Updated: 03/17/2022
        </div>
      </CardContent>
    </Card>
  )
}