# 🎬 Cine-Stream - Media Discovery SPA

Cine-Stream is a high-performance, Netflix-lite Single Page Application (SPA) built for discovering movies. Developed as the final deliverable for Sprint 8 (Phase 3 - Core Engineering), this project focuses heavily on **Performance Optimization**, **Client-Side Polish**, and **AI Integration**.

## 🌐 Live Demo
- **Deployed URL:** [Add your Vercel Link Here]
- **Demo Video:** [Add your 3-min QA Video Link Here]

---

## 🚀 Key Features & Sprint Deliverables

### Phase 1: Base Architecture (P0)
- **TMDB API Consumption:** Fetches popular movies and renders them in a high-fidelity CSS Grid.
- **Search Implementation:** A fully functional search bar that queries the TMDB search endpoint.
- **Robust Error Handling:** Gracefully handles missing poster assets with a placeholder UI to prevent grid collapse.

### Phase 2: Performance Mastery & Persistence (P1)
- **Infinite Scroll Architecture:** Deprecated traditional pagination in favor of the native `IntersectionObserver` API. New pages are appended seamlessly without overwriting state.
- **Input Debouncing:** Implemented a custom `useDebounce` hook (500ms delay) to prevent API throttling and unnecessary network requests on every keystroke.
- **State Persistence (Favorites):** Users can favorite movies using the Heart action. This state is managed globally via React Context API and synced with `localStorage`, persisting across page reloads.

### Phase 3: AI Architecture & Asset Optimization (P2)
- **AI Mood Matcher:** Integrated the Google Gemini API (`gemini-3.6-flash`). Users can input a contextual mood (e.g., "I am feeling sad but want an action movie"), which the LLM translates into a single movie title, automatically triggering a TMDB search.
- **Asset Lazy Loading:** All media images utilize the native `loading="lazy"` attribute for optimized initial page load times.

---

## 🛠️ Tech Stack
- **Frontend:** React.js (v18+), Vite
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios (for robust JSON serialization and interceptors)
- **Styling:** Vanilla CSS (CSS Grid & Flexbox for high-fidelity layouts)
- **AI Integration:** Google Gemini API (`generativelanguage.googleapis.com`)
- **State Management:** React Context API + LocalStorage

---

## 📂 Folder Structure
```
src/
├── api/          # Axios instances & API calls (TMDB, Gemini)
├── components/   # Reusable UI (MovieCard, MovieGrid, MoodMatcher, Navbar)
├── context/      # Global State (FavoritesContext)
├── hooks/        # Custom Hooks (useDebounce)
├── pages/        # Route Components (Home, Favorites)
├── styles/       # Global CSS
└── utils/        # Helper functions (LocalStorage logic)
```

---

## ⚙️ Environment Setup & Installation

### Clone the repository:
```bash
git clone https://github.com/your-username/cine-stream.git
cd cine-stream
```

Install dependencies:
```bash
npm install
```

### Configure Environment Variables:
Create a `.env` file in the root directory and add your API keys (refer to `.env.example` if available):
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Run the development server:
```bash
npm run dev
```

## 🧠 AI Debugging & Prompts Log

As per the "Learn, Don't Copy" mandate, all AI pair-programming sessions, architectural decisions, and debugging steps (including API deprecation fixes) are documented in the `Prompts.md` file.

---

Developed with ❤️ for Prodesk IT Sprint 8.

---
