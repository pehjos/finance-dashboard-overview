# Personal Finance Wallet Application

A modern, interactive personal finance management application built with Next.js, TypeScript, and Context API for state management.

## 🚀 Features

- **Dashboard Overview**: Real-time financial insights with animated charts and statistics
- **Transaction Management**: Comprehensive transaction history with filtering and search
- **Fund Transfers**: Multi-step transfer flow with contact management
- **Savings Goals**: Interactive goal tracking with progress visualization
- **Notifications**: Real-time alerts and financial tips
- **Responsive Design**: Mobile-first approach with smooth animations

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context API with useReducer
- **Testing**:Vitest, React Testing Library
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── transactions/   # Transaction-related components
│   ├── transfer/       # Fund transfer components
│   ├── goals/          # Savings goals components
│   ├── notifications/  # Notification components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── __tests__/          # Test files
\`\`\`

## 🧪 Testing

The application includes comprehensive unit tests with Jest and React Testing Library:

- **Context API tests**: State management and action creators
- **Component tests**: UI components and user interactions
- **Hook tests**: Custom hooks functionality
- **Utility tests**: Helper functions and validators

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Test Coverage

The project maintains high test coverage with thresholds:
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## 🎨 State Management

The application uses React Context API with useReducer for predictable state management:

### AppContext Features

- **User Management**: User profile and authentication state
- **Financial Data**: Balance, transactions, and spending categories
- **UI State**: Loading states, error handling, and notifications
- **Action Creators**: Simplified state updates with type safety

### Custom Hooks

- `useTransactions`: Transaction management and calculations
- `useContacts`: Contact management for transfers
- `useAppContext`: Main context hook with type safety

## 🎯 Key Components

### DashboardOverview
- Real-time financial statistics
- Animated counters and progress bars
- Interactive spending breakdown
- Recent transaction preview

### TransactionHistory
- Advanced filtering and search
- Pagination with smooth transitions
- Transaction detail modals
- Export functionality

### FundTransfer
- Multi-step transfer wizard
- Contact management with favorites
- Real-time validation
- Success/failure feedback with animations

## 🔧 Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
\`\`\`

## 🎨 Design System

### Animation Classes

- `animate-fadeIn`: Fade in animation
- `animate-slideInFromLeft`: Slide in from left
- `animate-slideInFromRight`: Slide in from right
- `animate-scaleIn`: Scale in animation
- `hover-lift`: Hover lift effect
- `hover-scale`: Hover scale effect
- `hover-glow`: Hover glow effect

### Color Palette

- Primary: Blue gradient (blue-600 to purple-600)
- Success: Green (green-500, green-600)
- Warning: Amber (amber-500, amber-600)
- Error: Red (red-500, red-600)
- Neutral: Slate (slate-50 to slate-900)

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized animations for mobile

## 🔒 Type Safety

Full TypeScript implementation with:
- Strict type checking
- Interface definitions for all data structures
- Type-safe Context API
- Comprehensive error handling

## 🚀 Performance

- Optimized animations with CSS transforms
- Lazy loading for heavy components
- Memoized calculations with useMemo
- Efficient re-renders with useCallback

## 📈 Future Enhancements

- [ ] Real-time data synchronization
- [ ] Advanced analytics and insights
- [ ] Investment portfolio tracking
- [ ] Bill reminder system
- [ ] Multi-currency support
- [ ] Dark mode theme
- [ ] PWA capabilities
- [ ] Biometric authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
