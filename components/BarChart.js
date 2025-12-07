import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-chart-kit';

/**
 * BarChart Component
 * Displays focus time for the last 7 days
 *
 * @param {Array} sessions - Array of session objects
 */
const BarChart = ({ sessions }) => {
  const screenWidth = Dimensions.get('window').width;

  /**
   * Get last 7 days data for the bar chart
   * @returns {Object} - Chart data with labels and datasets
   */
  const getLast7DaysData = () => {
    const today = new Date();
    const last7Days = [];
    const focusTimeByDay = {};

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      focusTimeByDay[dateKey] = 0;
      last7Days.push(dateKey);
    }

    // Calculate focus time for each day
    if (sessions && sessions.length > 0) {
      sessions
        .filter(session => session.completed)
        .forEach(session => {
          const sessionDate = new Date(session.timestamp).toISOString().split('T')[0];
          if (focusTimeByDay.hasOwnProperty(sessionDate)) {
            focusTimeByDay[sessionDate] += session.duration || 0;
          }
        });
    }

    // Convert to minutes and create labels
    const data = last7Days.map(dateKey => {
      const minutes = Math.round(focusTimeByDay[dateKey] / 60);
      return minutes;
    });

    const labels = last7Days.map(dateKey => {
      const date = new Date(dateKey);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return dayNames[date.getDay()];
    });

    return { labels, data };
  };

  const chartData = getLast7DaysData();
  const hasData = chartData.data.some(value => value > 0);

  // Empty state
  if (!hasData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📊</Text>
        <Text style={styles.emptyMessage}>No focus sessions yet</Text>
        <Text style={styles.emptySubtext}>Complete sessions to see your 7-day trend</Text>
      </View>
    );
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#4c669f',
    backgroundGradientTo: '#3b5998',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(255, 255, 255, 0.2)',
    },
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Last 7 Days Focus Time</Text>
      <RNBarChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero={true}
        showValuesOnTopOfBars={true}
        yAxisSuffix="m"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default BarChart;
