
// web: 629952056122-elog52ppm0nagsimt09icfrts92ohi4d.apps.googleusercontent.com
// ios: 629952056122-mfn77laejt4t5ecn8a4965sm2rqpeuev.apps.googleusercontent.com
// android: 
/*
import React from 'react';
import { Button, View, StyleSheet, Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// This line is necessary for handling the redirect from Google's OAuth flow to Expo
WebBrowser.maybeCompleteAuthSession();

export default function UserLogin() {
  // Determine the correct clientId based on the platform
  const clientId = Platform.select({
    web: '629952056122-elog52ppm0nagsimt09icfrts92ohi4d.apps.googleusercontent.com',
    ios: '629952056122-mfn77laejt4t5ecn8a4965sm2rqpeuev.apps.googleusercontent.com',
    // Add the Android clientId here if you have one
    android: '',
  });

  // Generate the correct redirect URI
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  // Discovery document for Google OAuth
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');

  // Auth request configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId,
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  }, discovery);

  // Function to handle the Google login process
  const handleGoogleLogin = () => {
    // Start the authentication process
    promptAsync({ useProxy: true });
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={handleGoogleLogin} disabled={!request} />
    </View>
  );
}

// Styles for the app container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 */

/* import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// This line is necessary for handling the redirect from Google's OAuth flow to Expo
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // Generate the correct redirect URI
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  // Discovery document for Google OAuth
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');

  // Auth request configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: '629952056122-elog52ppm0nagsimt09icfrts92ohi4d.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  }, discovery);

  // Function to handle the Google login process
  const handleGoogleLogin = () => {
    // Start the authentication process
    promptAsync({ useProxy: true });
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={handleGoogleLogin} disabled={!request} />
    </View>
  );
}

// Styles for the app container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 */

// UserLogin.js
