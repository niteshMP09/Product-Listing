# ✨ Searchspring Product Listing Page (PLP)

A **production-quality ecommerce Product Listing Page (PLP)** built using **React + TypeScript + Tailwind CSS** with the **Searchspring Search API**.

This project was developed as a frontend engineering assignment focused on **frontend architecture, responsive UI/UX, state management, API integration, accessibility, performance optimization, and maintainable code structure**.

---

## ⚙️ Overview

- 🧱 **Architecture**: Component-based React application with reusable hooks and UI components
- ⚛️ **Frontend**: React + TypeScript + Vite
- 🎨 **Styling**: Tailwind CSS
- 🔄 **Routing**: React Router
- 🧠 **Server State**: TanStack React Query
- 🔎 **Search & Product Data**: Searchspring Search API
- 🧩 **State Approach**: URL query parameters + React local state
- 🛡️ **Error Handling**: API error states + React Error Boundary + 404 route

---

## 🧠 Key Features

### 🔍 Search Experience

- Search products using the Searchspring API
- Search using:
  - Search button
  - Enter key
- Debounced search input
- Search query persisted in the URL
- Search state survives page refresh

### 🛍️ Product Listing

- Responsive product grid
- Product image
- Product name
- Sale price
- Conditional MSRP display
- MSRP shown with strikethrough when it is greater than the sale price
- Responsive layout for desktop, tablet, and mobile

### 🔢 Pagination

- Previous / Next navigation
- Page numbers
- Current page highlighting
- Disabled previous/next states
- Pagination above and below product results
- Pagination state persisted in the URL

### ↕️ Sorting

- Dynamic sorting options from the API
- Sort dropdown on desktop
- Mobile sorting UI
- Sorting persisted in the URL
- Sorting automatically resets pagination to page 1

### 🧰 Filtering

- Dynamic facets from Searchspring
- Multi-select filters
- Selected filter state
- Active filter pills
- Remove individual filters
- Clear all filters
- Desktop filter sidebar
- Mobile filter drawer
- Filter state persisted in the URL
- Filter values maintained during pagination and sorting

### 📱 Responsive UX

- Desktop navigation
- Mobile navigation menu
- Mobile filter drawer
- Mobile sorting controls
- Responsive product grid
- Responsive spacing and typography

### 🛡️ Error & Empty States

- Loading skeletons
- Empty results state
- API/network error state
- Retry functionality
- React Error Boundary for unexpected rendering errors
- Dedicated 404 / Not Found page

### ♿ Accessibility

- Semantic HTML
- Keyboard-friendly controls
- Accessible navigation labels
- ARIA labels for icon-only buttons
- `aria-current` for active pagination
- Visible focus states
- Proper disabled button states
- Accessible mobile navigation and filter controls

---

## 🧩 Tech Stack

### 🎨 Frontend

| Technology              | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| ⚛️ React                | Component-based UI development                                   |
| 🔷 TypeScript           | Static typing and safer application development                  |
| ⚡ Vite                 | Development server and production build tooling                  |
| 🎨 Tailwind CSS         | Utility-first responsive styling                                 |
| 🧭 React Router         | Client-side routing and URL state                                |
| 🧠 TanStack React Query | Server-state management, caching, retries, and request lifecycle |

### 🔎 API

| Technology              | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| Searchspring Search API | Product search, sorting, pagination, and facets      |
| `resultsFormat=native`  | JSON response format                                 |
| Site ID `scmq7n`        | Searchspring site identifier used for the assignment |

### 🛠️ Development

| Tool       | Description              |
| ---------- | ------------------------ |
| ESLint     | Code quality and linting |
| TypeScript | Type checking            |
| Git        | Version control          |
| GitHub     | Source code repository   |

---

## 🧮 Project Structure

```text
Searchspring PLP/
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ActiveFilters/
│   │   ├── common/
│   │   │   ├── AppLink/
│   │   │   ├── Button/
│   │   │   └── index.ts
│   │   ├── ErrorBoundary/
│   │   ├── FilterSidebar/
│   │   ├── Header/
│   │   ├── Icons/
│   │   ├── MobileFilterDrawer/
│   │   ├── MobileSort/
│   │   ├── NotFound/
│   │   ├── Pagination/
│   │   ├── ProductCard/
│   │   ├── ProductErrorState/
│   │   ├── ProductGrid/
│   │   ├── ProductToolbar/
│   │   ├── SearchBar/
│   │   ├── SortDropdown/
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useProductFilters.ts
│   │   ├── useProducts.ts
│   │   ├── useProductSorting.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   └── api/
│   │       └── searchspring.ts
│   │
│   ├── pages/
│   │   └── ProductListingPage.tsx
│   │
│   ├── providers/
│   │
│   ├── types/
│   │   └── searchspring.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🌍 Environment Setup

Create a local `.env` file in the project root if environment-specific configuration is required.

Example:

```env
VITE_SEARCHSPRING_SITE_ID=scmq7n
VITE_SEARCHSPRING_RESULTS_FORMAT=native
```

> `.env` is intentionally excluded from version control.

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have:

- Node.js 18+
- npm

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Start Development Server

```bash
npm run dev
```

The application will be available at the local URL shown by Vite, typically:

```text
http://localhost:5173
```

### 🏗️ Create Production Build

```bash
npm run build
```

### 🔎 Preview Production Build

```bash
npm run preview
```

---

## 🔗 Application Routes

### Product Listing

```text
/
```

---

## 🛠️ Future Improvements

### ✨ UX Improvements

- Search autocomplete
- Search history
- Recently viewed products
- Persistent wishlist
- Product quick-view modal
- Product comparison
- Grid/list toggle
- Animated transitions

---

## 🌐 Deployment

### Live Demo

_Add the deployed application URL here._

```text
https://product-listing-nu-two.vercel.app/
```

### Repository

_Add the GitHub repository URL here._

```text
https://github.com/niteshMP09/Product-Listing
```

---

## 🖼️ Snapshots

![📊 Listing Preview](/public/Listing.png)

## Working demo

![🎬 Working Demo](/public/ListingPage.gif)

```

---

## 🏁 Assignment Goals

This project focuses on demonstrating:

- 🧱 Scalable frontend architecture
- 🧩 Reusable component design
- 🧠 Custom React hooks
- 🔄 Server-state management
- 🌐 URL-driven application state
- 🔎 API integration
- 📱 Responsive UI/UX
- ♿ Accessibility
- ⚡ Performance optimization
- 🛡️ Robust error handling
- 🔷 Type-safe development
- 🧹 Maintainable and readable code

---

## ❤️ Built With

Built with **React, TypeScript, Tailwind CSS, TanStack React Query, React Router, and the Searchspring Search API**.
```
