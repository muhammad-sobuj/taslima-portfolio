# Mahmood Fazile - Portfolio Website

A modern, responsive portfolio website built with React, JavaScript, and shadcn/ui components. This project showcases a UI/UX designer's work with a clean, professional design and smooth user experience.

## Features

- **Modern Design**: Clean, professional layout with dark mode support
- **Responsive**: Fully responsive design that works on all devices
- **Multi-page**: Home, Services, About, Portfolio, and Contact pages
- **Interactive Components**: Hover effects, animations, and smooth transitions
- **shadcn/ui**: Built with high-quality, accessible UI components
- **React Router**: Client-side routing for seamless navigation

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful, customizable icons
- **React Router DOM** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mahmood-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── Layout.jsx    # Main layout wrapper
│   └── Navigation.jsx # Navigation component
├── pages/
│   ├── Home.jsx      # Home page
│   ├── Services.jsx  # Services page
│   ├── About.jsx     # About page
│   ├── Portfolio.jsx # Portfolio page
│   └── Contact.jsx   # Contact page
├── lib/
│   └── utils.js      # Utility functions
├── App.jsx           # Main App component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Pages Overview

- **Home**: Hero section with personal introduction and stats
- **Services**: Services offered with client testimonials
- **About**: Personal information, skills, education, and experience
- **Portfolio**: Project showcase with filtering capabilities
- **Contact**: Contact form and information

## Customization

### Colors

The primary color scheme can be customized in `tailwind.config.js`:

```js
colors: {
  primary: "#FD6E0A", // Change this to your preferred color
  // ... other colors
}
```

### Content

Update the content in each page component to match your personal information, projects, and services.

### Images

Replace the placeholder images with your own photos and project screenshots.

## License

This project is open source and available under the [MIT License](LICENSE).
# taslima-portfolio
