# InstaPoint

## Overview

**InstaPoint** is an AI-powered presentation platform that transforms how slides are created and delivered, merging real-time speech-to-slide generation with advanced audience engagement analytics. Built for presenters who want to captivate their audience effortlessly, InstaPoint leverages cutting-edge AI, blockchain incentives, and a modern tech stack to deliver a next-generation experience.

With **Sonic**’s high-performance blockchain, **DAbridge** for seamless data bridging, and **ZerePy** for agent-driven automation, InstaPoint generates dynamic slides, tracks audience engagement in real time, and rewards participation through tokenized ecosystems. Whether you’re a tutor, TA, or professional presenter, InstaPoint empowers you with instant feedback and adaptive content delivery.

## Features

- **Real-Time Slide Generation**: Speak naturally, and AI (powered by OpenAI’s GPT and Google’s Gemini) creates and updates PowerPoint-style slides on the fly.
- **Audience Engagement Analytics**: Tracks facial expressions, audio patterns, and engagement metrics via real-time video/audio feeds, offering actionable insights.
- **Blockchain Rewards**: Uses Sonic-based smart contracts (`PresentationNFT` and `PresentationToken`) to tokenize presentations and reward audience participation with **S tokens**.
- **Modern UI**: Built with **Next.js**, **Tailwind CSS**, and **shadcn/ui** components for a responsive, polished experience.
- **Adaptive Learning**: Continuously refines suggestions based on historical data and audience responses.
- **Scalable Architecture**: Utilizes WebSocket connections for live updates and integrates services for face analysis, audio processing, and blockchain interactions.

## Why InstaPoint?

Presentations often suffer from static content, disengaged audiences, and delayed feedback. InstaPoint solves this by:

- Simplifying slide creation with AI-driven automation.
- Providing real-time analytics to adapt delivery instantly.
- Gamifying engagement with Sonic’s token economy, ensuring active participation.

## Tech Stack

- **Frontend**:
  - **Next.js**: React framework for a responsive UI.
  - **Tailwind CSS**: Utility-first styling.
  - **shadcn/ui**: Pre-built, customizable components.
- **AI & Analytics**:
  - **OpenAI GPT**: Slide content generation.
  - **Google Gemini**: Real-time audience analysis and suggestions.
- **Backend & Real-Time**:
  - **WebSocket**: Live updates for slides and analytics.
  - **DAbridge**: Bridges off-chain audience data to Sonic’s blockchain for secure verification.
- **Blockchain**:
  - **Sonic**: EVM-compatible L1 blockchain (10,000 TPS, sub-second finality) for deploying `PresentationNFT` and `PresentationToken` contracts.
  - **ZerePy**: Manages blockchain interactions and automates token distribution via AI agents.
- **Services**: Face analysis, audio processing, and engagement scoring.

## How It Works

1. **Start a Presentation**: Log into InstaPoint, click "Start Presentation," and speak your content.
2. **AI Slide Generation**: The AI listens, generating customizable slides in real time (e.g., toggle themes like "Modern Teal").
3. **Audience Analytics**: WebSocket streams deliver live metrics—e.g., "Spencer: dark hair, black t-shirt, taking notes"—using video/audio analysis.
4. **Engagement Rewards**: Sonic smart contracts mint `PresentationToken` based on participation, tracked via DAbridge and distributed by ZerePy agents.
5. **Real-Time Adaptation**: AI adjusts slides based on audience reactions, ensuring maximum engagement.

## Sonic Integration

- **Tokenization**: `PresentationNFT` tracks unique presentations; `PresentationToken` rewards attendees with **S tokens**.
- **Speed**: Sonic’s 10,000 TPS ensures instant token minting and distribution.
- **Verification**: Contracts are verified on [SonicScan](https://sonicscan.org), ensuring transparency.

## DAbridge Integration

**DAbridge** connects off-chain engagement data (e.g., audience metrics) to Sonic’s blockchain:

- Streams real-time analytics to smart contracts.
- Ensures data integrity for token reward calculations.

## ZerePy Integration

**ZerePy** powers automation and blockchain interactions:

- **AI Agents**: Manage token distribution (`send-sonic-token`) and track balances (`get-sonic-balance`).
- **Real-Time Actions**: Execute swaps (`swap-sonic`) if needed, adapting rewards dynamically.

## Getting Started

### Prerequisites

```bash
node >= 22
pnpm >= 9.14.1
```

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/instapoint.git
cd instapoint
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables (see below).

4. Run the development server:

```bash
pnpm run dev
```

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`. Key variables include:

- `NEXT_PUBLIC_SONIC_RPC_URL`: Sonic RPC endpoint (default: `https://rpc.soniclabs.com`)
- `SONIC_PRIVATE_KEY`: Wallet private key for Sonic transactions
- `OPENAI_API_KEY`: For GPT-powered slide generation
- `GOOGLE_GEMINI_KEY`: For audience analytics
- `DABRIDGE_API_KEY`: For data bridging to Sonic
- `ZEREPY_CONFIG_PATH`: Path to ZerePy agent config (e.g., `zerepy-config.json`)

## Smart Contracts

- **PresentationNFT**: Tracks unique presentations as NFTs on Sonic.
- **PresentationToken**: ERC-20 token for rewarding engagement.
- Deployed on Sonic (example address: `0xYourContractAddress`—update post-deployment).

## Demo

1. Visit the landing page and click "Start Presentation."
2. Generate slides (e.g., "The Importance of Trees").
3. Customize themes and layouts.
4. Present and watch real-time analytics populate (e.g., "Anish: nodding, engaged").
5. Earn Sonic **S tokens** based on participation!

## Use Cases

- **Education**: Tutors monitor student attention in real time.
- **Conferences**: Presenters adapt talks dynamically.
- **Workshops**: Reward active participants with tokens.

## Contributing

Follow this commit style for changelog automation:

- `feat: add Sonic token rewards` → 🚀 Features
- `fix: resolve WebSocket latency` → 🐛 Bug Fixes
- `docs: update README` → 📝 Documentation
- Example:

```bash
git commit -m "feat: integrate DAbridge for analytics"
```

## Future Plans

- Add multi-language slide generation.
- Enhance analytics with sentiment analysis.
- Expand Sonic token utility (e.g., staking for premium features).

## License

MIT License

## Acknowledgments

Built for the **Sonic DeFAI Hackathon**. Thanks to Sonic, DAbridge, and ZerePy for powering this innovation!
