import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ReportsScreen from './screens/ReportsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'timer' : 'timer-outline';
            } else if (route.name === 'Reports') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Focus Timer',
            headerTitle: 'Focus Tracker',
          }}
        />
        <Tab.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            tabBarLabel: 'Reports',
            headerTitle: 'Statistics & Reports',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

