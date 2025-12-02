import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSIONS_KEY = '@focus_sessions';

/**
 * Session Data Model:
 * {
 *   id: string,          // Unique identifier for the session
 *   duration: number,    // Duration in seconds
 *   category: string,    // Category selected for the session
 *   distractions: number,// Number of distractions during session
 *   timestamp: Date,     // When the session was completed
 *   completed: boolean   // Whether the session was completed
 * }
 */

/**
 * Save sessions to AsyncStorage
 * @param {Array} sessions - Array of session objects
 * @returns {Promise<boolean>} - Success status
 */
export const saveSessions = async (sessions) => {
  try {
    const jsonValue = JSON.stringify(sessions);
    await AsyncStorage.setItem(SESSIONS_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving sessions:', error);
    return false;
  }
};

/**
 * Load sessions from AsyncStorage
 * @returns {Promise<Array>} - Array of session objects
 */
export const loadSessions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SESSIONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading sessions:', error);
    return [];
  }
};

/**
 * Clear all sessions from AsyncStorage
 * @returns {Promise<boolean>} - Success status
 */
export const clearSessions = async () => {
  try {
    await AsyncStorage.removeItem(SESSIONS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing sessions:', error);
    return false;
  }
};

/**
 * Add a new session to storage
 * @param {Object} session - Session object to add
 * @returns {Promise<boolean>} - Success status
 */
export const addSession = async (session) => {
  try {
    const sessions = await loadSessions();
    sessions.push(session);
    return await saveSessions(sessions);
  } catch (error) {
    console.error('Error adding session:', error);
    return false;
  }
};

/**
 * Generate a unique ID for a session
 * @returns {string} - Unique session ID
 */
export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
