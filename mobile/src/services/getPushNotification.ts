import * as Notifications from "expo-notifications";

export async function getPushNotificationToken(count = 0) {
  const { granted } = await Notifications.getPermissionsAsync();

  if(!granted) {
    await Notifications.requestPermissionsAsync();
    count === 0 && await getPushNotificationToken(1);
  } else {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    
    return pushToken.data;
  }
}