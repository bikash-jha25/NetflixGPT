# Netflix GPT

- Vite configuration
- Configured TailwindCSS
- Header(LOGO position)
- Routing
- SignIn/SignUp Form
- Form Validation
- useRef Hook
- Firebase Set Up
- Deploying app to production
- Create signUp user Account in Firebase
- Implement Sign In User API
- Created Redux Store With userSlice
- Implemented SignOut
- Updated Profile APi (with Update Store)
- BugFix: Sign up user displayName update
- BugFix: if the useris not logged in Redirect /browse to Login Page and vice-versa
- Unsubscribed to the onAuthStateChange callback
- Regiter TMDB API & create an app & get access token
- Get Data from THDB now playing movies list API
- Custom Hook for Now Playing Movies
- Create moviestice
- Update Store with movies Data
- Planning for Maincontauiner & secondary container
- Fetch Data for Trailer Video
- Update Store with Trailer Video Data
- Embedded the Yotube video and make it autoptay and mute
- Tailwind Classes to make Main Container look awesome
- Build Secondary Component
- Build Movie List
- Build Movie Card
- TMDB Image CDN URL
- Made the Browsre page amazing with Tailwind CSS
- usePopularMovies Custom hook and Other Movie Hooks
- GPT Search Container
- GPT Search Bar
- Multi Language Feature

# Features

- Login/Sign Up
  - Sign In /Sign up Form
  - redirect to Browse Page
- Browse (after authentication)
  - Header
  - Main Movie
    - Tailer in Background
    - Titte & Description
    - MovieSuggestions
      - MovieLists \* N
- NetflixGPT
  - Search Bar
  - Movie Suggestionsl

  # Architecture
  - 1.SignIn/SignUp Form
    - Your page actually has layers.
    - Think like this:
    - Container (relative)
    - │
    - ├── Background Image (absolute)
    - ├── Overlay (absolute)
    - ├── Header (absolute)
    - └── Form (absolute)

  - 2.Browse Page Design
    - MainContainer
      - VideoBackground
      - VideoTitle
    - SecondaryContainer
      - MovieList \* n
      - cards \* n

  # How to Get Gemini IN YOUR PROJECT
    - 1. Get YOUR API-KEY and save in gemini.jsx inside utils
    - 2. then inside your terminal run the command  npm install @google/genai
    - 3. Inside same gemini.jsx inside utils
         import { GoogleGenAI } from "@google/genai";
         const ai = new GoogleGenAI({apiKey: "GEMINI_API_KEY"});
         export default ai;
    - 4. 
