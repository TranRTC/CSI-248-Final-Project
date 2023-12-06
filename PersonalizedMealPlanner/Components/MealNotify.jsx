import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// need impport this package
import * as Notifications from 'expo-notifications';

// request the the permission for notification
//
async function requestNotificationsPermission() {
  const { status } = await Notifications.requestPermissionsAsync();//
  return status;
}

// MealNnotify component take in a parameter as array of meal plan which is passed from parent component App()
const MealNotify = ({ mealPlans }) => {

  // state variable and update funciton to handle the status of permission
  const [permissionRequested, setPermissionRequested] = useState(false);


  // use useEffect() to monitor the change in the dependency array and execute the scheduleNotification
  // MealPlan change & and Permission change will trigger the check "if" in side useEffect()
  useEffect(() => {

    // for testing only
    console.log("MealPlans in MealNotify:", mealPlans);

    if (permissionRequested) {
      // the condition to execute this statement is (mealPlan change or permission change && permission is true)
      scheduleNotifications(mealPlans);
    }
  }, [mealPlans, permissionRequested]);


// this function handle the permisson if yes update the permission if not sent alert message
  const handlePermissionRequest = async () => {
    const status = await requestNotificationsPermission();
    if (status === 'granted') {
      setPermissionRequested(true);
      //scheduleNotifications(mealPlans); reduncdant
    } else {
      alert('Permission for notifications was denied');
    }
  };


  const scheduleNotifications = async (mealPlans) => {
    const now = new Date().getTime();
  
    for (const plan of mealPlans) {
      const planDate = new Date(plan.date).getTime();
      const oneDayBeforePlan = planDate - 86400000;
  
      if (planDate > now) {
        console.log(planDate);
        console.log(now);
        try {
          const scheduledNotification = await Notifications.scheduleNotificationAsync({
            // notification content
            content: {
              title: "Meal Reminder",
              body: `Time for your meal: ${plan.date} ${plan.recipe}`,
            },

            trigger: { date: new Date(now + 5000) }, // Corrected trigger time oneDayBeforePlan
          });
  
          console.log(`Notification scheduled for ${plan.recipe}:`, scheduledNotification);
        } catch (error) {
          console.error(`Error scheduling notification for ${plan.recipe}:`, error);
        }
      }
    }
  };
  



  // scheduling function
 /*  const scheduleNotifications = async (mealPlans) => {

    // get the time from the date 
    const now = new Date().getTime();


    

    mealPlans.forEach(async (plan) => {

      const planDate = new Date(plan.date).getTime();
      const oneDayBeforePlan = planDate - 86400000; // Corrected to subtract 24 hours in milliseconds

     
    // the logic for notification happen. Only schedule notification for future events
    
      if (planDate > now) {

        try {
          const scheduledNotification = await Notifications.scheduleNotificationAsync({
            content: {
              title: "Meal Reminder",
              body: `Time for your meal: ${plan.date} ${plan.recipe}`,
            },
            // This code for testing purpose only it should be Date(oneDateBeforePlan)
            // mean that it will trigger 1 day ahead of the event. Below example will trigger after 5 sec for testing purpose
            trigger: { date: new Date(now + 2000) }, // it should be (oneDateBeforePlan)
            // 
          });

          console.log(`Notification scheduled for ${plan.recipe}:`, scheduledNotification);
        } catch (error) {
          console.error(`Error scheduling notification for ${plan.recipe}:`, error);
        }
      }
    });
  };  */


  return (
      <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>

            {/* This Touchable is rendered with condition when not yet permitted    */}

            {!permissionRequested && (
              <TouchableOpacity onPress={handlePermissionRequest} style={styles.permissionButton}>
                <Text style={styles.permissionButtonText}>Allow</Text>
              </TouchableOpacity>
            )}

            {/* loop through each plan of the array and filter only the plan with fulture date (>now) */}

            {mealPlans.filter(plan => {
                const planDate = new Date(plan.date).getTime();
                const now = new Date().getTime();
                return planDate > now;

                {/* after filter the filtered array will be applied map method to render element
                    with each element in the filtered array produce a touchable to show title of the recipe and date              
              */}
              }).map((plan, index) => (

                        <TouchableOpacity key={index} style={styles.notificationCard}>
                          <Text style={styles.notificationTitle}>Next Meal: {plan.recipe}</Text>
                          <Text style={styles.notificationSubtitle}>Scheduled for {plan.date}</Text>
                        </TouchableOpacity>

                      )
                    )
            }

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
