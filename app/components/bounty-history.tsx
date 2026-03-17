"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts"

// Generate historical savings data
const generateHistoricalData = () => {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const baseSavings = 800 + Math.random() * 600
    const peakSavings = baseSavings * (0.4 + Math.random() * 0.3)
    const offPeakSavings = baseSavings - peakSavings
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: baseSavings,
      peak: peakSavings,
      offPeak: offPeakSavings,
      target: 1000
    })
  }
  return data
}

// Generate weekly breakdown
const generateWeeklyData = () => {
  return [
    { day: 'Mon', savings: 1124, cycles: 4.2 },
    { day: 'Tue', savings: 987, cycles: 3.8 },
    { day: 'Wed', savings: 1356, cycles: 5.1 },
    { day: 'Thu', savings: 1089, cycles: 4.0 },
    { day: 'Fri', savings: 1234, cycles: 4.7 },
    { day: 'Sat', savings: 756, cycles: 2.9 },
    { day: 'Sun', savings: 689, cycles: 2.6 },
  ]
}

export function BountyHistory() {
  const [historicalData] = useState(generateHistoricalData)
  const [weeklyData] = useState(generateWeeklyData)
  const [todaySavings, setTodaySavings] = useState(1247.83)
  
  // Calculate totals
  const monthTotal = historicalData.reduce((sum, d) => sum + d.total, 0)
  const weekTotal = weeklyData.reduce((sum, d) => sum + d.savings, 0)
  const avgDaily = monthTotal / 30
  const daysAboveTarget = historicalData.filter(d => d.total >= 1000).length

  // Animate today's savings
  useEffect(() => {
    const interval = setInterval(() => {
      setTodaySavings(prev => prev + Math.random() * 0.5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          label="Today's Bounty"
          value={`$${todaySavings.toFixed(2)}`}
          change={+12.4}
          icon={DollarSign}
          highlight
        />
        <SummaryCard 
          label="This Week"
          value={`$${weekTotal.toLocaleString()}`}
          change={+8.2}
          icon={Calendar}
        />
        <SummaryCard 
          label="This Month"
          value={`$${Math.round(monthTotal).toLocaleString()}`}
          change={+15.7}
          icon={TrendingUp}
        />
        <SummaryCard 
          label="Days Above Target"
          value={`${daysAboveTarget}/30`}
          subtext={`Avg: $${avgDaily.toFixed(0)}/day`}
          icon={Target}
        />
      </div>

      {/* 30-Day Historical Chart */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#FFD600]" />
              30-Day Savings History
            </CardTitle>
            <Badge variant="outline" className="border-[#FFD600]/50 text-[#FFD600]">
              Peak vs Off-Peak
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD600" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FFD600" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="offPeakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 229, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#80deea" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={4}
                />
                <YAxis 
                  stroke="#80deea" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 45, 64, 0.95)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    borderRadius: '12px',
                    color: '#e0f7fa'
                  }}
                  formatter={(value: unknown) => [`$${(value as number).toFixed(2)}`, '']}
                />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-muted-foreground text-xs">{value}</span>}
                />
                <ReferenceLine 
                  y={1000} 
                  stroke="#ff5252" 
                  strokeDasharray="5 5" 
                  label={{ value: 'Target', fill: '#ff5252', fontSize: 10, position: 'right' }}
                />
                <Area
                  type="monotone"
                  dataKey="offPeak"
                  name="Off-Peak Savings"
                  stackId="1"
                  stroke="#00E5FF"
                  fill="url(#offPeakGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="peak"
                  name="Peak Arbitrage"
                  stackId="1"
                  stroke="#FFD600"
                  fill="url(#peakGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              This Week Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 229, 255, 0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#80deea" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#80deea" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 45, 64, 0.95)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      borderRadius: '12px',
                      color: '#e0f7fa'
                    }}
                    formatter={(value: unknown) => [`$${(value as number).toFixed(2)}`, 'Savings']}
                  />
                  <Bar 
                    dataKey="savings" 
                    fill="#00E5FF"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-[#00bfa5]" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PerformanceRow label="Avg Daily Savings" value={`$${avgDaily.toFixed(2)}`} target="$1,000" progress={(avgDaily / 1000) * 100} />
            <PerformanceRow label="Total Cycles (Month)" value="127" target="150" progress={84.7} />
            <PerformanceRow label="Peak Capture Rate" value="94.2%" target="95%" progress={94.2} />
            <PerformanceRow label="Grid Efficiency" value="97.8%" target="95%" progress={100} success />
            <PerformanceRow label="Uptime" value="99.97%" target="99.5%" progress={100} success />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SummaryCard({ 
  label, 
  value, 
  change, 
  subtext,
  icon: Icon,
  highlight 
}: { 
  label: string
  value: string
  change?: number
  subtext?: string
  icon: React.ElementType
  highlight?: boolean
}) {
  return (
    <Card className={`glass ${highlight ? 'border-[#FFD600]/30 bg-[#FFD600]/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`h-4 w-4 ${highlight ? 'text-[#FFD600]' : 'text-primary'}`} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold font-mono ${highlight ? 'text-[#FFD600] text-glow-yellow' : 'text-foreground'}`}>
            {value}
          </span>
          {change !== undefined && (
            <span className={`flex items-center text-xs ${change >= 0 ? 'text-[#00bfa5]' : 'text-destructive'}`}>
              {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </span>
          )}
        </div>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </CardContent>
    </Card>
  )
}

function PerformanceRow({ 
  label, 
  value, 
  target, 
  progress,
  success 
}: { 
  label: string
  value: string
  target: string
  progress: number
  success?: boolean
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className={`font-mono font-medium ${success ? 'text-[#00bfa5]' : 'text-foreground'}`}>{value}</span>
          <span className="text-xs text-muted-foreground">/ {target}</span>
        </div>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            background: success ? '#00bfa5' : progress >= 90 ? '#00E5FF' : progress >= 70 ? '#FFD600' : '#ff5252'
          }}
        />
      </div>
    </div>
  )
}
