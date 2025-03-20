"use client"

import Link from "next/link"
import { usePathname } from "next/navigation" 
import { motion } from "framer-motion"
import { 
  Home, 
  BarChart2, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Video, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  ChevronRight,
  Bell,
  Search
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"

const menuItems = [
  { name: "Home", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
  { name: "Inteligência", path: "/dashboard/intelligence", icon: <BarChart2 className="h-5 w-5" /> },
  { name: "Gestão", path: "/dashboard/management", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Financeiro", path: "/dashboard/finance", icon: <DollarSign className="h-5 w-5" /> },
  { name: "Receita", path: "/dashboard/receita", icon: <TrendingUp className="h-5 w-5" /> },
  { name: "Live Learning", path: "/dashboard/learning", icon: <Video className="h-5 w-5" /> },
  { name: "People", path: "/dashboard/people", icon: <Users className="h-5 w-5" /> },
  { name: "Operações", path: "/dashboard/operations", icon: <Settings className="h-5 w-5" /> },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Check if mobile on mount and on resize - client-side only
  useEffect(() => {
    setHasMounted(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-open menu on desktop, close on mobile
      setIsMenuOpen(window.innerWidth >= 768)
      // Ensure menu starts collapsed on desktop
      if (window.innerWidth >= 768) {
        setIsMenuExpanded(false)
      }
    }
    
    // Initial check
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Estado para controlar quando o menu está fixado (pinned) pelo toggle
  const [isMenuPinned, setIsMenuPinned] = useState(false)
  
  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen(!isMenuOpen)
    } else {
      // No desktop, alterna entre fixar o menu ou não
      const newPinnedState = !isMenuPinned
      setIsMenuPinned(newPinnedState)
      
      // Se estiver fixando, expande o menu
      if (newPinnedState) {
        setIsMenuExpanded(true)
      } else {
        // Se estiver desfixando, colapsa o menu
        setIsMenuExpanded(false)
      }
    }
  }

  // Close menu on mobile when navigating
  const handleNavigation = () => {
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black tech-grid-bg">
      {/* Overlay when mobile menu is open - only shown after client-side hydration */}
      {hasMounted && isMobile && isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40"
          onClick={toggleMenu} 
        />
      )}
      
      {/* Sidebar with dark theme and blue glow effects - collapsed by default with hover expand */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-800 bg-black transition-all duration-300 ease-in-out group",
          !isMobile && isMenuOpen ? (isMenuExpanded ? "w-64" : "w-16") : "w-64", // Collapsed width on desktop
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo area with glow effect */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            {isMenuExpanded && <span className="text-xl font-bold text-white transition-opacity duration-200">Arduus</span>}
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Navigation area */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item, index) => {
              const isActive = 
                pathname === item.path || 
                (item.path !== "/dashboard" && pathname?.startsWith(item.path))
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={handleNavigation}
                    className={cn(
                      "group relative flex items-center px-3 py-3 text-sm font-medium transition-all duration-200 overflow-hidden",
                      isActive
                        ? "sidebar-item-active"
                        : "text-gray-500 hover:text-white hover:bg-gray-900"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center",
                      isActive ? "text-blue-500" : "text-gray-500 group-hover:text-white",
                      !isMenuExpanded && !isMobile && "w-full"
                    )}>
                      {item.icon}
                    </div>
                    
                    {isMenuExpanded && (
                      <>
                        <span className="ml-3 whitespace-nowrap transition-opacity duration-200">
                          {item.name}
                        </span>
                        
                        {isActive && (
                          <motion.div 
                            className="ml-auto transition-opacity duration-200"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <ChevronRight className="h-4 w-4 text-blue-500" />
                          </motion.div>
                        )}
                      </>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>
        
        {/* User profile area with outline border */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-gray-700">
                <AvatarImage src="https://github.com/shadcn.png" alt="@profile" />
                <AvatarFallback className="bg-gray-900 text-white text-xs sm:text-sm">AR</AvatarFallback>
              </Avatar>
              {isMenuExpanded && (
                <div className="ml-3 transition-opacity duration-200 flex flex-col">
                  <p className="text-sm font-medium text-white whitespace-nowrap">
                    Ana Rocha
                  </p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">
                    Gerente <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 ml-1"></span>
                  </p>
                </div>
              )}
            </div>
            {isMenuExpanded && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-white transition-opacity duration-200"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300 ease-in-out",
        isMenuOpen ? (!isMobile ? (isMenuExpanded ? "md:pl-64" : "md:pl-16") : "md:pl-64") : "pl-0"
      )}>
        {/* Header with outline style */}
        <header className="z-10 flex h-14 md:h-16 items-center justify-between border-b border-gray-800 bg-black px-3 sm:px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={isMobile ? () => setIsMenuOpen(!isMenuOpen) : toggleMenu} 
              className={cn(
                "mr-2 sm:mr-4 text-gray-500 hover:text-white",
                !isMobile && isMenuPinned && "text-blue-500"
              )}
              title={isMenuPinned ? "Desfixar menu" : "Fixar menu"}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="responsive-text-base font-semibold text-white truncate max-w-[120px] sm:max-w-full">
              {menuItems.find((item) => 
                pathname === item.path || 
                (item.path !== "/dashboard" && pathname?.startsWith(item.path))
              )?.name || "Dashboard"}
            </h1>
          </div>
          
          {/* Right side header elements */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Current time */}
            <div className="text-sm font-medium text-gray-400 hidden md:block">
              {currentTime}
            </div>
            
            {/* Search */}
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Notifications with subtle animation */}
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-white">
              <Bell className="h-5 w-5" />
              <motion.span 
                className="absolute top-2 right-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-600"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.span>
            </Button>
          </div>
        </header>
        
        {/* Main content area with grid background */}
        <motion.main 
          className="flex-1 overflow-auto p-2 sm:p-4 md:p-6 tech-grid-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="responsive-container"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}