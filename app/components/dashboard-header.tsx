/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState, useEffect } from "react"
import { Droplet, Zap, Anchor, Signal, Wifi } from "lucide-react"

// Custom whale + lightning bolt icon
function WhaleZapIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Whale body */}
      <ellipse cx="20" cy="28" rx="14" ry="10" fill="currentColor" opacity="0.9"/>
      <ellipse cx="8" cy="26" rx="4" ry="3" fill="currentColor"/>
      {/* Whale tail */}
      <path d="M34 28 Q40 22 38 16 Q36 22 34 24" fill="currentColor"/>
      <path d="M34 28 Q40 34 38 40 Q36 34 34 32" fill="currentColor"/>
      {/* Eye */}
      <circle cx="12" cy="26" r="1.5" fill="#001219"/>
      {/* Lightning bolt */}
      <path 
        d="M30 8 L24 20 L30 20 L22 36 L28 22 L22 22 L30 8Z" 
        fill="#FFD600"
        stroke="#FFD600"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial time on client only to avoid hydration mismatch
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Simulate occasional connection checks
    const checkConnection = setInterval(() => {
      setIsOnline(Math.random() > 0.05)
    }, 5000)
    return () => clearInterval(checkConnection)
  }, [])

  return (
    <header className="glass-strong sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <WhaleZapIcon className="h-12 w-12 text-primary" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#00E5FF] animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              <span className="text-primary text-glow-cyan">Whale</span>
              <span className="text-[#FFD600] text-glow-yellow">-nergy</span>
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              AI Energy Arbitrage Command Center
            </p>
          </div>
        </div>

        {/* Center Status Indicators */}
        <div className="hidden md:flex items-center gap-6">
          <StatusIndicator 
            icon={<Droplet className="h-4 w-4" />}
            label="Grid Flow"
            value="Optimal"
            color="cyan"
          />
          <StatusIndicator 
            icon={<Zap className="h-4 w-4" />}
            label="Power Mode"
            value="Arbitrage"
            color="yellow"
          />
          <StatusIndicator 
            icon={<Anchor className="h-4 w-4" />}
            label="Anchored"
            value="4 Sites"
            color="cyan"
          />
        </div>

        {/* Right Side - Time and Connection */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-lg text-foreground tabular-nums">
              {currentTime ? currentTime.toLocaleTimeString('en-US', { hour12: false }) : '--:--:--'}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentTime ? currentTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              }) : '---'}
            </div>
          </div>
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isOnline ? 'bg-[#00E5FF]/10' : 'bg-destructive/10'
            }`}>
              {isOnline ? (
                <Wifi className="h-4 w-4 text-primary" />
              ) : (
                <Signal className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-xs font-medium ${
                isOnline ? 'text-primary' : 'text-destructive'
              }`}>
                {isOnline ? 'Live' : 'Reconnecting'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function StatusIndicator({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode
  label: string
  value: string
  color: 'cyan' | 'yellow'
}) {
  const colorClasses = color === 'cyan' 
    ? 'text-primary bg-primary/10' 
    : 'text-[#FFD600] bg-[#FFD600]/10'
  
  return (
    <div className="flex items-center gap-2">
      <div className={`p-2 rounded-lg ${colorClasses}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
