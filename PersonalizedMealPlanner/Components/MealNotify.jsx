import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

async function requestNotificationsPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
}

const MealNotify = ({ mealPlans }) => {
  const [permissionRequested, setPermissionRequested] = useState(false);

  useEffect(() => {
    if (permissionRequested) {
      scheduleNotifications(mealPlans);
    }
  }, [mealPlans, permissionRequested]);

  const handlePermissionRequest = async () => {
    const status = await requestNotificationsPermission();
    if (status === 'granted') {
      setPermissionRequested(true);
      scheduleNotifications(mealPlans);
    } else {
      alert('Permission for notifications was denied');
    }
  };

  const scheduleNotifications = async (plans) => {
    const now = new Date().getTime();

    plans.forEach(async (plan) => {
      const planDate = new Date(plan.date).getTime();
      const oneDayBeforePlan = planDate - 86400000; // Corrected to subtract 24 hours in milliseconds

      //=====================This code for checking the log of notification at console =================
      console.log(`Processing meal plan: ${plan.recipe}`);
      console.log(`Plan Date: ${new Date(planDate).toString()}`);
      console.log(`One Day Before Plan: ${new Date(oneDayBeforePlan).toString()}`);
      console.log(`Current Time: ${new Date(now).toString()}`);
      console.log(`Will schedule notification? ${oneDayBeforePlan > now}`);
      //===============================================================================================

    // the logic for notification happen. Only schedule notification for future events
    
      if (planDate >= now) {
        try {
          const scheduledNotification = await Notifications.scheduleNotificationAsync({
            content: {
              title: "Meal Reminder",
              body: `Time for your meal: ${plan.date} ${plan.recipe}`,
            },
            // This code for testing purpose only it should be Date(oneDateBeforePlan)
            // mean that it will trigger 1 day ahead of the event. Below example will trigger after 5 sec for testing purpose
            trigger: { date: new Date(now + 5000) },
            // 
          });
          console.log(`Notification scheduled for ${plan.recipe}:`, scheduledNotification);
        } catch (error) {
          console.error(`Error scheduling notification for ${plan.recipe}:`, error);
        }
      }
    });
  };

 

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
      {!permissionRequested && (
        <TouchableOpacity onPress={handlePermissionRequest} style={styles.permissionButton}>

          <Text style={styles.permissionButtonText}>Allow</Text>
        </TouchableOpacity>
      )}

      {mealPlans.filter(plan => {
    const planDate = new Date(plan.date).getTime();
    const now = new Date().getTime();
    return planDate > now;
  }).map((plan, index) => (
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
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  permissionButton: {
    backgroundColor: '#0070c9',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',

    //backgroundColor: '#007bff',
    //padding: 10,
    //borderRadius: 5,
    //marginBottom: 20,
  },permissionButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    
  },
  header: {

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }
});

export default MealNotify;
