# Traveloop — Full Project Specification for Cursor

> **Hackathon build · 3 devs · 8 hours**
> Read this entire file before writing any code. Follow the structure, naming, and DB schema exactly.

---

## 1. Project Overview

**Traveloop** is a personalized, multi-city travel planning web app. Users create trips with multiple stops (cities), assign activities to each stop, track expenses, write notes, and share itineraries publicly. An admin panel tracks platform analytics.

**Tagline:** Personalized Travel Planning Made Easy.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router v6, Tailwind CSS, Axios, Recharts |
| Backend | Node.js, Express.js |
| Database | MySQL + Sequelize ORM |
| Auth | JWT (jsonwebtoken) + bcrypt |
| File uploads | Multer (local /uploads folder) |
| Drag & drop | @hello-pangea/dnd (fork of react-beautiful-dnd) |
| PDF export | react-to-pdf (optional, P2) |

---

## 3. Folder Structure

```
traveloop/
├── client/                         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                    # Axios instance + API calls
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # One file per screen
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── CitySearch.jsx
│   │   │   ├── CityDetail.jsx
│   │   │   ├── ActivitySearch.jsx
│   │   │   ├── CreateTrip.jsx
│   │   │   ├── MyTrips.jsx
│   │   │   ├── ItineraryBuilder.jsx
│   │   │   ├── ItineraryView.jsx
│   │   │   ├── Finance.jsx
│   │   │   ├── PackingChecklist.jsx
│   │   │   ├── TripNotes.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── Community.jsx
│   │   │   ├── PublicItinerary.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminUsers.jsx
│   │   │       └── AdminActivities.jsx
│   │   ├── context/                # AuthContext (JWT + user state)
│   │   ├── hooks/                  # useAuth, useFetch etc.
│   │   └── App.jsx                 # Routes
│
├── server/                         # Express backend
│   ├── config/
│   │   └── db.js                   # Sequelize connection
│   ├── middleware/
│   │   ├── auth.js                 # JWT verify
│   │   └── adminGuard.js           # Role === 'admin' check
│   ├── models/                     # Sequelize models (one per table)
│   ├── routes/                     # Express routers
│   ├── controllers/                # Business logic
│   ├── seeders/                    # City + activity seed data
│   ├── uploads/                    # Multer destination
│   └── index.js                    # Entry point
│
├── .env
└── README.md
```

---

## 4. Environment Variables

```env
# server/.env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=traveloop
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

```env
# client/.env
VITE_API_URL=http://localhost:5000/api
```

---

## 5. Database Schema (MySQL via Sequelize)

Create all tables via Sequelize migrations or `sync({ force: true })` in dev.

### `users`
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
name          VARCHAR(100) NOT NULL
email         VARCHAR(150) UNIQUE NOT NULL
password_hash VARCHAR(255) NOT NULL
photo         VARCHAR(255)
phone         VARCHAR(20)
city          VARCHAR(100)
country       VARCHAR(100)
role          ENUM('user', 'admin') DEFAULT 'user'
created_at    DATETIME DEFAULT NOW()
updated_at    DATETIME DEFAULT NOW()
```

### `cities` (seeded — do not allow user inserts)
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
name          VARCHAR(100) NOT NULL
state         VARCHAR(100)
region        VARCHAR(100)          -- North / South / East / West / Northeast
cost_index    ENUM('budget', 'mid', 'premium')
description   TEXT
hero_image    VARCHAR(255)          -- path or URL
highlights    JSON                  -- ["Trekking", "Cafes", "River"]
eateries      JSON                  -- [{"name":"Evergreen", "type":"Cafe"}]
tips          JSON                  -- ["Best visited Oct-March", "Carry cash"]
```

### `activities` (seeded per city)
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
city_id       INT REFERENCES cities(id)
name          VARCHAR(150) NOT NULL
type          ENUM('adventure', 'food', 'culture', 'wellness', 'sightseeing', 'shopping')
description   TEXT
cost          DECIMAL(10,2)
duration_hrs  DECIMAL(4,1)
image         VARCHAR(255)
```

