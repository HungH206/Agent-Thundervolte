# Agent-Thundervolt

A submission for the DigitalOcean Gradient AI Hackathon.

## Overview

THUNDERVOLT is an intelligent decision-support agent for high-consumption businesses (factories and data centers) to minimize energy costs. By analyzing real-time grid spot prices and historical trends, THUNDERVOLT recommends when to consume power, when to draw from industrial batteries, and when to shift heavy loads to off-peak hours.

## The Problem

Energy prices fluctuate quickly based on grid demand, weather, and supply. Businesses often pay peak prices because they lack tools to:

- Predict peak windows early
- Translate grid data into operational actions
- Manage behind-the-meter assets (such as batteries)

## Strategy

The project uses a multi-stage agentic workflow:

- Data ingestion from day-ahead pricing feeds (simulated or historical CSV in demo)
- Analysis engine using an LLM hosted on DigitalOcean Gradient AI
- Persona-driven recommendations from a virtual - Persona-driven recommenefit reporting with projected savings

## Tech Stack

- Frontend: Next.js, React
- AI infrastructure: DigitalOcean Gradient AI
- Storage: DigitalOcean Spaces
- Language: TypeScript (frontend) and Python 3.10+ (analytics/agent workflows)

## Getting Started

From the project root:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Production

```bash
npm run build
npm start
```
