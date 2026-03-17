"use client"

import { useState, useEffect, useRef, SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Send, Zap, Bot, User } from "lucide-react"

// Custom ThunderVolte icon
function ThunderVoltIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 40 40" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Whale silhouette */}
      <ellipse cx="16" cy="22" rx="12" ry="9" fill="currentColor" opacity="0.8"/>
      <ellipse cx="6" cy="20" rx="4" ry="3" fill="currentColor" opacity="0.8"/>
      {/* Tail */}
      <path d="M28 22 Q34 16 32 10 Q30 16 28 18" fill="currentColor" opacity="0.8"/>
      <path d="M28 22 Q34 28 32 34 Q30 28 28 26" fill="currentColor" opacity="0.8"/>
      {/* Lightning bolt overlay */}
      <path 
        d="M24 6 L18 16 L24 16 L16 30 L22 18 L16 18 L24 6Z" 
        fill="#FFD600"
        stroke="#FFD600"
        strokeWidth="0.5"
      />
      {/* Eye glow */}
      <circle cx="9" cy="19" r="2" fill="#00E5FF"/>
      <circle cx="9" cy="19" r="1" fill="white"/>
    </svg>
  )
}

interface Message {
  id: string
  type: 'command' | 'user' | 'system'
  content: string
  timestamp: Date
}

const initialCommands: Message[] = [
  {
    id: '1',
    type: 'system',
    content: 'ThunderVolt online. Deep sea energy protocols activated.',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    type: 'command',
    content: 'Initiating deep dive protocol. Grid prices elevated - switching to battery reserves.',
    timestamp: new Date(Date.now() - 2700000)
  },
  {
    id: '3',
    type: 'command',
    content: 'Peak zone detected at 14:00. Recommend holding battery charge until 18:00 for maximum arbitrage.',
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: '4',
    type: 'command',
    content: 'Surface scan complete. Off-peak window approaching - preparing to recharge batteries at optimal rates.',
    timestamp: new Date(Date.now() - 900000)
  },
]

export function ThunderVoltWidget() {
  const [messages, setMessages] = useState<Message[]>(initialCommands)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Simulate ThunderVolt sending periodic updates
  useEffect(() => {
    const commands = [
      "Energy arbitrage opportunity detected. Spread: $0.08/kWh.",
      "Monitoring grid frequency. Stability index: 98.7%.",
      "Battery thermal status nominal. Efficiency: 94.2%.",
      "Weather pattern analysis complete. Solar input forecast: High.",
      "Deep dive complete. Resurfacing to grid connection.",
      "Whale pod synchronized across 4 industrial sites.",
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newCommand: Message = {
          id: Date.now().toString(),
          type: 'command',
          content: commands[Math.floor(Math.random() * commands.length)],
          timestamp: new Date()
        }
        setMessages(prev => [...prev, newCommand])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate ThunderVolt response
    setTimeout(() => {
      const responses = [
        "Acknowledged. Adjusting energy strategy accordingly.",
        "Command received. Recalculating optimal discharge schedule.",
        "Understood. Updating whale pod coordination parameters.",
        "Affirmative. Deep dive protocols modified.",
        "Processing. Grid arbitrage algorithms updated.",
      ]

      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'command',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-[#FFD600]/20 glow-cyan">
              <ThunderVoltIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#00bfa5] border-2 border-background animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-primary">Thunder</span>
              <span className="text-[#FFD600]">Volt</span>
              <Zap className="h-4 w-4 text-[#FFD600]" />
            </CardTitle>
            <p className="text-xs text-muted-foreground">AI Command Center</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
          <div className="space-y-3">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bot className="h-4 w-4 text-primary" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setInput(e.target.value)}
              placeholder="Send command to ThunderVolt..."
              className="flex-1 bg-secondary border-border focus:border-primary"
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isCommand = message.type === 'command'
  const isSystem = message.type === 'system'
  const isUser = message.type === 'user'

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
        isCommand ? 'bg-primary/20' : isSystem ? 'bg-[#FFD600]/20' : 'bg-secondary'
      }`}>
        {isCommand && <Bot className="h-4 w-4 text-primary" />}
        {isSystem && <Zap className="h-4 w-4 text-[#FFD600]" />}
        {isUser && <User className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-3 py-2 rounded-xl max-w-[85%] ${
          isCommand 
            ? 'bg-primary/10 border border-primary/20 text-foreground' 
            : isSystem 
              ? 'bg-[#FFD600]/10 border border-[#FFD600]/20 text-foreground'
              : 'bg-secondary text-foreground'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 font-mono">
          {message.timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </p>
      </div>
    </div>
  )
}