### `trips`
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
user_id       INT REFERENCES users(id)
name          VARCHAR(200) NOT NULL
description   TEXT
start_date    DATE
end_date      DATE
cover_photo   VARCHAR(255)
budget        DECIMAL(10,2)
is_public     BOOLEAN DEFAULT false
status        ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming'
created_at    DATETIME DEFAULT NOW()
updated_at    DATETIME DEFAULT NOW()
```

### `stops`
```sql
id            INT PRIMARY KEY AUTO_INCREMENT
trip_id       INT REFERENCES trips(id) ON DELETE CASCADE
city_id       INT REFERENCES cities(id)
start_date    DATE
end_date      DATE
order_index   INT NOT NULL           -- used for drag-to-reorder
created_at    DATETIME DEFAULT NOW()
```

### `stop_activities`
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
stop_id         INT REFERENCES stops(id) ON DELETE CASCADE
activity_id     INT REFERENCES activities(id)
scheduled_time  TIME
notes           TEXT
```

### `expenses`
```sql
id              INT PRIMARY KEY AUTO_INCREMENT
trip_id         INT REFERENCES trips(id) ON DELETE CASCADE
category        ENUM('Hotel', 'Flight', 'Train', 'Food', 'Activity', 'Other')
description     VARCHAR(255)
arrival_date    DATE
departure_date  DATE
amount          DECIMAL(10,2) NOT NULL
created_at      DATETIME DEFAULT NOW()
```

### `checklist_items`
```sql
id          INT PRIMARY KEY AUTO_INCREMENT
user_id     INT REFERENCES users(id) ON DELETE CASCADE
name        VARCHAR(200) NOT NULL
category    ENUM('Clothing', 'Documents', 'Electronics', 'Other')
is_packed   BOOLEAN DEFAULT false
created_at  DATETIME DEFAULT NOW()
```

### `trip_notes`
```sql
id          INT PRIMARY KEY AUTO_INCREMENT
trip_id     INT REFERENCES trips(id) ON DELETE CASCADE
stop_id     INT REFERENCES stops(id) ON DELETE SET NULL   -- nullable
content     TEXT NOT NULL
created_at  DATETIME DEFAULT NOW()
updated_at  DATETIME DEFAULT NOW()
```

### `saved_destinations`
```sql
id          INT PRIMARY KEY AUTO_INCREMENT
user_id     INT REFERENCES users(id) ON DELETE CASCADE
city_id     INT REFERENCES cities(id)
saved_at    DATETIME DEFAULT NOW()
UNIQUE(user_id, city_id)
```

---

## 6. Seed Data — 25 Curated Indian Cities

Seed these cities with realistic data. Each city must have:
- At least 5 activities across different types
- At least 3 eateries in the JSON field
- At least 3 tips in the JSON field

| # | City | State | Region | Cost Index |
|---|---|---|---|---|
| 1 | Kasol | Himachal Pradesh | North | budget |
| 2 | Mcleodganj | Himachal Pradesh | North | budget |
| 3 | Bir Billing | Himachal Pradesh | North | budget |
| 4 | Spiti Valley | Himachal Pradesh | North | mid |
| 5 | Manali | Himachal Pradesh | North | mid |
| 6 | Rishikesh | Uttarakhand | North | budget |
| 7 | Kedarnath | Uttarakhand | North | mid |
| 8 | Auli | Uttarakhand | North | mid |
| 9 | Jaisalmer | Rajasthan | North | mid |
| 10 | Udaipur | Rajasthan | North | mid |
| 11 | Jodhpur | Rajasthan | North | budget |
| 12 | Pushkar | Rajasthan | North | budget |
| 13 | Goa | Goa | West | mid |
| 14 | Coorg | Karnataka | South | mid |
| 15 | Hampi | Karnataka | South | budget |
| 16 | Munnar | Kerala | South | mid |
| 17 | Alleppey | Kerala | South | mid |
| 18 | Ooty | Tamil Nadu | South | budget |
| 19 | Varanasi | Uttar Pradesh | North | budget |
| 20 | Darjeeling | West Bengal | East | mid |
| 21 | Gangtok | Sikkim | Northeast | mid |
| 22 | Cherrapunji | Meghalaya | Northeast | mid |
| 23 | Ziro | Arunachal Pradesh | Northeast | budget |
| 24 | Rann of Kutch | Gujarat | West | mid |
| 25 | Andaman Islands | UT | South | premium |

