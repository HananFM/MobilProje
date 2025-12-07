import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart as RNPieChart } from 'react-native-chart-kit';

/**
 * PieChart Component
 * Displays category distribution of focus sessions
 *
 * @param {Array} sessions - Array of session objects
 */
const PieChart = ({ sessions }) => {
  const screenWidth = Dimensions.get('window').width;

  /**
   * Get category distribution data
   * @returns {Array} - Array of category data with name, focus time, color, and percentage
   */
  const getCategoryData = () => {
    if (!sessions || sessions.length === 0) {
      return [];
    }

    const categoryData = {};
    let totalTime = 0;

    // Calculate total time per category
    sessions
      .filter(session => session.completed)
      .forEach(session => {
        const category = session.category || 'Uncategorized';
        const duration = session.duration || 0;

        if (!categoryData[category]) {
          categoryData[category] = 0;
        }

        categoryData[category] += duration;
        totalTime += duration;
      });

    // If no data, return empty array
    if (totalTime === 0) {
      return [];
    }

    // Color palette for categories
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#C9CBCF',
    ];

    // Convert to array format for PieChart
    const data = Object.keys(categoryData).map((category, index) => {
      const minutes = Math.round(categoryData[category] / 60);
      const percentage = ((categoryData[category] / totalTime) * 100).toFixed(1);

      return {
        name: category,
        population: minutes,
        color: colors[index % colors.length],
        legendFontColor: '#333',
        legendFontSize: 13,
        percentage: percentage,
      };
    });

    // Sort by population (descending)
    return data.sort((a, b) => b.population - a.population);
  };

  const chartData = getCategoryData();
  const hasData = chartData.length > 0;

  // Empty state
  if (!hasData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📊</Text>
        <Text style={styles.emptyMessage}>No category data yet</Text>
        <Text style={styles.emptySubtext}>Complete sessions to see category breakdown</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Focus by Category</Text>
      <RNPieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        hasLegend={true}
        style={styles.chart}
      />
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.name}: {item.population}m ({item.percentage}%)
            </Text>
          </View>
        ))}
      </View>
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
  legendContainer: {
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#333',
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

export default PieChart;
