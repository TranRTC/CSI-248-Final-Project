import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
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
    <View style={{ padding: 20, alignItems: 'center' }}>
      {mealPlans.map((plan, index) => (
        <Text key={index}>Next Meal: {plan.recipe} at {plan.date}</Text>
      ))}
    </View>
  );
};

export default MealNotify;
