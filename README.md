# SportNest

A sports facility booking platform that connects users with available sports facilities in their area.

## Purpose

SportNest makes it easy to find and book sports facilities. Whether you're looking to play badminton, tennis, football, or any other sport, our platform lets you browse available facilities, check real-time availability, and make instant bookings. For facility owners, we provide a simple dashboard to manage their sports facilities and bookings.

## Live URL

https://sport-nest-two.vercel.app

## Features

- Browse and search sports facilities by sport type and location
- Real-time availability checking and booking system
- User authentication with secure login and registration
- Personal booking history and management
- Facility owner dashboard for managing sports facilities
- Add new facilities with pricing and schedule management
- Responsive design that works on all devices
- Smooth animations and modern UI

## NPM Packages Used

- **Next.js** (16.2.9) - React framework for building the application
- **React** (19.2.7) - JavaScript library for UI components
- **React DOM** (19.2.7) - React package for working with the DOM
- **MongoDB** (7.3.0) - Database for storing facilities and bookings
- **Better Auth** (1.6.20) - Authentication system for user login/register
- **Better Auth Mongo Adapter** (1.6.20) - MongoDB integration for Better Auth
- **Framer Motion** (12.40.0) - Animation library for smooth transitions
- **Lucide React** (0.400.0) - Icon library for UI elements
- **React Hot Toast** (2.6.0) - Notification system for user feedback
- **Tailwind CSS** (3.4.4) - CSS framework for styling
- **PostCSS** (8.4.38) - CSS processing tool
- **Autoprefixer** (10.4.19) - Automatically adds browser-specific CSS prefixes
- **ESLint** (9.39.4) - Code quality and linting tool

## Getting Started

### Installation

```bash
npm install
```

### Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Environment Setup

Create a `.env.local` file with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```