---

## 7. API Endpoints

All routes prefixed with `/api`. Protected routes require `Authorization: Bearer <token>` header.

### Auth
```
POST   /api/auth/register       — create user (multipart/form-data for photo)
POST   /api/auth/login          — returns { token, user }
GET    /api/auth/me             — returns current user (protected)
```

### Cities
```
GET    /api/cities              — all cities, supports ?search=&region=&cost=
GET    /api/cities/:id          — single city with full details
GET    /api/cities/:id/activities  — activities for a city, supports ?type=
```

### Activities
```
GET    /api/activities          — all activities, supports ?type=&city=&maxCost=
```

### Trips
```
POST   /api/trips               — create trip (protected)
GET    /api/trips               — my trips (protected), supports ?status=
GET    /api/trips/:id           — trip detail (protected, owner only)
PUT    /api/trips/:id           — update trip (protected, owner only)
DELETE /api/trips/:id           — delete trip (protected, owner only)
```

### Stops
```
POST   /api/trips/:id/stops         — add stop to trip
GET    /api/trips/:id/stops         — all stops for a trip (ordered by order_index)
PUT    /api/stops/:id               — update stop dates
DELETE /api/stops/:id              — remove stop
PUT    /api/trips/:id/stops/reorder — body: { orderedIds: [3,1,2] } — reorder stops
```

### Stop Activities
```
POST   /api/stops/:id/activities         — add activity to stop
GET    /api/stops/:id/activities         — activities for a stop
DELETE /api/stops/:stopId/activities/:actId — remove activity from stop
```

### Expenses
```
POST   /api/trips/:id/expenses      — add expense row
GET    /api/trips/:id/expenses      — all expenses for trip
GET    /api/trips/:id/expenses/summary  — { totalSpent, budget, byCategory: {...} }
PUT    /api/expenses/:id            — update expense
DELETE /api/expenses/:id            — delete expense
```

### Checklist
```
GET    /api/checklist               — user's checklist items (protected)
POST   /api/checklist               — add item
PUT    /api/checklist/:id           — update (toggle is_packed, edit name/category)
DELETE /api/checklist/:id           — delete item
DELETE /api/checklist/reset         — mark all is_packed = false
```

### Trip Notes
```
GET    /api/trips/:id/notes         — all notes for trip
POST   /api/trips/:id/notes         — add note (body: { content, stop_id? })
PUT    /api/notes/:id               — edit note
DELETE /api/notes/:id               — delete note
```

### Community
```
GET    /api/community               — all public trips, supports ?search=&status=
GET    /api/community/:id           — public trip detail (no finance data)
POST   /api/community/:id/copy      — fork trip to your account (protected)
```

### User Profile
```
GET    /api/users/profile           — get profile (protected)
PUT    /api/users/profile           — update profile (protected, multipart for photo)
DELETE /api/users/account           — delete account (protected)
GET    /api/users/saved             — saved destinations
POST   /api/users/saved/:cityId     — save a city
DELETE /api/users/saved/:cityId     — unsave a city
```

### Admin (all routes require role === 'admin')
```
GET    /api/admin/stats             — { totalUsers, totalTrips, tripsThisWeek, topCity }
GET    /api/admin/users             — all users with trip count
GET    /api/admin/popular-cities    — cities ranked by stop count
GET    /api/admin/popular-activities — activities ranked by usage count
GET    /api/admin/trips-over-time   — trips created grouped by week
```

---

## 8. Screen-by-Screen Specification

### Screen 1 — Login
- Split screen: left panel = Admin login, right panel = User login
- Each panel: email + password fields + login button
- On success: admin → `/admin`, user → `/home`
- Link to `/register` on the user panel

### Screen 2 — Register
- Fields: profile photo (upload), first name, last name, email, password, phone, city, country, additional info
- POST to `/api/auth/register` as multipart/form-data
- On success → redirect to `/login`

