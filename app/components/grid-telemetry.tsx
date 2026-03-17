"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Radio, Thermometer, Wind, Zap } from "lucide-react"

interface TelemetryRow {
  site: string
  status: 'online' | 'charging' | 'discharging' | 'standby'
  load: number
  battery: number
  temp: number
  freq: number
}

function randomRow(site: string): TelemetryRow {
  const statuses: TelemetryRow['status'][] = ['online', 'charging', 'discharging', 'standby']
  return {
    site,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    load: parseFloat((100 + Math.random() * 400).toFixed(1)),
    battery: parseFloat((40 + Math.random() * 55).toFixed(1)),
    temp: parseFloat((28 + Math.random() * 12).toFixed(1)),
    freq: parseFloat((49.8 + Math.random() * 0.4).toFixed(2)),
  }
}

const statusColor: Record<TelemetryRow['status'], string> = {
  online: 'bg-[#00bfa5]/20 text-[#00bfa5] border-[#00bfa5]/30',
  charging: 'bg-[#FFD600]/20 text-[#FFD600] border-[#FFD600]/30',
  discharging: 'bg-primary/20 text-primary border-primary/30',
  standby: 'bg-secondary text-muted-foreground border-border',
}

export function GridTelemetry() {
  const sites = ['Site Alpha', 'Site Beta', 'Site Gamma', 'Site Delta']
  const [rows, setRows] = useState<TelemetryRow[]>(() => sites.map(randomRow))

  useEffect(() => {
    const interval = setInterval(() => setRows(sites.map(randomRow)), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-foreground flex items-center gap-2">
          <Radio className="h-5 w-5 text-primary" />
          Grid Telemetry
        </CardTitle>
        <p className="text-xs text-muted-foreground">Live readings across all industrial sites</p>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left pb-2">Site</th>
              <th className="text-left pb-2">Status</th>
              <th className="text-right pb-2 hidden sm:table-cell">
                <span className="flex items-center justify-end gap-1"><Zap className="h-3 w-3" />Load</span>
              </th>
              <th className="text-right pb-2">Battery</th>
              <th className="text-right pb-2 hidden md:table-cell">
                <span className="flex items-center justify-end gap-1"><Thermometer className="h-3 w-3" />Temp</span>
              </th>
              <th className="text-right pb-2 hidden md:table-cell">
                <span className="flex items-center justify-end gap-1"><Wind className="h-3 w-3" />Freq</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.site} className="hover:bg-secondary/20 transition-colors">
                <td className="py-3 font-medium text-foreground">{row.site}</td>
                <td className="py-3">
                  <Badge variant="outline" className={`text-[10px] capitalize ${statusColor[row.status]}`}>
                    {row.status}
                  </Badge>
                </td>
                <td className="py-3 text-right font-mono text-muted-foreground hidden sm:table-cell">
                  {row.load} kW
                </td>
                <td className="py-3 text-right font-mono">
                  <span className={row.battery > 70 ? 'text-[#00bfa5]' : row.battery > 40 ? 'text-[#FFD600]' : 'text-destructive'}>
                    {row.battery}%
                  </span>
                </td>
                <td className="py-3 text-right font-mono text-muted-foreground hidden md:table-cell">{row.temp}°C</td>
                <td className="py-3 text-right font-mono text-muted-foreground hidden md:table-cell">{row.freq} Hz</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
