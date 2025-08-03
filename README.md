# AdSense PPP Tool

A modern React-based dashboard for AdSense Pay-Per-Performance tracking with Firebase integration, user authentication, and crypto rewards system.

## Features

- 🔐 **Google Authentication** - Secure login with Google accounts
- 📊 **AdSense Calculator** - Estimate earnings based on pageviews, CTR, and CPC
- 🏆 **Tier System** - Automatic tier assignment (Starter, Builder, Partner)
- 💰 **Crypto Rewards** - Earn XIBC tokens through engagement
- 📈 **Engagement Tracking** - Visual progress bar for user engagement
- 📝 **Earnings History** - Track all your earnings over time
- 👤 **User Profiles** - Manage display name, country, and tier information
- 🔄 **Real-time Updates** - Firebase Firestore integration for live data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Firebase Auth with Google Sign-in
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adsense-ppp-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**

   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/) and get your configuration:

   - Go to Project Settings
   - Add a web app to your project
   - Copy the Firebase config object

4. **Update Firebase Configuration**

   Edit `components/AdsensePPPTool.tsx` and replace the `firebaseConfig` object:

   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   }
   ```

5. **Enable Authentication**

   In Firebase Console:
   - Go to Authentication > Sign-in method
   - Enable Google Sign-in
   - Add your domain to authorized domains

6. **Set up Firestore**

   In Firebase Console:
   - Go to Firestore Database
   - Create database in test mode
   - Set up security rules for user data

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── progress.tsx
│   └── AdsensePPPTool.tsx  # Main application component
├── lib/
│   └── utils.ts             # Utility functions
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Features Explained

### AdSense Calculator
- **Pageviews**: Daily page view count
- **CTR**: Click-through rate percentage
- **CPC**: Cost per click in dollars
- **Earnings**: Calculated as `(pageviews × CTR% × CPC)`

### Tier System
- **Starter**: Default tier for new users
- **Builder**: Unlocked at 1,000 XIBC rewards
- **Partner**: Unlocked at 5,000 XIBC rewards

### Engagement System
- Users can "Engage" to earn additional XIBC tokens
- Engagement score based on pageviews (max 100%)
- Higher engagement = more crypto rewards

### User Data Storage
All user data is stored in Firebase Firestore:
- Profile information (display name, country, tier)
- Rewards balance
- Earnings history
- Authentication state

## Customization

### Styling
The app uses Tailwind CSS with a custom design system. Colors and styling can be modified in:
- `app/globals.css` - CSS variables and base styles
- `tailwind.config.js` - Tailwind configuration

### Components
UI components are built with shadcn/ui and can be customized in the `components/ui/` directory.

### Firebase Rules
Set up Firestore security rules to protect user data:

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

## Environment Variables

For production, consider using environment variables for Firebase configuration:

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.