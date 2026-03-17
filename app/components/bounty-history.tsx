"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { TrendingUp } from "lucide-react"

const history = [
  { date: 'Mon', savings: 3820, trades: 14 },
  { date: 'Tue', savings: 4510, trades: 18 },
  { date: 'Wed', savings: 3190, trades: 11 },
  { date: 'Thu', savings: 5230, trades: 22 },
  { date: 'Fri', savings: 4870, trades: 19 },
  { date: 'Sat', savings: 2940, trades: 9 },
  { date: 'Sun', savings: 3610, trades: 13 },
]

const maxSavings = Math.max(...history.map(d => d.savings))

export function BountyHistory() {
  const total = history.reduce((sum, d) => sum + d.savings, 0)

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#00bfa5]" />
            Weekly Bounty History
          </CardTitle>
          <Badge className="bg-[#00bfa5]/20 text-[#00bfa5] font-mono">
            ${total.toLocaleString()} total
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Daily arbitrage savings — last 7 days</p>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Bar chart */}
        <div className="flex items-end gap-3 h-48">
          {history.map((day) => {
            const heightPct = (day.savings / maxSavings) * 100
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  ${day.savings.toLocaleString()}
                </span>
                <div className="w-full flex flex-col justify-end" style={{ height: '160px' }}>
                  <div
                    className="w-full rounded-t bg-[#00bfa5]/60 group-hover:bg-[#00bfa5] transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.date}</span>
              </div>
            )
          })}
        </div>

        {/* Table */}
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30">
              <tr className="text-xs text-muted-foreground">
                <th className="text-left px-4 py-2">Day</th>
                <th className="text-right px-4 py-2">Savings</th>
                <th className="text-right px-4 py-2">Trades</th>
                <th className="text-right px-4 py-2">Avg/Trade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((day) => (
                <tr key={day.date} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-2 font-medium text-foreground">{day.date}</td>
                  <td className="px-4 py-2 text-right font-mono text-[#00bfa5]">${day.savings.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-mono text-muted-foreground">{day.trades}</td>
                  <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                    ${Math.round(day.savings / day.trades).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
