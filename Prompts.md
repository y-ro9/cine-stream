# AI Debugging & Prompts Log

## 1. API Key Setup
- **Problem:** Vite environment variables not loading in Axios.
- **Prompt:** "How to use import.meta.env in Vite with Axios?"
- **Resolution:** Learned that prefix must be `VITE_` and dev server needs a restart.

## 2. Infinite Scroll
- **Problem:** Data overwriting instead of appending.
- **Prompt:** "React state not appending arrays correctly in intersection observer."
- **Resolution:** Used functional state update `setMovies(prev => [...prev, ...newData])`.

## 3. Gemini API Integration
- **Prompt:** "How to restrict Gemini API to return ONLY a movie title string."
- **Resolution:** Added strict prompt instructions and used regex `replace(/["*']/g, '')` to sanitize the output.

## 4. Gemini API 404 Error Fix & Model Update
- **Problem:** `gemini-1.5-flash` model API call par 404 NOT_FOUND error de raha tha.
- **Debugging:** Used `curl` to list available models via ModelService. Discovered Google retired 1.5 and 2.0 models.
- **Resolution:** Updated the model in `gemini.js` to `gemini-3.6-flash` which is actively supported. 