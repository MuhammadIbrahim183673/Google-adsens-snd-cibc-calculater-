# AdSense PPP Tool

A modern web application built with Next.js, TypeScript, and Firebase that helps publishers track their AdSense performance and earn crypto rewards through a Purchase Power Parity (PPP) system.

## Features

- 🔐 **Google Authentication** - Secure login with Google accounts
- 📊 **AdSense Analytics** - Track pageviews, CTR, CPC, and estimated earnings
- 💰 **Crypto Rewards** - Earn XIBC tokens based on engagement
- 👤 **User Profiles** - Manage display name, country, and tier information
- 📈 **Engagement Scoring** - Visual progress tracking with engagement metrics
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔄 **Real-time Updates** - Live data synchronization with Firebase

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **Icons:** Lucide React
- **UI Components:** Custom components with shadcn/ui design system

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone and setup the project:**
   ```bash
   cd adsense-ppp-tool
   npm install
   ```

2. **Configure Firebase:**
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication with Google provider
   - Create a Firestore database
   - Copy your Firebase config

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your Firebase configuration.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Firebase Setup

### Authentication
1. In Firebase Console, go to Authentication > Sign-in method
2. Enable Google as a sign-in provider
3. Add your domain to authorized domains

### Firestore Database
1. Create a Firestore database in production mode
2. Set up the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── progress.tsx
│   └── adsense-ppp-tool.tsx  # Main application component
└── lib/
    └── utils.ts          # Utility functions
```

## Usage

1. **Login:** Sign in with your Google account
2. **Profile Setup:** Add your display name and country
3. **Track Performance:** Input your daily pageviews, CTR, and CPC
4. **Earn Rewards:** Click "Engage to Earn More" to earn XIBC tokens
5. **Monitor Progress:** View your engagement score and earning history

## Tier System

- **Starter:** 0-999 XIBC tokens
- **Builder:** 1,000-4,999 XIBC tokens  
- **Partner:** 5,000+ XIBC tokens

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security

- All Firebase operations require authentication
- User data is isolated by UID
- Environment variables keep API keys secure
- Firestore rules prevent unauthorized access

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
