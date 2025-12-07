# Focus Tracking App

A mobile application designed to combat digital distraction by tracking user-initiated focus sessions using the Pomodoro technique. The app monitors distractions (when users leave the app) and provides meaningful statistics and reports.

## Course Information

**Course:** BSM 447 - Mobile Application Development
**Technology:** React Native (Expo)
**Project Type:** Focus Tracking and Reporting Application

## Features

### Core Functionality
- **Pomodoro Timer**: Customizable countdown timer (5-120 minutes in 5-minute increments)
- **Distraction Tracking**: Automatically detects and counts when users leave the app during a focus session
- **Category Management**: Pre-defined categories (Studying, Coding, Project, Reading) with ability to add custom categories
- **Session Persistence**: All completed sessions are saved locally using AsyncStorage

### Statistics & Reporting
- **Today's Stats**: Focus time, sessions completed, and distractions for the current day
- **All-Time Stats**: Total focus time, total sessions, total distractions
- **Average Metrics**: Average focus time per session and average distractions per session
- **Visual Insights**:
  - Bar Chart: Last 7 days focus time trend
  - Pie Chart: Category distribution with percentages

### User Experience
- **Real-time Updates**: Timer updates every second with visual status indicators
- **Session Summary**: Detailed summary after each completed session with personalized feedback
- **Pull to Refresh**: Refresh statistics in real-time
- **Empty States**: Informative messages when no data is available
- **Responsive Design**: Works across different screen sizes

## Technical Stack

- **Framework**: Expo (~54.0.18)
- **React**: 19.1.0
- **React Native**: 0.81.5
- **Navigation**: React Navigation (Bottom Tabs)
- **Storage**: AsyncStorage
- **Charts**: react-native-chart-kit
- **Icons**: Expo Vector Icons (Ionicons)

## Project Structure

```
MobilProject/
├── App.js                          # Main app with tab navigation
├── screens/
│   ├── HomeScreen.js              # Timer screen with focus session controls
│   └── ReportsScreen.js           # Statistics and charts screen
├── components/
│   ├── Timer.js                   # Countdown timer component
│   ├── SessionSummary.js          # Session completion summary modal
│   ├── BarChart.js                # 7-day focus time bar chart
│   └── PieChart.js                # Category distribution pie chart
├── utils/
│   ├── storage.js                 # AsyncStorage helper functions
│   └── calculations.js            # Statistics calculation utilities
├── package.json                    # Project dependencies
└── PROJECT_PLAN.md                # Detailed development plan

```

## Installation Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI (optional, but recommended)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd MobilProject
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm start
# or
expo start
```

### Step 4: Run the App
After starting the development server, you can run the app on:

- **Android**: Press `a` in the terminal or scan the QR code with Expo Go app
- **iOS**: Press `i` in the terminal or scan the QR code with Expo Go app (Mac only)
- **Web**: Press `w` in the terminal to open in browser

## How to Use

### Starting a Focus Session
1. Open the app and navigate to the **Focus Timer** tab
2. Select a category from the dropdown (or add a custom category)
3. Adjust the timer duration using +/- buttons (default: 25 minutes)
4. Press **Start** to begin your focus session
5. Stay in the app to maintain focus. Leaving the app will count as a distraction.

### During a Focus Session
- The timer displays the remaining time in MM:SS format
- A green border indicates the timer is running
- The distraction counter shows how many times you've left the app
- Press **Pause** to pause the session
- Press **Reset** to cancel and reset the session

### After Completing a Session
- A summary modal appears showing:
  - Total focus time
  - Category
  - Number of distractions
  - Personalized feedback
- The session is automatically saved to your history
- Press **Close** to dismiss the summary and reset the timer

### Viewing Statistics
1. Navigate to the **Reports** tab
2. View your statistics:
   - **Today**: Today's focus time, sessions, and distractions
   - **All Time**: Total statistics across all sessions
   - **Visual Insights**: Charts showing trends and category distribution
3. Pull down to refresh data
4. Use **Clear All Data** button to reset all statistics (with confirmation)

## Key Components

### HomeScreen (screens/HomeScreen.js)
- Main timer interface
- Category selection
- Timer controls (Start, Pause, Reset)
- Distraction tracking with AppState API
- Duration adjustment

### ReportsScreen (screens/ReportsScreen.js)
- Statistics dashboard
- Bar chart for 7-day trend
- Pie chart for category distribution
- Pull-to-refresh functionality
- Data management (clear all data)

### Timer Component (components/Timer.js)
- Countdown logic with useEffect
- Visual timer display
- Status indicators
- AppState integration for distraction detection

### Charts (components/BarChart.js, components/PieChart.js)
- Last 7 days focus time visualization
- Category distribution with percentages
- Empty state handling
- Responsive design

### Storage Utilities (utils/storage.js)
- Save/load sessions from AsyncStorage
- Add individual sessions
- Clear all data
- Error handling

### Calculation Utilities (utils/calculations.js)
- Today's and all-time statistics
- Average calculations
- Time formatting
- Date comparisons

## Development Journey

This project was developed in 10 phases:
1. **Phase 1-2**: Project setup and navigation structure
2. **Phase 3**: Timer UI with custom category feature
3. **Phase 4**: Timer functionality with adjustable duration
4. **Phase 5**: AppState integration for distraction tracking
5. **Phase 6**: Data storage with AsyncStorage
6. **Phase 7**: Session summary with automatic persistence
7. **Phase 8**: Statistics dashboard with comprehensive reporting
8. **Phase 9**: Data visualization with charts
9. **Phase 10**: Testing, polish, and documentation

Total commits: 10 (made on different days as required)

## Technical Requirements Met

- ✅ Developed using Expo
- ✅ At least 2 main screens (Home and Reports)
- ✅ Tab Navigator implemented
- ✅ AppState API for distraction tracking
- ✅ AsyncStorage for data persistence
- ✅ react-native-chart-kit for charts
- ✅ Component-based, clean, readable code
- ✅ GitHub repository with proper commits
- ✅ Minimum 10 commits on different days
- ✅ Comprehensive README.md

## Future Enhancements

Potential improvements for future versions:
- Sound notifications when timer completes
- Vibration feedback for events
- Dark mode support
- Export statistics to CSV/PDF
- Weekly/monthly goals and achievements
- Focus streaks and rewards
- Cloud backup and sync
- Multiple timer presets
- Break timer (Pomodoro break intervals)

## Troubleshooting

### App won't start
- Make sure all dependencies are installed: `npm install`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Charts not displaying
- Ensure react-native-svg is installed: `npm install react-native-svg`
- Restart the Expo development server

### Data not persisting
- Check AsyncStorage permissions
- Verify that sessions are completing (timer reaches 0:00)
- Check for console errors

## License

This project was created for educational purposes as part of the BSM 447 course.

## Acknowledgments

- Built with React Native and Expo
- Uses react-native-chart-kit for data visualization
- Icons provided by Expo Vector Icons
- Follows the Pomodoro Technique principles

---

**Generated with Claude Code** - December 2024
