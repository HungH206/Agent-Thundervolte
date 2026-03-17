"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Zap, Leaf, Gauge, Anchor, TrendingUp, ArrowUpRight } from "lucide-react"

interface MetricData {
  label: string
  value: number
  unit: string
  suffix?: string
  icon: React.ReactNode
  color: 'cyan' | 'yellow' | 'green' | 'white'
  trend?: number
  description: string
}

export function WhaleScaleMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      label: 'Mega-Watts Managed',
      value: 847.3,
      unit: 'MW',
      suffix: '',
      icon: <Zap className="h-6 w-6" />,
      color: 'yellow',
      trend: 12.4,
      description: 'Total power capacity under ThunderVolte control'
    },
    {
      label: 'Carbon Offset',
      value: 2847,
      unit: 'tons',
      suffix: ' CO₂',
      icon: <Leaf className="h-6 w-6" />,
      color: 'green',
      trend: 8.7,
      description: 'Emissions avoided through smart arbitrage'
    },
    {
      label: 'Grid Efficiency',
      value: 94.7,
      unit: '%',
      suffix: '',
      icon: <Gauge className="h-6 w-6" />,
      color: 'cyan',
      trend: 2.1,
      description: 'Overall system optimization rating'
    },
    {
      label: 'Anchored Sites',
      value: 4,
      unit: 'sites',
      suffix: '',
      icon: <Anchor className="h-6 w-6" />,
      color: 'white',
      trend: 0,
      description: 'Industrial locations in the whale pod'
    },
  ])

  // Simulate metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        if (metric.label === 'Mega-Watts Managed') {
          return { ...metric, value: metric.value + (Math.random() - 0.3) * 2 }
        }
        if (metric.label === 'Carbon Offset') {
          return { ...metric, value: metric.value + Math.random() * 0.5 }
        }
        if (metric.label === 'Grid Efficiency') {
          const change = (Math.random() - 0.5) * 0.2
          return { ...metric, value: Math.min(99, Math.max(90, metric.value + change)) }
        }
        return metric
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}
    </div>
  )
}

function MetricCard({ metric }: { metric: MetricData }) {
  const colorClasses = {
    cyan: {
      bg: 'from-primary/20 to-primary/5',
      border: 'border-primary/30',
      icon: 'text-primary bg-primary/20',
      text: 'text-primary text-glow-cyan',
      glow: 'glow-cyan'
    },
    yellow: {
      bg: 'from-[#FFD600]/20 to-[#FFD600]/5',
      border: 'border-[#FFD600]/30',
      icon: 'text-[#FFD600] bg-[#FFD600]/20',
      text: 'text-[#FFD600] text-glow-yellow',
      glow: 'glow-yellow'
    },
    green: {
      bg: 'from-[#00bfa5]/20 to-[#00bfa5]/5',
      border: 'border-[#00bfa5]/30',
      icon: 'text-[#00bfa5] bg-[#00bfa5]/20',
      text: 'text-[#00bfa5]',
      glow: ''
    },
    white: {
      bg: 'from-foreground/10 to-foreground/5',
      border: 'border-foreground/20',
      icon: 'text-foreground bg-foreground/10',
      text: 'text-foreground',
      glow: ''
    }
  }

  const colors = colorClasses[metric.color]

  return (
    <Card className={`glass overflow-hidden ${colors.border} ${colors.glow}`}>
      <CardContent className={`p-5 bg-gradient-to-br ${colors.bg}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${colors.icon}`}>
            {metric.icon}
          </div>
          {metric.trend !== undefined && metric.trend > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#00bfa5]/20 text-[#00bfa5]">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-medium">+{metric.trend}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {metric.label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl lg:text-4xl font-bold font-mono ${colors.text}`}>
              {typeof metric.value === 'number' && metric.value % 1 !== 0 
                ? metric.value.toFixed(1) 
                : Math.round(metric.value).toLocaleString()
              }
            </span>
            <span className="text-sm text-muted-foreground">
              {metric.unit}{metric.suffix}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
            {metric.description}
          </p>
        </div>

        {/* Live indicator */}
        {metric.color !== 'white' && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/50">
            <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${
              metric.color === 'cyan' ? 'bg-primary' :
              metric.color === 'yellow' ? 'bg-[#FFD600]' :
              'bg-[#00bfa5]'
            }`} />
            <span className="text-[10px] text-muted-foreground">Live updating</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
