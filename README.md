# Movie Theater Website

A modern, responsive movie theater website built with React.js and Tailwind CSS. This website allows users to browse movies, view movie details, book tickets, and more.

## Features

- Responsive design that works on all devices
- Movie browsing with filtering and sorting options
- Movie details page with synopsis, cast, and trailer
- Ticket booking system with seat selection
- User authentication (login/register)
- About and Contact pages
- Modern UI with Tailwind CSS

## Screenshots

The design is based on the provided mockups for:
- Home page
- Movies page
- Movie detail page
- Login/Register pages
- About page
- Contact page
- Ticket booking page

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install the dependencies:

```bash
npm install
```

## Running the Development Server

To start the development server, run:

```bash
npm start
```

This will start the application on [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production build, run:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Project Structure

```
movie-website/
├── public/             # Public assets
├── src/                # Source files
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── App.js          # Main App component
│   └── index.js        # Entry point
├── package.json        # Dependencies and scripts
└── tailwind.config.js  # Tailwind CSS configuration
```

## Technologies Used

- React.js - Frontend library
- React Router - Navigation
- Tailwind CSS - Styling
- PostCSS - CSS processing

## Future Enhancements

- Integration with a backend API for real data
- User profiles and saved preferences
- Online payment processing
- Movie ratings and reviews
- Admin dashboard for content management

## License

This project is licensed under the MIT License - see the LICENSE file for details.
