# Compass II - Production Order Management System

A modern web application for managing production orders at Compass II, built with Vite, React, TypeScript, and Supabase.

![Compass II Screenshot](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&h=600)

## Features

- 🔐 Secure Authentication
- 🌐 Multi-language Support (English & Vietnamese)
- 📝 Production Order Management
- 📊 Bulk Operations Support
- 📈 Data Export Capabilities
- 👥 Role-based Access Control
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router DOM
  - React Hook Form
  - Zod (Form Validation)
  - Zustand (State Management)

- **Backend:**
  - Supabase (Database & Authentication)
  - PostgreSQL
  - Row Level Security
  - Stored Procedures

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nminh185/compass.git
cd compass
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── data/          # Static data and configurations
├── hooks/         # Custom React hooks
├── lib/           # Library configurations
├── pages/         # Page components
├── store/         # Zustand store definitions
├── translations/  # i18n translations
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Features in Detail

### Authentication
- Email/Password authentication
- Protected routes
- Role-based access control

### Production Order Management
- Create/Update individual orders
- Bulk order updates
- Order location tracking
- Export data to Excel

### Internationalization
- English and Vietnamese language support
- Dynamic font switching based on language
- Localized date formats

### Admin Features
- Delete production orders
- Mass updates
- Data export capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.io/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide Icons](https://lucide.dev/) for the beautiful icons