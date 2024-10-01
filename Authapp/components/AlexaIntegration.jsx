import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from '@react-native-voice/voice';

const AlexaIntegration = () => {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      setStarted(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setStarted(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResultsHandler = (e) => {
    setResult(e.value[0]); 
    fetch('https://your-backend-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userVoiceInput: e.value[0],
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Alexa Response:', responseData);
        // Handle Alexa's response here
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>{result}</Text>
      <Button
        title={started ? 'Stop Listening' : 'Start Alexa'}
        onPress={started ? stopRecording : startRecording}
      />
    </View>
  );
};

export default AlexaIntegration;
