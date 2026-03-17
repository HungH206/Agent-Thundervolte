"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { 
  Activity, 
  Radio, 
  Gauge, 
  Thermometer,
  Waves,
  Signal,
  CircleDot
} from "lucide-react"

interface TelemetryData {
  frequency: number
  voltage: number
  loadFactor: number
  temperature: number
  signalStrength: number
  latency: number
}

interface SiteStatus {
  name: string
  status: 'online' | 'warning' | 'offline'
  load: number
  battery: number
}

export function GridTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    frequency: 60.00,
    voltage: 480.2,
    loadFactor: 72,
    temperature: 42,
    signalStrength: 98,
    latency: 12
  })

  const [sites, setSites] = useState<SiteStatus[]>([
    { name: 'Site Alpha', status: 'online', load: 78, battery: 85 },
    { name: 'Site Beta', status: 'online', load: 65, battery: 72 },
    { name: 'Site Gamma', status: 'warning', load: 92, battery: 45 },
    { name: 'Site Delta', status: 'online', load: 54, battery: 91 },
  ])

  // Simulate telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        frequency: 59.95 + Math.random() * 0.1,
        voltage: 478 + Math.random() * 4,
        loadFactor: Math.min(100, Math.max(40, prev.loadFactor + (Math.random() - 0.5) * 5)),
        temperature: Math.min(65, Math.max(35, prev.temperature + (Math.random() - 0.5) * 2)),
        signalStrength: Math.min(100, Math.max(85, prev.signalStrength + (Math.random() - 0.5) * 3)),
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() - 0.5) * 5))
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Simulate site updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSites(prev => prev.map(site => ({
        ...site,
        load: Math.min(100, Math.max(30, site.load + (Math.random() - 0.5) * 8)),
        battery: Math.min(100, Math.max(20, site.battery + (Math.random() - 0.5) * 3)),
        status: site.load > 90 ? 'warning' : 'online'
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Radio className="h-5 w-5 text-primary animate-pulse" />
            Grid Telemetry
            <Badge variant="outline" className="ml-auto border-primary/50 text-primary text-xs">
              LIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <TelemetryGauge 
              icon={Waves}
              label="Grid Frequency"
              value={telemetry.frequency.toFixed(2)}
              unit="Hz"
              status={Math.abs(telemetry.frequency - 60) < 0.05 ? 'normal' : 'warning'}
            />
            <TelemetryGauge 
              icon={Gauge}
              label="Bus Voltage"
              value={telemetry.voltage.toFixed(1)}
              unit="V"
              status={telemetry.voltage > 475 && telemetry.voltage < 485 ? 'normal' : 'warning'}
            />
            <TelemetryGauge 
              icon={Activity}
              label="Load Factor"
              value={telemetry.loadFactor.toFixed(0)}
              unit="%"
              status={telemetry.loadFactor < 85 ? 'normal' : 'warning'}
            />
            <TelemetryGauge 
              icon={Thermometer}
              label="Inverter Temp"
              value={telemetry.temperature.toFixed(0)}
              unit="°C"
              status={telemetry.temperature < 55 ? 'normal' : 'warning'}
            />
            <TelemetryGauge 
              icon={Signal}
              label="Signal"
              value={telemetry.signalStrength.toFixed(0)}
              unit="%"
              status={telemetry.signalStrength > 90 ? 'normal' : 'warning'}
            />
            <TelemetryGauge 
              icon={CircleDot}
              label="Latency"
              value={telemetry.latency.toFixed(0)}
              unit="ms"
              status={telemetry.latency < 30 ? 'normal' : 'warning'}
            />
          </div>
        </CardContent>
      </Card>

      {/* Site Status Grid */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#FFD600]" />
            Site Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sites.map(site => (
              <SiteStatusCard key={site.name} site={site} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TelemetryGauge({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  status 
}: { 
  icon: React.ElementType
  label: string
  value: string
  unit: string
  status: 'normal' | 'warning'
}) {
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      status === 'normal' 
        ? 'bg-secondary/30 border-border' 
        : 'bg-destructive/10 border-destructive/30'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-4 w-4 ${status === 'normal' ? 'text-primary' : 'text-destructive'}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold font-mono ${
          status === 'normal' ? 'text-foreground' : 'text-destructive'
        }`}>
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}

function SiteStatusCard({ site }: { site: SiteStatus }) {
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      site.status === 'online' 
        ? 'bg-secondary/30 border-border' 
        : site.status === 'warning'
          ? 'bg-[#FFD600]/5 border-[#FFD600]/30'
          : 'bg-destructive/10 border-destructive/30'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${
            site.status === 'online' ? 'bg-[#00bfa5]' : 
            site.status === 'warning' ? 'bg-[#FFD600]' : 'bg-destructive'
          } animate-pulse`} />
          <span className="font-medium text-foreground">{site.name}</span>
        </div>
        <Badge 
          variant="outline" 
          className={`text-xs capitalize ${
            site.status === 'online' ? 'border-[#00bfa5]/50 text-[#00bfa5]' :
            site.status === 'warning' ? 'border-[#FFD600]/50 text-[#FFD600]' :
            'border-destructive/50 text-destructive'
          }`}
        >
          {site.status}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Load</span>
            <span className={`font-mono ${site.load > 85 ? 'text-[#FFD600]' : 'text-foreground'}`}>
              {site.load.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${site.load}%`,
                background: site.load > 85 ? '#FFD600' : '#00E5FF'
              }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Battery</span>
            <span className="font-mono text-foreground">{site.battery.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                width: `${site.battery}%`,
                background: site.battery > 50 ? '#00bfa5' : site.battery > 25 ? '#FFD600' : '#ff5252'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
