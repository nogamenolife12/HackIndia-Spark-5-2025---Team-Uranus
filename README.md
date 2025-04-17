
# BlockSage - AI-Powered Crypto Risk Advisor

BlockSage is a web application that helps users detect and prevent crypto scams by analyzing wallet contents, transactions, and token contracts in real-time.

## Features

### 1. Authentication System (`/auth`)
- Email/password authentication
- User registration and login functionality
- Protected routes for authenticated users
- Automatic session management

### 2. Dashboard (`/dashboard`)
The main interface where users can:
- Connect their crypto wallets
- View portfolio risk analysis
- Monitor transactions
- Interact with the AI assistant

#### Key Dashboard Components:

**WalletConnect Component**
- Handles wallet connection
- Displays connection status
- Secure connection flow with privacy notices

**RiskSummary Component**
- Overall wallet risk assessment
- Risk score visualization (0-100)
- Quick stats for suspicious tokens, risky contracts, and vulnerable assets
- Real-time risk monitoring

**TokenList Component**
- Detailed list of all tokens in the wallet
- Individual token risk scores
- Risk indicators:
  - Low (green)
  - Medium (yellow)
  - High (orange)
  - Critical (red)
- Token-specific warnings and issues

**RecentTransactions Component**
- Transaction history with risk analysis
- Transaction type indicators (send/receive)
- Risk level for each transaction
- Warning flags for suspicious activities

**ChatAssistant Component**
- AI-powered chat interface
- Answers questions about:
  - Token safety
  - Transaction risks
  - General crypto security
- Suggested questions for quick access
- Real-time analysis responses

### 3. Landing Page (`/`)
- Product introduction
- Feature overview
- Getting started guide
- Call-to-action buttons
- Benefits explanation

## Technical Architecture

### Core Components
1. `AuthProvider`: Manages authentication state
2. `ProtectedRoute`: Guards dashboard access
3. `RedirectIfAuthenticated`: Handles auth flow redirects

### UI Components
- Built with Tailwind CSS for styling
- Uses shadcn/ui component library
- Lucide icons for visual elements
- Responsive design for all screen sizes

### State Management
- React Context for auth state
- Local state for component-level management
- Real-time updates for risk assessments

### Security Features
- Protected routes
- Secure wallet connections
- Private data handling
- Session management

## Getting Started

1. Visit the application at: `/`
2. Create an account at: `/auth`
3. Log in to access the dashboard
4. Connect your wallet to start monitoring

## Color Scheme
- Primary: `#9b87f5` (Purple)
- Background: `#1A1F2C` (Dark)
- Secondary Background: `#32384A`
- Accent: `#8a76e4`
- Risk Colors:
  - Low: Green (`text-green-400`)
  - Medium: Yellow (`text-yellow-400`)
  - High: Orange (`text-orange-400`)
  - Critical: Red (`text-red-400`)

## Best Practices
- Always review transaction warnings
- Check token risk scores before trading
- Use the AI assistant for detailed analysis
- Keep wallet connection secure
- Regular portfolio risk assessment

# Read it guys
