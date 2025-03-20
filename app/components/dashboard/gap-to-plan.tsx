"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { formatCurrency } from "@/app/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function GapToPlan() {
  // Dados estáticos baseados na imagem
  const planAmount = 830400000
  const closedAmount = 410600000
  const gapToPlan = planAmount - closedAmount
  const planPercentage = (closedAmount / planAmount) * 100
  
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [displayedGap, setDisplayedGap] = useState(0)
  
  // Client-side detection of screen size
  useEffect(() => {
    setHasMounted(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Animate the gap value
  useEffect(() => {
    if (hasMounted) {
      const duration = 2000 // 2 seconds
      const frames = 50
      const step = gapToPlan / frames
      let count = 0
      
      const interval = setInterval(() => {
        count++
        setDisplayedGap(Math.ceil(Math.min(step * count, gapToPlan)))
        
        if (count >= frames) {
          clearInterval(interval)
        }
      }, duration / frames)
      
      return () => clearInterval(interval)
    }
  }, [gapToPlan, hasMounted])
  
  return (
    <Card className="w-full h-auto sm:h-[290px] flex flex-col overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-white">
          Gap to Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-4 flex-1 flex flex-col px-4 sm:px-6">
        <div className={`flex ${hasMounted && isMobile ? 'flex-col' : 'sm:flex-row'} h-full`}>
          {/* Left column with gauge */}
          <div className={`flex flex-col items-center ${hasMounted && isMobile ? 'w-full' : 'w-1/2'} justify-center ${!isMobile ? 'pr-3' : ''}`}>
            {/* Simplified progress gauge with outline style */}
            <div className="relative w-full flex items-center justify-center mb-4">
              <div className="w-full max-w-xs sm:max-w-sm">
                {/* Minimalist gauge display */}
                <div className="relative h-20 sm:h-24 w-full flex flex-col items-center justify-center">
                  {/* Progress track */}
                  <div className="w-full h-10 relative bg-gray-900 rounded-md overflow-hidden border border-gray-700">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-20" style={{ 
                      backgroundImage: 'linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.05) 19px, rgba(255,255,255,0.05) 20px)',
                      backgroundSize: '20px 100%'
                    }}></div>
                    
                    {/* Progress bar - clean and minimal */}
                    <motion.div 
                      className="h-full rounded-sm bg-green-600 relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${planPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      {/* Subtle shimmer effect */}
                      <motion.div 
                        className="absolute inset-0 w-full h-full opacity-30"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={{
                          backgroundPosition: ['0% 0%', '200% 0%'],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                    
                    {/* Tick marks - minimal */}
                    <div className="absolute inset-y-0 w-full flex items-center justify-between px-2 pointer-events-none">
                      {[0, 25, 50, 75, 100].map((mark) => (
                        <div 
                          key={mark}
                          className="h-2 w-0.5 bg-gray-600 opacity-50"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Percentage markers */}
                  <div className="w-full flex justify-between mt-2 px-1">
                    <div className="text-xs text-gray-500">0%</div>
                    <div className="text-xs text-gray-500">50%</div>
                    <div className="text-xs text-gray-500">100%</div>
                  </div>
                  
                  {/* Current percentage indicator */}
                  <motion.div 
                    className="absolute top-5 flex flex-col items-center"
                    initial={{ x: 0 }}
                    animate={{ x: `calc(${planPercentage}% - 50%)` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ left: '50%' }}
                  >
                    {/* Indicator line */}
                    <motion.div 
                      className="h-4 w-0.5 bg-white"
                      animate={{ height: [4, 6, 4] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    ></motion.div>
                    
                    {/* Percentage value */}
                    <motion.div 
                      className="bg-black border border-gray-700 rounded-md px-2 py-0.5 text-white text-sm font-medium"
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {planPercentage.toFixed(1)}%
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Gap to Plan metric below gauge - simplified */}
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Gap To Plan</div>
              <motion.div 
                className="relative text-lg sm:text-xl font-bold"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="flex justify-center items-center">
                  <span className="text-white">
                    {hasMounted ? formatCurrency(displayedGap) : formatCurrency(gapToPlan)}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Right column with PLAN and CLOSED metrics */}
          <div className={`${hasMounted && isMobile ? 'w-full mt-1' : 'w-1/2 pl-3'} flex flex-col justify-center`}>
            <div className="h-full flex flex-col justify-center space-y-6">
              {/* Plan metric with clean animation */}
              <motion.div 
                className="flex flex-col" 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">PLAN</div>
                  <div className="text-xs text-gray-400 px-2 py-0.5 rounded-md border border-gray-700 bg-gray-900">
                    Target
                  </div>
                </div>
                <div className="text-base sm:text-lg font-bold text-white truncate mt-1">{formatCurrency(planAmount)}</div>
                <div className="h-1 w-full bg-gray-800 rounded-sm mt-1 overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600 rounded-sm"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </motion.div>
              
              {/* Closed metric with clean animation */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">CLOSED</div>
                  <div className="text-xs text-gray-400 px-2 py-0.5 rounded-md border border-gray-700 bg-gray-900">
                    Current
                  </div>
                </div>
                <div className="text-base sm:text-lg font-bold text-white truncate mt-1">{formatCurrency(closedAmount)}</div>
                <div className="h-1 w-full bg-gray-800 rounded-sm mt-1 overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-green-600 rounded-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${planPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                  
                  {/* Subtle indicator at end of progress */}
                  <motion.div 
                    className="absolute h-3 w-1 rounded-sm bg-green-500"
                    style={{ 
                      top: '50%', 
                      left: `${planPercentage}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ 
                      height: [2, 3, 2],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Bottom info in mobile view */}
        {hasMounted && isMobile && (
          <div className="border-t border-gray-800 mt-4 pt-3 text-xs text-center text-gray-500">
            Deslize para ver mais detalhes
          </div>
        )}
      </CardContent>
    </Card>
  )
}