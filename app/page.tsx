"use client"

import { DashboardHeader } from "@/app/components/dashboard-header"
import { ThunderVoltWidget } from "@/app/components/thundervolt-widget"
import { EnergyPriceChart } from "@/app/components/energy-price-chart"
import { BountyTracker } from "@/app/components/bounty-tracker"
import { ActionAlerts } from "@/app/components/action-alerts"
import { WhaleScaleMetrics } from "@/app/components/whale-scale-metrics"
import { GridTelemetry } from "@/app/components/grid-telemetry"
import { BountyHistory } from "@/app/components/bounty-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Activity, Radar, DollarSign } from "lucide-react"

export default function WhalergyDashboard() {
  return (
    <div className="min-h-screen bg-background deep-sea-gradient">
      {/* Subtle animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FFD600]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <DashboardHeader />
        
        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Whale Scale Metrics - Always Pinned at Top */}
          <section>
            <WhaleScaleMetrics />
          </section>

          {/* Tabbed Interface */}
          <Tabs defaultValue="operations" className="space-y-6">
            <TabsList className="glass-strong w-full md:w-auto p-1 h-auto">
              <TabsTrigger 
                value="operations" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <Activity className="h-4 w-4" />
                <span>Operations</span>
              </TabsTrigger>
              <TabsTrigger 
                value="intelligence" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <Radar className="h-4 w-4" />
                <span>Intelligence</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bounty" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-[#FFD600]/20 data-[state=active]:text-[#FFD600] data-[state=active]:shadow-none"
              >
                <DollarSign className="h-4 w-4" />
                <span>Bounty</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Operations - Energy Chart + ThunderVolte */}
            <TabsContent value="operations" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Energy Price Chart - Main Focus */}
                <div className="lg:col-span-8">
                  <EnergyPriceChart />
                </div>
                
                {/* ThunderVolt Command Center */}
                <div className="lg:col-span-4">
                  <div className="h-[500px]">
                    <ThunderVoltWidget />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Intelligence - Action Alerts + Grid Telemetry */}
            <TabsContent value="intelligence" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Grid Telemetry - Full Width */}
                <div className="lg:col-span-8">
                  <GridTelemetry />
                </div>
                
                {/* Action Alerts */}
                <div className="lg:col-span-4">
                  <div className="h-[600px]">
                    <ActionAlerts />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Bounty - Expanded Savings View */}
            <TabsContent value="bounty" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Historical Charts - Main Area */}
                <div className="lg:col-span-9">
                  <BountyHistory />
                </div>
                
                {/* Current Bounty Status */}
                <div className="lg:col-span-3">
                  <BountyTracker />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Whale-nergy AI Energy Arbitrage Platform v2.4.1 | ThunderVolte Agent Online | 
              <span className="text-primary ml-1">All systems nominal</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
