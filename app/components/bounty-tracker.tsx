"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Battery, Zap, DollarSign, TrendingUp } from "lucide-react"

export function BountyTracker() {
  const [savings, setSavings] = useState(1247.83)
  const [batteryLevel, setBatteryLevel] = useState(73)
  const [isCharging, setIsCharging] = useState(false)

  // Simulate savings increasing
  useEffect(() => {
    const interval = setInterval(() => {
      setSavings(prev => prev + (Math.random() * 0.5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Simulate battery fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours()
      // Charge during off-peak (night), discharge during peak
      const isPeakHour = hour >= 14 && hour < 19
      
      setBatteryLevel(prev => {
        if (isPeakHour) {
          setIsCharging(false)
          return Math.max(20, prev - (Math.random() * 2))
        } else {
          setIsCharging(true)
          return Math.min(95, prev + (Math.random() * 1.5))
        }
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-[#FFD600]" />
          Bounty Tracker
        </CardTitle>
        <p className="text-xs text-muted-foreground">Real-time arbitrage earnings</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Total Savings */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#FFD600]/20 to-[#FFD600]/5 border border-[#FFD600]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Savings Today</span>
            <TrendingUp className="h-4 w-4 text-[#00bfa5]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[#FFD600] text-glow-yellow font-mono">
              ${savings.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#00bfa5] animate-pulse" />
            <span className="text-xs text-[#00bfa5]">+$0.47/min avg</span>
          </div>
        </div>

        {/* Battery Charge */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className={`h-5 w-5 ${
                batteryLevel > 60 ? 'text-primary' : 
                batteryLevel > 30 ? 'text-[#FFD600]' : 'text-destructive'
              }`} />
              <span className="text-sm font-medium text-foreground">Battery Charge</span>
            </div>
            <div className="flex items-center gap-2">
              {isCharging && (
                <Zap className="h-4 w-4 text-[#FFD600] animate-pulse" />
              )}
              <span className={`text-2xl font-bold font-mono ${
                batteryLevel > 60 ? 'text-primary' : 
                batteryLevel > 30 ? 'text-[#FFD600]' : 'text-destructive'
              }`}>
                {batteryLevel.toFixed(0)}%
              </span>
            </div>
          </div>
          
          {/* Custom Battery Bar */}
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${batteryLevel}%`,
                background: batteryLevel > 60 
                  ? 'linear-gradient(90deg, #00E5FF, #00bfa5)' 
                  : batteryLevel > 30 
                    ? 'linear-gradient(90deg, #FFD600, #ff9800)'
                    : 'linear-gradient(90deg, #ff5252, #d32f2f)',
                boxShadow: batteryLevel > 60 
                  ? '0 0 10px rgba(0, 229, 255, 0.5)' 
                  : batteryLevel > 30
                    ? '0 0 10px rgba(255, 214, 0, 0.5)'
                    : '0 0 10px rgba(255, 82, 82, 0.5)'
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Reserve: 20%</span>
            <span>{isCharging ? 'Charging from grid' : 'Discharging to offset peak'}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <QuickStat label="Cycles Today" value="4.2" />
          <QuickStat label="Efficiency" value="94.7%" highlight />
          <QuickStat label="kWh Stored" value="847" />
          <QuickStat label="Peak Avoided" value="3.1h" highlight />
        </div>
      </CardContent>
    </Card>
  )
}

function QuickStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-lg ${highlight ? 'bg-primary/10' : 'bg-secondary/50'}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold font-mono ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  )
}
