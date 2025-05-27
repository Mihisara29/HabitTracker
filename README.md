
## 📱 Habit Tracker – Build Good Habits, Break Bad Ones!

### 📝 Description

**Habit Tracker** is a mobile application built with **React Native CLI and TypeScript** that helps users build good habits and track their progress over time. This app allows users to register locally, create daily or weekly habits (such as "Exercise", "Read", "Drink Water"), mark them as completed, and view their overall progress.

The goal of this project is to encourage consistency in everyday routines and make habit tracking simple and effective—completely offline using `AsyncStorage`.

---

## 🎯 Core Features

### 🔐 Registration / Login

* Local registration with Name, Email, and Password.
* User data is stored using AsyncStorage.
* Automatic login if user details are already saved.

### ➕ Create Habit Screen

* Add new habits with:

  * Habit Name
  * Frequency (Daily / Weekly)
* Save habits in AsyncStorage.

### 📋 Habit List Screen

* Display all habits using `FlatList`.
* For each habit:

  * Show the name.
  * Mark as Completed / Not Completed for the current day.
* Filter options:

  * All Habits
  * Today’s Habits
  * Completed Habits

### 📈 Progress Tracking Screen

* Show percentage of habits completed for the current day.
* Optional: Weekly progress with basic chart/text (if implemented).

### 🚪 Logout

* Clear stored user data from AsyncStorage.
* Navigate back to Login screen.

---

## 💾 Tech Stack

| Tool / Library        | Description                         |
| --------------------- | ----------------------------------- |
| React Native CLI      | Main mobile development framework   |
| TypeScript            | Static typing for props and states  |
| React Navigation      | Stack and Tab navigation            |
| AsyncStorage          | Local storage for users and habits  |
| useContext (optional) | For managing global state (if used) |

---

## 🗂 Folder Structure (Basic Layout)

```
src/
├── components/        # Reusable components (e.g., HabitCard)
├── screens/           # App screens (Login, HabitList, CreateHabit, etc.)
├── services/          # Storage and helper services
├── navigation/        # Stack and Tab navigation setup
├── context/           # App-level state management (if used)
```

---

## 📦 Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/habit-tracker-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd habit-tracker-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the app on Android:

   ```bash
   npx react-native run-android
   ```

5. Or run on iOS (Mac only):

   ```bash
   npx react-native run-ios
   ```

---

## 📹 Demo
https://drive.google.com/file/d/1Oy6QS9SK2HSxOzjBWKGoWFGBGhvptC-K/view?usp=sharing
---

## 👨‍💻 Author

**Induwara Mihisara**
3rd Year Software Engineering Undergraduate
Faculty of Science, University of Kelaniya

---

