

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function PictureTake() {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);/*  */
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  const savePhoto = async () => {
    if (photo) {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      setPhoto(null); // Reset photo after saving
    }
  };

  const sharePhoto = async () => {
    if (photo) {
      await Sharing.shareAsync(photo.uri);
      setPhoto(null); // Reset photo after sharing
    }
  };

  const discardPhoto = () => {
    setPhoto(null); // Simply discard the photo
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
  }

  if (hasCameraPermission === false || hasMediaLibraryPermission === false) {
    return <View style={styles.container}><Text>No access to camera or media library</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Take Photos</Text>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.preview} />
          <TouchableOpacity style={styles.bootstrapButton} onPress={savePhoto}>
            <Text style={styles.bootstrapButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bootstrapButton} onPress={sharePhoto}>
            <Text style={styles.bootstrapButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bootstrapButton} onPress={discardPhoto}>
            <Text style={styles.bootstrapButtonText}>Discard</Text>
          </TouchableOpacity>
        </View>
      ) : (
        
        <Camera style={styles.camera} ref={cameraRef}>
          <TouchableOpacity style={styles.bootstrapButton} onPress={takePhoto}>
            <Text style={styles.bootstrapButtonText}>Take Photo</Text>
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
     justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // Added for clarit
  },
  previewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  camera: {
    //flex: 1,
    height: 200,
    width: '100%',
    justifyContent: 'flex-start', // Align the button to the bottom
  },
  preview: {
    width: 300,
    height: 170,
    alignSelf: 'center',
  },
  bootstrapButton: {

    backgroundColor: '#0070c9',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:2
    //backgroundColor: '#007bff', // Bootstrap primary color
    //paddingVertical: 10,
   // paddingHorizontal: 20,
   // borderRadius: 5,
    //alignItems: 'center',
    //marginBottom: 10,
  },
  bootstrapButtonText: {    
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {    
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }
});


