# AdSense PPP Tool

A comprehensive Purchase Power Parity (PPP) tool for AdSense publishers to track earnings and earn crypto rewards (XIBC) based on engagement. Built with React, Firebase, and Tailwind CSS.

## Features

- 🔐 **Google Authentication** - Secure login with Google
- 📊 **Earnings Calculator** - Calculate AdSense earnings based on pageviews, CTR, and CPC
- 🪙 **Crypto Rewards** - Earn XIBC tokens based on engagement
- 📈 **Progress Tracking** - Visual engagement score with progress bars
- 👤 **User Profiles** - Manage display name, country, and PPP tier
- 📝 **Earnings History** - Track all your earning activities
- 🎯 **Auto-Tier System** - Automatic tier progression (Starter → Builder → Partner)

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Backend**: Firebase (Authentication & Firestore)
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication and set up Google sign-in provider
4. Create a Firestore database
5. Get your Firebase configuration from Project Settings

### 3. Environment Configuration

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Firestore Security Rules

Set up these security rules in your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Getting Started

1. **Login**: Click "Sign in with Google" to authenticate
2. **Profile Setup**: Update your display name and country
3. **Calculate Earnings**: Adjust pageviews, CTR, and CPC to see estimated earnings
4. **Engage to Earn**: Click "Engage to Earn More" to earn XIBC rewards
5. **Track Progress**: Monitor your engagement score and tier progression

### Tier System

- **Starter**: 0 - 999 XIBC
- **Builder**: 1,000 - 4,999 XIBC  
- **Partner**: 5,000+ XIBC

### Data Structure

The app stores user data in Firestore with the following structure:

```javascript
{
  displayName: "User Name",
  country: "Country Name", 
  tier: "Starter|Builder|Partner",
  rewards: 0.00, // Total XIBC earned
  history: [
    {
      date: "MM/DD/YYYY",
      earned: 0.00 // XIBC earned on this date
    }
  ]
}
```

## Development

### Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── card.jsx
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   └── progress.jsx
│   └── AdsensePPPTool.jsx # Main application component
├── lib/
│   ├── firebase.js      # Firebase configuration
│   └── utils.js         # Utility functions
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

### Adding New Features

1. Create new components in `src/components/`
2. Add new utilities in `src/lib/`
3. Update Firestore security rules if needed
4. Test with Firebase emulators for development

## Deployment

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Build and Deploy

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
```

## Security Notes

- Never commit `.env` files to version control
- Use Firestore security rules to protect user data
- Regularly review Firebase authentication settings
- Keep dependencies updated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify Firebase configuration
3. Ensure all environment variables are set correctly
4. Check Firestore security rules