import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import NavKeys, { NavigationProp } from '../../navigation/NavKeys';
import notifee, { AndroidImportance } from '@notifee/react-native';

export default function DownloadVideoScreen() {
  const [url, setUrl] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const DOWNLOAD_NOTIFICATION_ID = 'download_progress';
  const DOWNLOAD_CHANNEL_ID = 'download';

  const createDownloadChannel = async () => {
    return await notifee.createChannel({
      id: DOWNLOAD_CHANNEL_ID,
      name: 'Download Notifications',
      importance: AndroidImportance.LOW,
    });
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const showProgressNotification = async (percent: number = 0, indeterminate: boolean = false) => {
    await createDownloadChannel();
    await notifee.displayNotification({
      id: DOWNLOAD_NOTIFICATION_ID,
      title: 'Downloading Video',
      body: indeterminate ? 'Downloading...' : `${percent}% completed`,
      android: {
        channelId: DOWNLOAD_CHANNEL_ID,
        progress: { max: 100, current: percent, indeterminate },
        ongoing: true,
        smallIcon: 'ic_launcher',
      },
    });
  };

  const showCompleteNotification = async (filePath: string) => {
    await createDownloadChannel();
    await notifee.cancelNotification(DOWNLOAD_NOTIFICATION_ID);
    await notifee.displayNotification({
      title: 'Download Complete',
      body: `${filePath.substring(filePath.lastIndexOf('/') + 1)}`,
      android: { channelId: DOWNLOAD_CHANNEL_ID, smallIcon: 'ic_launcher', autoCancel: true },
    });
  };

  const showErrorNotification = async (errorMessage: string) => {
    await createDownloadChannel();
    await notifee.cancelNotification(DOWNLOAD_NOTIFICATION_ID);
    await notifee.displayNotification({
      title: 'Download Failed',
      body: `Error: ${errorMessage}`,
      android: { channelId: DOWNLOAD_CHANNEL_ID, smallIcon: 'ic_launcher', autoCancel: true },
    });
  };

  const downloadVideo = async () => {
    if (!url) {
      Alert.alert('Invalid URL', 'Please enter a video URL.');
      return;
    }
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Cannot download without storage permission.');
        return;
      }
      showProgressNotification(0, true);

      const backendResponse = await fetch('http://192.168.1.20:5000/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!backendResponse.ok) {
        const errorData = await backendResponse.json();
        throw new Error(errorData.error || 'Server failed to download');
      }
      const { videoUrl } = await backendResponse.json();

      const folderPath = `${RNFS.DownloadDirectoryPath}/videos`;
      const exists = await RNFS.exists(folderPath);
      if (!exists) await RNFS.mkdir(folderPath);

      const fileName = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);
      const filePath = `${folderPath}/${fileName}`;

      const { promise } = RNFS.downloadFile({
        fromUrl: videoUrl,
        toFile: filePath,
        progress: (res) => {
          if (res.contentLength > 0) {
            const percent = Math.floor((res.bytesWritten / res.contentLength) * 100);
            showProgressNotification(percent, false);
          } else {
            showProgressNotification(0, true);
          }
        },
      });

      await promise;
      if (Platform.OS === 'android') await RNFS.scanFile(filePath);
      await showCompleteNotification(filePath);
      Alert.alert('Download Complete', `Saved at:\n${filePath}`);
      navigation.navigate(NavKeys.ChatScreen);
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : String(err);
      Alert.alert('Error', errorMessage);
      showErrorNotification(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Video</Text>
      <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="Paste Video URL" />
      <Button title="Download" onPress={downloadVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
});
