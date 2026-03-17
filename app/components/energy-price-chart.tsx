"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from "recharts"
import { TrendingUp, TrendingDown, Clock, AlertTriangle } from "lucide-react"

// Generate realistic energy price data
function generatePriceData() {
  const data = []
  const basePrice = 0.12
  
  for (let hour = 0; hour < 24; hour++) {
    // Create realistic price curve with peak hours
    let multiplier = 1
    if (hour >= 6 && hour < 9) multiplier = 1.3 // Morning peak
    if (hour >= 9 && hour < 14) multiplier = 1.1 // Mid-day
    if (hour >= 14 && hour < 19) multiplier = 1.8 // Afternoon peak (highest)
    if (hour >= 19 && hour < 22) multiplier = 1.4 // Evening
    if (hour >= 22 || hour < 6) multiplier = 0.7 // Night (lowest)
    
    const noise = (Math.random() - 0.5) * 0.03
    const price = basePrice * multiplier + noise
    
    data.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      price: Math.round(price * 1000) / 1000,
      isPeak: hour >= 14 && hour < 19
    })
  }
  
  return data
}

export function EnergyPriceChart() {
  const [data, setData] = useState(generatePriceData)
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  
  // Update current hour
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map((item, idx) => {
        if (idx === currentHour) {
          const change = (Math.random() - 0.5) * 0.01
          return { ...item, price: Math.round((item.price + change) * 1000) / 1000 }
        }
        return item
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [currentHour])

  const currentPrice = data[currentHour]?.price || 0
  const previousPrice = data[currentHour > 0 ? currentHour - 1 : 23]?.price || 0
  const priceChange = currentPrice - previousPrice
  const isInPeakZone = currentHour >= 14 && currentHour < 19

  const minPrice = Math.min(...data.map(d => d.price))
  const maxPrice = Math.max(...data.map(d => d.price))
  const avgPrice = data.reduce((acc, d) => acc + d.price, 0) / data.length

  return (
    <Card className="glass h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              Grid Spot Prices
              <Badge 
                variant="outline" 
                className="ml-2 border-primary/50 text-primary animate-pulse-glow"
              >
                LIVE
              </Badge>
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">24-Hour Energy Market Overview</p>
          </div>
          
          {isInPeakZone && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/20 border border-destructive/30">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium text-destructive">Peak Zone Active</span>
            </div>
          )}
        </div>
        
        {/* Price Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <PriceStat 
            label="Current" 
            value={`$${currentPrice.toFixed(3)}`}
            subValue="/kWh"
            trend={priceChange}
            highlight
          />
          <PriceStat 
            label="24h Low" 
            value={`$${minPrice.toFixed(3)}`}
            subValue="/kWh"
            color="cyan"
          />
          <PriceStat 
            label="24h High" 
            value={`$${maxPrice.toFixed(3)}`}
            subValue="/kWh"
            color="red"
          />
          <PriceStat 
            label="Average" 
            value={`$${avgPrice.toFixed(3)}`}
            subValue="/kWh"
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5252" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff5252" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(0, 229, 255, 0.1)" 
                vertical={false}
              />
              
              <XAxis 
                dataKey="hour" 
                stroke="#80deea"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: 'rgba(0, 229, 255, 0.2)' }}
                interval={2}
              />
              
              <YAxis 
                stroke="#80deea"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: 'rgba(0, 229, 255, 0.2)' }}
                tickFormatter={(value: number) => `$${value.toFixed(2)}`}
                domain={['auto', 'auto']}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              {/* Peak Zone Highlight */}
              <ReferenceArea
                x1="14:00"
                x2="19:00"
                ifOverflow="extendDomain"
              />
              
              {/* Current Time Indicator */}
              <ReferenceLine
                x={`${currentHour.toString().padStart(2, '0')}:00`}
                stroke="#FFD600"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: 'NOW',
                  position: 'top',
                  fill: '#FFD600',
                  fontSize: 10,
                  fontWeight: 'bold'
                }}
              />
              
              <Area
                type="monotone"
                dataKey="price"
                stroke="#00E5FF"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: '#00E5FF', 
                  stroke: '#001219', 
                  strokeWidth: 2 
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Spot Price</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="text-xs text-muted-foreground">Peak Zone (14:00-19:00)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#FFD600]" />
            <span className="text-xs text-muted-foreground">Current Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PriceStat({ 
  label, 
  value, 
  subValue, 
  trend, 
  color,
  highlight 
}: { 
  label: string
  value: string
  subValue?: string
  trend?: number
  color?: 'cyan' | 'red'
  highlight?: boolean
}) {
  return (
    <div className={`p-3 rounded-lg ${
      highlight 
        ? 'bg-primary/10 border border-primary/30' 
        : 'bg-secondary/50'
    }`}>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {label}
      </p>
      <p className={`text-xl font-bold font-mono ${
        color === 'cyan' ? 'text-primary' : 
        color === 'red' ? 'text-destructive' : 
        highlight ? 'text-primary text-glow-cyan' : 'text-foreground'
      }`}>
        {value}
        {subValue && <span className="text-xs font-normal text-muted-foreground">{subValue}</span>}
      </p>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-1 ${
          trend >= 0 ? 'text-destructive' : 'text-[#00bfa5]'
        }`}>
          {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span className="text-xs font-medium">
            {trend >= 0 ? '+' : ''}{(trend * 1000).toFixed(1)}
          </span>
        </div>
      )}
    </div>
  )
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null

  const hour = parseInt(label?.split(':')[0] || '0')
  const isPeak = hour >= 14 && hour < 19

  return (
    <div className="glass-strong p-3 rounded-lg border border-primary/30">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold font-mono text-primary">
        ${payload[0].value.toFixed(3)}
        <span className="text-xs font-normal text-muted-foreground">/kWh</span>
      </p>
      {isPeak && (
        <Badge variant="destructive" className="mt-2 text-[10px]">
          Peak Zone
        </Badge>
      )}
    </div>
  )
}
