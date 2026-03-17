"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Activity, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Battery, 
  Zap,
  Anchor,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react"

interface ActionAlert {
  id: string
  type: 'dive' | 'surface' | 'charge' | 'discharge' | 'anchor' | 'warning' | 'success'
  title: string
  description: string
  timestamp: Date
  site?: string
}

const iconMap = {
  dive: ArrowDownToLine,
  surface: ArrowUpFromLine,
  charge: Battery,
  discharge: Zap,
  anchor: Anchor,
  warning: AlertTriangle,
  success: CheckCircle2
}

const colorMap = {
  dive: 'text-primary bg-primary/20',
  surface: 'text-[#00bfa5] bg-[#00bfa5]/20',
  charge: 'text-[#FFD600] bg-[#FFD600]/20',
  discharge: 'text-[#ff9800] bg-[#ff9800]/20',
  anchor: 'text-primary bg-primary/20',
  warning: 'text-destructive bg-destructive/20',
  success: 'text-[#00bfa5] bg-[#00bfa5]/20'
}

const initialAlerts: ActionAlert[] = [
  {
    id: '1',
    type: 'dive',
    title: 'Deep Dive Initiated',
    description: 'ThunderVolte commanded a deep dive at 14:00 - Switched to Battery',
    timestamp: new Date(Date.now() - 1800000),
    site: 'Site Alpha'
  },
  {
    id: '2',
    type: 'discharge',
    title: 'Peak Discharge Active',
    description: 'Discharging 450kW to offset grid demand during peak pricing',
    timestamp: new Date(Date.now() - 1500000),
    site: 'Site Beta'
  },
  {
    id: '3',
    type: 'success',
    title: 'Arbitrage Complete',
    description: 'Successfully captured $127.50 spread between off-peak and peak',
    timestamp: new Date(Date.now() - 1200000),
    site: 'Site Alpha'
  },
  {
    id: '4',
    type: 'anchor',
    title: 'Grid Anchor Established',
    description: 'Frequency regulation mode activated for grid stability support',
    timestamp: new Date(Date.now() - 900000),
    site: 'Site Gamma'
  },
  {
    id: '5',
    type: 'warning',
    title: 'Price Spike Detected',
    description: 'Grid prices exceeded $0.25/kWh - maximizing battery discharge',
    timestamp: new Date(Date.now() - 600000)
  },
]

const newAlertTemplates: Omit<ActionAlert, 'id' | 'timestamp'>[] = [
  { type: 'dive', title: 'Deep Dive Protocol', description: 'Submerging below grid dependency threshold', site: 'Site Delta' },
  { type: 'surface', title: 'Resurfacing', description: 'Returning to grid connection for recharge cycle', site: 'Site Alpha' },
  { type: 'charge', title: 'Optimal Charge Window', description: 'Off-peak pricing detected - initiating rapid charge', site: 'Site Beta' },
  { type: 'success', title: 'Savings Milestone', description: 'Daily savings target exceeded by 15%' },
  { type: 'anchor', title: 'Whale Pod Sync', description: 'All 4 sites synchronized for coordinated response', site: 'All Sites' },
]

export function ActionAlerts() {
  const [alerts, setAlerts] = useState<ActionAlert[]>(initialAlerts)

  // Add new alerts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const template = newAlertTemplates[Math.floor(Math.random() * newAlertTemplates.length)]
        const newAlert: ActionAlert = {
          ...template,
          id: Date.now().toString(),
          timestamp: new Date()
        }
        setAlerts(prev => [newAlert, ...prev].slice(0, 10))
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Action Alerts
          </CardTitle>
          <Badge variant="outline" className="border-primary/50 text-primary text-xs">
            {alerts.length} Recent
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">ThunderVolte agent activity log</p>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full max-h-[500px] px-4 pb-4">
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <AlertItem key={alert.id} alert={alert} isNew={index === 0} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function AlertItem({ alert, isNew }: { alert: ActionAlert; isNew: boolean }) {
  const Icon = iconMap[alert.type]
  const colorClass = colorMap[alert.type]

  return (
    <div className={`p-3 rounded-xl border transition-all duration-500 ${
      isNew 
        ? 'bg-primary/5 border-primary/30 animate-in fade-in slide-in-from-top-2' 
        : 'bg-secondary/30 border-border'
    }`}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-foreground truncate">{alert.title}</h4>
            {isNew && (
              <Badge className="bg-primary/20 text-primary text-[10px] px-1.5 py-0">
                NEW
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {alert.description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {alert.timestamp.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </span>
            {alert.site && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border">
                {alert.site}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
