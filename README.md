# Event Finder
Exported from Caffeine project: EventFinder

https://creative-lime-zxf-draft.caffeine.xyz/
A modern React application to discover and find events near you. Search through a variety of events across different categories including music, technology, food & drink, art, and sports.

Features
🔍 Search Functionality: Filter events by name or category in real-time
🎨 Modern UI: Beautiful gradient design with smooth animations
🎵 Multiple Categories: Music, Technology, Food & Drink, Art, Sports, and more
📱 Responsive Design: Works seamlessly on desktop and mobile devices
💾 Mock Data: Pre-populated with sample events
Project Structure
event-finder-app/
├── public/
│   └── index.html          # The entry point
├── src/
│   ├── assets/             # Images and icons
│   ├── components/         # Reusable UI components
│   │   ├── SearchBar.js    # Search input component
│   │   └── EventCard.js    # Individual event card component
│   ├── data/
│   │   └── events.json     # Mock event data
│   ├── App.js              # Main application logic
│   ├── index.js            # React entry point
│   └── index.css           # Global styling
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
Installation
Clone the repository (if from a repository):

git clone <repository-url>
cd event-finder-app
Install dependencies:

npm install
Running the App
Start the development server:

npm start
The app will open in your browser at http://localhost:3000

Building for Production
Create an optimized production build:

npm run build
Available Scripts
npm start - Runs the app in development mode
npm build - Builds the app for production
npm test - Runs the test suite
Components
SearchBar
Allows users to search for events by name or category
Real-time filtering as the user types
EventCard
Displays individual event information
Shows event details including date, time, location, and price
Includes a "Learn More" button for further interaction
Mock Data
The app comes with sample events including:

Summer Music Festival
Tech Conference 2026
Food & Wine Tasting
Art Exhibition Opening
Marathon Race
Customization
To add your own events, edit the src/data/events.json file with your event data following this structure:

{
  "id": 6,
  "title": "Your Event Title",
  "category": "Category",
  "description": "Event description",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "location": "Location",
  "price": "Price"
}
Technologies Used
React - UI library
CSS3 - Styling with animations and gradients
JavaScript ES6+ - Application logic
Future Enhancements
 Add event filtering by date range
 Integrate with real API for live event data
 User authentication and favorites
 Event booking functionality
 Map integration for location display
 Reviews and ratings system
License
This project is open source and available for personal and educational use.

Support
For issues or questions, please open an issue in the repository.
