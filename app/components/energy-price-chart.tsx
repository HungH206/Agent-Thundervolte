"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { TrendingUp, TrendingDown, Zap } from "lucide-react"

interface PricePoint {
  hour: string
  price: number
  forecast?: number
}

function generatePriceData(): PricePoint[] {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  return hours.map((h) => ({
    hour: `${String(h).padStart(2, '0')}:00`,
    price: parseFloat((
      0.08 +
      0.06 * Math.sin((h - 6) * Math.PI / 12) +
      (h >= 17 && h <= 21 ? 0.12 : 0) +
      Math.random() * 0.02
    ).toFixed(4)),
    forecast: parseFloat((
      0.08 +
      0.06 * Math.sin((h - 6) * Math.PI / 12) +
      (h >= 17 && h <= 21 ? 0.12 : 0) +
      Math.random() * 0.015
    ).toFixed(4)),
  }))
}

export function EnergyPriceChart() {
  const [data, setData] = useState<PricePoint[]>([])
  const [currentHour] = useState(new Date().getHours())

  useEffect(() => {
    setData(generatePriceData())
    const interval = setInterval(() => setData(generatePriceData()), 30000)
    return () => clearInterval(interval)
  }, [])

  const currentPrice = data[currentHour]?.price ?? 0
  const prevPrice = data[currentHour > 0 ? currentHour - 1 : 0]?.price ?? 0
  const isUp = currentPrice > prevPrice
  const maxPrice = Math.max(...data.map(d => d.price), 0.01)
  const minPrice = Math.min(...data.map(d => d.price), 0)

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#FFD600]" />
            Day-Ahead Energy Prices
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-[#FFD600]/50 text-[#FFD600] font-mono text-xs">
              ${currentPrice.toFixed(4)}/kWh
            </Badge>
            {isUp
              ? <TrendingUp className="h-4 w-4 text-destructive" />
              : <TrendingDown className="h-4 w-4 text-[#00bfa5]" />
            }
          </div>
        </div>
        <p className="text-xs text-muted-foreground">24-hour spot price curve — current hour highlighted</p>
      </CardHeader>

      <CardContent className="flex-1 pt-2">
        <div className="relative h-64 flex items-end gap-1">
          {data.map((point, i) => {
            const heightPct = ((point.price - minPrice) / (maxPrice - minPrice)) * 100
            const isCurrent = i === currentHour
            const isPeak = point.price > 0.18
            return (
              <div key={point.hour} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#FFD600] shadow-[0_0_8px_#FFD600]'
                      : isPeak
                      ? 'bg-destructive/70'
                      : 'bg-primary/50 group-hover:bg-primary/80'
                  }`}
                  style={{ height: `${Math.max(heightPct, 4)}%` }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-popover border border-border rounded px-2 py-1 text-[10px] font-mono whitespace-nowrap">
                    {point.hour} — ${point.price.toFixed(4)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-0">
          {['00:00', '06:00', '12:00', '18:00', '23:00'].map(label => (
            <span key={label} className="text-[10px] text-muted-foreground font-mono">{label}</span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary/50" />
            <span className="text-xs text-muted-foreground">Off-peak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-destructive/70" />
            <span className="text-xs text-muted-foreground">Peak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#FFD600]" />
            <span className="text-xs text-muted-foreground">Current</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
