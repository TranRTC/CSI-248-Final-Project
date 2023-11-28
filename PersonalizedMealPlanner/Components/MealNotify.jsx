import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

async function requestNotificationsPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications was denied');
  }
}

const MealNotify = ({ mealPlans }) => {

  useEffect(() => {
    requestNotificationsPermission();
    scheduleNotifications(mealPlans);
  }, [mealPlans]);

  const scheduleNotifications = async (plans) => {
    const now = new Date().getTime();

    plans.forEach(async (plan) => {
      const planDate = new Date(plan.date).getTime();

      if (planDate > now) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Meal Reminder",
            body: `Time for your meal: ${plan.recipe}`,
          },
          trigger: { date: planDate },
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      {mealPlans.map((plan, index) => (
        <TouchableOpacity key={index} style={styles.notificationCard}>
          <Text style={styles.notificationTitle}>Next Meal: {plan.recipe}</Text>
          <Text style={styles.notificationSubtitle}>Scheduled for {plan.date}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  notificationCard: {
    backgroundColor: '#f9f9f9', // Light background color
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000', // Shadow for a subtle depth effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTitle: {
    color: '#000', // Dark text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationSubtitle: {
    color: '#666', // Subdued text color for subtitles
    fontSize: 14,
    marginTop: 5,
  }
});

export default MealNotify;