### Screen 3 — Home / Dashboard
- Welcome message with user name
- Hero banner image (static or rotating)
- "Plan New Trip" CTA button → `/trips/create`
- Curated destinations section: searchable grid of city cards (name, state, cost badge, hero image)
  - Clicking a city → `/cities/:id`
- Previous trips section: last 3 trips as cards

### Screen 4 — Create Trip
- Fields: trip name, start date, end date, description, cover photo upload, budget (₹), visibility toggle (public/private)
- On save → POST `/api/trips` → redirect to `/trips/:id/builder`

### Screen 5 — My Trips
- Grouped sections: Ongoing / Upcoming / Completed
- Each trip card: cover photo, name, date range, stop count, status badge
- Actions: View itinerary, Edit, Delete

### Screen 6 — Itinerary Builder
- Left panel: list of stops (draggable with @hello-pangea/dnd)
- "Add Stop" button: opens modal → search/select city from curated list → set start & end dates → save
- Each stop card: city name, date range, activity count, delete button
- Drag handle to reorder → PUT `/api/trips/:id/stops/reorder`
- Each stop has "Add Activities" button → opens Activity Search drawer (see Screen 8)
- "View Itinerary" button → `/trips/:id/view`

### Screen 7 — Itinerary View
- Day-wise layout grouped by stop/city
- Each day shows: city name header, list of activities with time + estimated cost
- Toggle between list view and calendar view
- Read-only mode (no editing here — edit in builder)

### Screen 8 — City Search
- Search bar (filter by name)
- Filter chips: region (North/South/East/West/Northeast), cost index (budget/mid/premium)
- Grid of city cards: hero image, name, state, cost badge, short description
- "Save" heart icon on each card
- Click → `/cities/:id`

### Screen 9 — City Detail Page
- Hero image + city name + state
- Cost index badge
- Tabs or sections: About · Activities · Eateries · Tips
- Activities: grid of activity cards with type icon, name, cost, duration, "Add to Trip" button
- Eateries: list from JSON field
- Tips: bullet list from JSON field
- Google Maps iframe embed at bottom (static embed, no API key needed)

### Screen 10 — Activity Search
- Triggered from within Itinerary Builder (drawer/modal) or standalone page
- Filter by type (adventure / food / culture / wellness / sightseeing / shopping)
- Filter by max cost, duration
- Activity cards: image, name, type badge, cost, duration, description
- "Add to Stop" button (if opened from builder context)

### Screen 11 — Finance / Expense Table
- Master table for selected trip
- Columns: Sr.No · Category (dropdown) · Description · Arrival Date · Departure Date · Amount (₹)
- Category dropdown options: Hotel · Flight · Train · Food · Activity · Other
- Add row, edit inline, delete row
- Below table: budget summary section
  - Total budget (set on trip) vs total spent
  - Progress bar: green < 80%, amber 80–100%, red > 100%
  - Over-budget rows highlighted in red background
  - Pie chart (Recharts): breakdown by category
  - Bar chart (Recharts): expense per day

### Screen 12 — Packing Checklist
- Per user (not per trip)
- Categories: Clothing · Documents · Electronics · Other
- Each item: checkbox (is_packed toggle), name, category badge, delete button
- "Add Item" form at top
- "Reset All" button → marks all as unpacked
- Progress: "X of Y items packed"

### Screen 13 — Trip Notes / Journal
- Tied to a specific trip (selected from dropdown or via trip context)
- Optionally tag note to a specific stop
- List of notes sorted by created_at descending
- Each note: content, timestamp, stop tag (if any), edit/delete actions
- "Add Note" textarea at top

### Screen 14 — User Profile / Settings
- Editable: name, profile photo, email, phone, city, country
- Saved destinations: list of saved cities with remove option
- Delete account button (confirm modal)

### Screen 15 — Community Feed
- Read-only browsable list of all public trips
- Filter by: destination city (search), status (upcoming/ongoing/completed)
- Trip cards: cover photo, trip name, owner name, stops list, date range, status
- Click → public itinerary view (read-only, no finance data shown)
- "Copy Trip" button to fork to your account

### Screen 16 — Admin Dashboard
- Stat cards: Total Users · Total Trips · Trips This Week · Most Popular City
- Line chart: trips created over time (last 8 weeks)
- Bar chart: top 5 cities by stop count
- Pie chart: trip status breakdown (upcoming / ongoing / completed)
- Users table: name, email, trips count, joined date, role
- Popular activities table: activity name, city, usage count

