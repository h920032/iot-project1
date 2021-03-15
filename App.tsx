import React, {useEffect, useRef, useState} from 'react';
import { Text, View, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import DoorControl from './screen/DoorControl';
import Monitor from './screen/Monitor';

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  const sendToken = (token) => {
    fetch('http://120.124.28.38:30000/token',
        {
            method: 'POST',
            body: JSON.stringify({token: token}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
        },
        )
        .then((response) => response.json());
}

  useEffect(() => { 
    registerForPushNotificationsAsync()
    .then(token => { 
      setExpoPushToken(token);
      if (expoPushToken !== undefined) {
        sendToken(expoPushToken);
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'DoorControl') {
              return (
                <FontAwesome5
                  name={
                    focused
                      ? 'door-open'
                      : 'door-closed'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Monitor') {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'monitor-eye' : 'monitor'}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="DoorControl" component={DoorControl}/>
        <Tab.Screen name="Monitor" component={Monitor} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}