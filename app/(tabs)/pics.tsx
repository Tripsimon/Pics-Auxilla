import { Image, StyleSheet, Platform, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { Camera, CameraType } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library'
import { useState, useEffect, useRef } from 'react';

export default function HomeScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)

  const cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const clearPicture = async () =>{
    setImage(null);
  }

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Photo saved to your device.");
        setImage(null);
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log("Chyba, neni image")
    }
  }

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/texture.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pics-Auxilla</ThemedText>

      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Přidat</ThemedText>

        {!image ?
          <Button
            title="Vyfotit"
            color="#841584"
            accessibilityLabel="Pořídí fotografii"
            onPress={takePicture}
          />
          :
          <>
            <Button
              title="Zahodit"
              color="#FF0F0F"
              accessibilityLabel="Přidá obrázek do galerie"
              onPress={clearPicture}
            />
            <Button
              title="Uložit"
              color="#0FFF0F"
              accessibilityLabel="Přidá obrázek do galerie"
              onPress={savePicture}
            />
          </>
        }

        {!image ?
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          >
          </Camera>
          :
          <Image
            source={{ uri: image }}
            style={styles.camera}
          />
        }
        <ThemedText>
          Zde lze vidět Vaše momentální foto.
        </ThemedText>
      </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  camera: {
    flex: 1,
    height: 500,
    borderRadius: 20,
  }
});