---

## 9. Priority Order (follow strictly if time runs short)

### P0 — Must ship (Hours 0–5)
1. Setup, DB migrations, seed data
2. Auth (login two-panel + register + JWT)
3. Home screen + city search + city detail
4. Create trip + my trips
5. Itinerary builder (stops + drag reorder + activities)
6. Itinerary view
7. Finance table + pie chart + budget alert

### P1 — Should ship (Hours 5–7)
8. Packing checklist
9. Trip notes
10. User profile
11. Community feed + public itinerary view
12. Admin dashboard

### P2 — If time permits (Hour 7–8)
13. Google Maps embed on city pages
14. PDF export of expense table
15. Copy/fork trip from community
16. Social share (copy public URL)
17. Mobile responsive polish

---

## 10. Dev Team Split

| Developer | Owns |
|---|---|
| Dev 1 (Backend) | All Express routes, controllers, Sequelize models, migrations, seed scripts, auth middleware |
| Dev 2 (Finance + Utility) | Finance screen, admin dashboard, packing checklist, trip notes, Recharts integration |
| Dev 3 (Frontend UI) | All page components, routing, city/activity UI, itinerary builder UI, community feed |

> Dev 1 defines and documents API request/response shapes first so Dev 2 and Dev 3 can mock with Axios before backend is ready.

---

## 11. Key Implementation Notes

### JWT Auth flow
```js
// On login response, store in localStorage
localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));

// Axios instance (src/api/axios.js)
import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
```

### Stop reorder (drag & drop)
```js
// After drag ends, send new order to backend
const orderedIds = reorderedStops.map(s => s.id);
await api.put(`/trips/${tripId}/stops/reorder`, { orderedIds });
// Backend updates order_index for each stop
```

### Expense pie chart (Recharts)
```jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
const COLORS = ['#6366f1','#f59e0b','#10b981','#ef4444','#3b82f6','#8b5cf6'];
// data = [{ name: 'Hotel', value: 5000 }, { name: 'Food', value: 2000 }, ...]
```

### Over-budget row highlight
```jsx
// On expense table rows
className={`${expense.amount > THRESHOLD ? 'bg-red-50 text-red-700' : ''}`}
// On summary
const isOverBudget = totalSpent > trip.budget;
```

### Drag to reorder stops
```jsx
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// Wrap stop list in DragDropContext + Droppable
// Each stop in Draggable
// onDragEnd → reorder local state → call API
```

---

## 12. Curated City Seed Example (for reference)

```js
// seeders/cities.js
{
  name: 'Kasol',
  state: 'Himachal Pradesh',
  region: 'North',
  cost_index: 'budget',
  description: 'A tiny hamlet on the banks of Parvati River, known for its Israeli cafes, pine forests, and gateway to Kheerganga and Grahan treks.',
  hero_image: 'https://images.unsplash.com/photo-kasol',
  highlights: JSON.stringify(['Kheerganga Trek', 'Parvati River', 'Chalal Walk', 'Cafes', 'Camping']),
  eateries: JSON.stringify([
    { name: 'Moon Dance Cafe', type: 'Israeli/Continental' },
    { name: 'Evergreen Cafe', type: 'Multi-cuisine' },
    { name: 'Jim Morrison Cafe', type: 'Cafe' }
  ]),
  tips: JSON.stringify([
    'Best visited October to June. Avoid monsoon.',
    'Carry cash — ATMs are unreliable.',
    'Book stays in advance during season.',
    'Permits required for Kheerganga trek.'
  ])
}
```

---

## 13. What NOT to build

- No real-time features (no websockets, no chat)
- No payment gateway
- No Google Maps API (use static iframe embeds only)
- No email sending (skip forgot password or do it as a mock)
- No scraping — all city/activity data is hand-seeded
- No user-to-user messaging
- No notifications (over-budget is visual only — red highlight in UI)

---

*Generated for Traveloop Hackathon — follow this spec top to bottom. Ask for clarification on any section before deviating from it.*
