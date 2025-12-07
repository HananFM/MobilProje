import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { loadSessions, clearSessions } from '../utils/storage';
import {
  getTotalFocusTime,
  getTodayFocusTime,
  getTotalDistractions,
  getTodayDistractions,
  getCompletedSessionsCount,
  getTodaySessionsCount,
  formatTime,
  getAverageFocusTime,
  getAverageDistractions,
} from '../utils/calculations';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

export default function ReportsScreen() {
  const [sessions, setSessions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalFocusTime: 0,
    todayFocusTime: 0,
    totalDistractions: 0,
    todayDistractions: 0,
    totalSessions: 0,
    todaySessions: 0,
    averageFocusTime: 0,
    averageDistractions: 0,
  });

  // Load sessions from storage
  const loadData = useCallback(async () => {
    const loadedSessions = await loadSessions();
    setSessions(loadedSessions);

    // Calculate all statistics
    const calculatedStats = {
      totalFocusTime: getTotalFocusTime(loadedSessions),
      todayFocusTime: getTodayFocusTime(loadedSessions),
      totalDistractions: getTotalDistractions(loadedSessions),
      todayDistractions: getTodayDistractions(loadedSessions),
      totalSessions: getCompletedSessionsCount(loadedSessions),
      todaySessions: getTodaySessionsCount(loadedSessions),
      averageFocusTime: getAverageFocusTime(loadedSessions),
      averageDistractions: getAverageDistractions(loadedSessions),
    };

    setStats(calculatedStats);
  }, []);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  // Clear all data handler
  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all focus sessions? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await clearSessions();
            if (success) {
              await loadData();
              Alert.alert('Success', 'All session data has been cleared.');
            } else {
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Focus Reports</Text>
        <Text style={styles.subtitle}>Your productivity insights</Text>
      </View>

      {/* Today's Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today</Text>

        <View style={styles.row}>
          <StatCard
            title="Focus Time"
            value={formatTime(stats.todayFocusTime)}
            icon="⏱️"
            color="#4CAF50"
          />
          <StatCard
            title="Sessions"
            value={stats.todaySessions.toString()}
            icon="✅"
            color="#2196F3"
          />
        </View>

        <View style={styles.row}>
          <StatCard
            title="Distractions"
            value={stats.todayDistractions.toString()}
            icon="🚫"
            color="#FF9800"
          />
        </View>
      </View>

      {/* All-Time Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Time</Text>

        <View style={styles.row}>
          <StatCard
            title="Total Focus Time"
            value={formatTime(stats.totalFocusTime)}
            icon="🎯"
            color="#9C27B0"
          />
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions.toString()}
            icon="📊"
            color="#00BCD4"
          />
        </View>

        <View style={styles.row}>
          <StatCard
            title="Total Distractions"
            value={stats.totalDistractions.toString()}
            icon="⚠️"
            color="#F44336"
          />
          <StatCard
            title="Avg. Focus Time"
            value={formatTime(stats.averageFocusTime)}
            icon="📈"
            color="#3F51B5"
          />
        </View>

        <View style={styles.row}>
          <StatCard
            title="Avg. Distractions"
            value={stats.averageDistractions.toString()}
            icon="📉"
            color="#FF5722"
          />
        </View>
      </View>

      {/* Charts Section */}
      {stats.totalSessions > 0 && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visual Insights</Text>
            <BarChart sessions={sessions} />
            <PieChart sessions={sessions} />
          </View>
        </>
      )}

      {/* Clear Data Button */}
      {stats.totalSessions > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearData}
        >
          <Text style={styles.clearButtonText}>Clear All Data</Text>
        </TouchableOpacity>
      )}

      {/* Empty State */}
      {stats.totalSessions === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📭</Text>
          <Text style={styles.emptyStateText}>No sessions yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Complete a focus session to see your statistics here
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

// Reusable StatCard Component
function StatCard({ title, value, icon, color }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
