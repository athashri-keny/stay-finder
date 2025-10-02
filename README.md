# Stay Finder 🏨

A modern property booking platform built with Next.js, designed to help users discover and book accommodation effortlessly.

## ✨ Features

### 🔍 Property Discovery
- **Location-based Search** with debounced API integration for smooth user experience
- **Advanced Filtering** by price, amenities, and property type
- **Interactive Property Listings** with detailed information and high-quality images

### 🔐 Authentication & User Management
- **Secure Authentication** powered by NextAuth.js with multiple providers
- **Email Verification System** with OTP-based account verification
- **JWT Token Management** for secure session handling
- **User Dashboard** for managing bookings and preferences

### 🏠 Booking System
- **Real-time Availability** checking and booking management
- **Date Range Selection** with calendar integration
- **Instant Booking Confirmation** with automated email notifications
- **Booking History** and management tools

### 🎨 User Experience
- **Responsive Design** optimized for all devices
- **Modern UI/UX** with Tailwind CSS styling
- **Fast Performance** with Next.js optimization features
- **Form Validation** using React Hook Form and Zod schemas

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development (97.4% of codebase)
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Efficient form handling
- **Zod** - Schema validation and type safety

### Authentication & Backend
- **NextAuth.js** - Authentication solution with multiple providers
- **JWT** - Secure token-based authentication
- **API Routes** - Backend functionality within Next.js

### Development & Deployment
- **Vercel** - Deployment and hosting platform
- **Git** - Version control
- **ESLint** - Code quality and consistency

## 🏗️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git for version control

### Installation

1. **Clone the repository**
git clone https://github.com/athashri-keny/stay-finder.git
cd stay-finder
2. **Install dependencies*
3. npm install
or
yarn install
or
pnpm install

3. **Environment Setup**
Create a `.env.local` file in the root directory:

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

Database
DATABASE_URL=your_database_url

OAuth Providers (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Email Service
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=587
EMAIL_FROM=noreply@yourdomain.com

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application

## 📁 Project Structure
stay-finder/
├── app/ # Next.js App Router
│ ├── (auth)/ # Authentication pages
│ ├── api/ # API routes
│ └── globals.css # Global styles
├── components/ # Reusable UI components
├── lib/ # Utility functions and configurations
├── public/ # Static assets
├── types/ # TypeScript type definitions
└── README.md


## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

### Deploy Your Own
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/athashri-keny/stay-finder)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Live Demo:** [stay-finder-umber.vercel.app](https://stay-finder-umber.vercel.app) | **Repository:** [athashri-keny/stay-finder](https://github.com/athashri-keny/stay-finder)
