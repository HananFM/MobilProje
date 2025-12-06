/**
 * Utility functions for calculating focus session statistics
 */

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is today
 */
const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);

  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Calculate total focus time for all completed sessions
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Total focus time in seconds
 */
export const getTotalFocusTime = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  return sessions
    .filter(session => session.completed)
    .reduce((total, session) => total + (session.duration || 0), 0);
};

/**
 * Calculate total focus time for today's sessions
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Total focus time today in seconds
 */
export const getTodayFocusTime = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  return sessions
    .filter(session => session.completed && isToday(session.timestamp))
    .reduce((total, session) => total + (session.duration || 0), 0);
};

/**
 * Calculate total number of distractions across all sessions
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Total distraction count
 */
export const getTotalDistractions = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  return sessions
    .filter(session => session.completed)
    .reduce((total, session) => total + (session.distractions || 0), 0);
};

/**
 * Calculate total number of distractions for today
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Total distraction count today
 */
export const getTodayDistractions = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  return sessions
    .filter(session => session.completed && isToday(session.timestamp))
    .reduce((total, session) => total + (session.distractions || 0), 0);
};

/**
 * Get count of completed sessions
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Number of completed sessions
 */
export const getCompletedSessionsCount = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  return sessions.filter(session => session.completed).length;
};

/**
 * Get count of completed sessions today
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Number of completed sessions today
 */
export const getTodaySessionsCount = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  return sessions.filter(session => session.completed && isToday(session.timestamp)).length;
};

/**
 * Format seconds to human-readable time string (e.g., "2h 30m")
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  if (!seconds || seconds === 0) return '0m';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
};

/**
 * Calculate average focus time per session
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Average focus time in seconds
 */
export const getAverageFocusTime = (sessions) => {
  const completedSessions = sessions.filter(session => session.completed);

  if (completedSessions.length === 0) return 0;

  const total = getTotalFocusTime(sessions);
  return Math.round(total / completedSessions.length);
};

/**
 * Calculate average distractions per session
 * @param {Array} sessions - Array of session objects
 * @returns {number} - Average distractions per session
 */
export const getAverageDistractions = (sessions) => {
  const completedSessions = sessions.filter(session => session.completed);

  if (completedSessions.length === 0) return 0;

  const total = getTotalDistractions(sessions);
  return (total / completedSessions.length).toFixed(1);
};
