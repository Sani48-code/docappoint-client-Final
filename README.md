# DocAppoint – Doctor Appointment Manager

Live Site: [your-live-url]

## Features

- Browse & filter top-rated doctors by specialty, fee, and experience
- JWT-based secure auth with Google social login
- Book, update & cancel appointments from a personal dashboard
- Real-time search & sort on All Appointments page
- Fully responsive — mobile, tablet, and desktop
- Smooth animations (Framer Motion + AOS)
- Dark/Light theme toggle
- SEO-ready with React Helmet Async metadata on every page

## Tech Stack

- React 18 + Vite
- Tailwind CSS v3
- React Router DOM v6
- TanStack React Query v5
- Axios
- Framer Motion + AOS
- Swiper.js
- React Hook Form
- React Hot Toast
- React Helmet Async

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

```env
VITE_API_URL=http://localhost:5000
```

## Backend API Endpoints Expected

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| POST   | /auth/register    | Register new user   |
| POST   | /auth/login       | Login + JWT token   |
| GET    | /doctors          | List all doctors    |
| GET    | /doctors?top=true | Top-rated doctors   |
| GET    | /doctors/:id      | Doctor details      |
| POST   | /bookings         | Create booking      |
| GET    | /bookings?email=X | User bookings       |
| PATCH  | /bookings/:id     | Update booking      |
| DELETE | /bookings/:id     | Delete booking      |

## Design Colors

- Primary: #0EA5E9 (sky blue)
- Accent: #06B6D4 (cyan/teal)
- Dark: #0A0F2C (deep navy)
