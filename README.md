Dynamic User Availability and Event Scheduling System:

**Features**
Admin and Employee login.
Admin dashboard for managing user availability.
Schedule tasks and events with Syncfusion's ScheduleComponent.
Dynamic user availability tracking.
Responsive UI.
CRUD operations for events.
Token-based authentication (JWT).

**System Architecture**
The system follows a client-server architecture with a RESTful API backend and a React-based frontend.

**Frontend (React)**
State Management: Using React hooks (useState, useContext) to manage global state (e.g., user data, task lists).
Syncfusion Scheduler: The scheduler component is integrated for event management and task scheduling.

**Backend (Node.js & Express)**
Authentication: JWT-based authentication for secure login and session handling.
Database: MongoDB is used for storing user data, availability, and events. Mongoose is used for schema definitions.
API Endpoints: RESTful API handles CRUD operations for users, availability, and tasks.

**To Run the FrontEnd**
1) cd event -----npm start
**To Run the Backend**
1)npm start

The React app will  be available at http://localhost:3000

Video Drive Link:https://drive.google.com/file/d/1iqW99oOrjCwZhyq36TKUEW9qXQxocibI/view?usp=sharing
