"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { DollarSign, TrendingUp, Target } from "lucide-react"

export function BountyTracker() {
  const [savings, setSavings] = useState({ today: 4218, week: 28740, month: 112300 })

  useEffect(() => {
    const interval = setInterval(() => {
      setSavings(prev => ({
        today: prev.today + Math.floor(Math.random() * 15),
        week: prev.week + Math.floor(Math.random() * 15),
        month: prev.month + Math.floor(Math.random() * 15),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const dailyTarget = 5000
  const progress = Math.min((savings.today / dailyTarget) * 100, 100)

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-[#FFD600]" />
          Bounty Tracker
        </CardTitle>
        <p className="text-xs text-muted-foreground">Arbitrage savings captured</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Daily Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Target className="h-3 w-3" /> Daily Target
            </span>
            <span className="text-xs font-mono text-muted-foreground">${savings.today.toLocaleString()} / ${dailyTarget.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD600] rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right">
            <Badge className="bg-[#FFD600]/20 text-[#FFD600] text-xs">{progress.toFixed(1)}% achieved</Badge>
          </div>
        </div>

        {/* Stats */}
        {[
          { label: 'Today', value: savings.today, icon: <DollarSign className="h-4 w-4 text-[#FFD600]" /> },
          { label: 'This Week', value: savings.week, icon: <TrendingUp className="h-4 w-4 text-primary" /> },
          { label: 'This Month', value: savings.month, icon: <TrendingUp className="h-4 w-4 text-[#00bfa5]" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <span className="font-mono font-semibold text-foreground">${value.toLocaleString()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
