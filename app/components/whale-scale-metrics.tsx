"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Battery, Zap, TrendingDown, Activity } from "lucide-react"

interface Metric {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  color: string
}

export function WhaleScaleMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([])

  useEffect(() => {
    function build(): Metric[] {
      return [
        {
          label: "Grid Price",
          value: `$${(0.08 + Math.random() * 0.18).toFixed(4)}/kWh`,
          sub: "Current spot",
          icon: <Zap className="h-5 w-5" />,
          color: "text-[#FFD600]",
        },
        {
          label: "Battery SOC",
          value: `${(60 + Math.random() * 35).toFixed(1)}%`,
          sub: "State of charge",
          icon: <Battery className="h-5 w-5" />,
          color: "text-primary",
        },
        {
          label: "Active Savings",
          value: `$${(3800 + Math.random() * 800).toFixed(0)}`,
          sub: "Today so far",
          icon: <TrendingDown className="h-5 w-5" />,
          color: "text-[#00bfa5]",
        },
        {
          label: "Load Shifted",
          value: `${(320 + Math.random() * 130).toFixed(0)} kW`,
          sub: "Off-peak redirect",
          icon: <Activity className="h-5 w-5" />,
          color: "text-primary",
        },
      ]
    }
    setMetrics(build())
    const interval = setInterval(() => setMetrics(build()), 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <Card key={m.label} className="glass">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-secondary/50 ${m.color}`}>{m.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className={`text-lg font-bold font-mono ${m.color}`}>{m.value}</p>
                <p className="text-[10px] text-muted-foreground">{m.sub}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
