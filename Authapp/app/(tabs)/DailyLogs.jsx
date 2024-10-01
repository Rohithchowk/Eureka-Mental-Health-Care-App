// First, install necessary packages:
// npm install react-native-elements react-native-vector-icons react-native-image-picker

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { ListItem, Icon, CheckBox } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';

const DailyLogs = () => {
  const [activitiesExpanded, setActivitiesExpanded] = useState(false);
  const [moodExpanded, setMoodExpanded] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [moodQuestionsVisible, setMoodQuestionsVisible] = useState(false);
  const [sleepTime, setSleepTime] = useState(null);
  const [finalMessage, setFinalMessage] = useState('');

  const tasks = [
    { id: '1', title: 'Morning Yoga' },
    { id: '2', title: 'Work on project' },
    { id: '3', title: 'Read a book' },
    { id: '4', title: 'Evening walk' },
  ];

  const emojis = ['😢', '😔', '😐', '😊', '😁'];

  const handleTaskSelect = (id) => {
    setSelectedTasks((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleImageUpload = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleMoodSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setMoodQuestionsVisible(true);
  };

  const handleSubmitMood = () => {
    const moodMessage = selectedEmoji === '😁' || selectedEmoji === '😊'
      ? 'You are in a great mood! Keep up the positive energy!'
      : 'It looks like you are feeling down. Stay strong! Remember that tough times don’t last but tough people do!';
    
    setFinalMessage(moodMessage);
  
    const moodData = {
      emoji: selectedEmoji,
      sleepTime: sleepTime,
      moodMessage: moodMessage
    };
  
    fetch('https://improved-system-wrgvwv79r4p62v6j-8000.app.github.dev/api/mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moodData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}>Daily Logs and Activities</Text>

      {/* Today's Activities Accordion */}
      <ListItem.Accordion
        content={<ListItem.Content><ListItem.Title>Today's Activities</ListItem.Title></ListItem.Content>}
        isExpanded={activitiesExpanded}
        onPress={() => setActivitiesExpanded(!activitiesExpanded)}
      >
        {activitiesExpanded && (
          <View>
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.taskContainer}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <CheckBox
                    checked={selectedTasks[item.id]}
                    onPress={() => handleTaskSelect(item.id)}
                  />
                  <TouchableOpacity onPress={handleImageUpload}>
                    <Icon name="camera" type="feather" />
                  </TouchableOpacity>
                  {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                  )}
                </View>
              )}
            />
          </View>
        )}
      </ListItem.Accordion>

      {/* Today's Mood Checker Accordion */}
      <ListItem.Accordion
        content={<ListItem.Content><ListItem.Title>Today's Mood Checker</ListItem.Title></ListItem.Content>}
        isExpanded={moodExpanded}
        onPress={() => setMoodExpanded(!moodExpanded)}
      >
        {moodExpanded && (
          <View>
            {!moodQuestionsVisible ? (
              <View style={styles.emojiContainer}>
                {emojis.map((emoji, index) => (
                  <TouchableOpacity key={index} onPress={() => handleMoodSelect(emoji)}>
                    <Text style={styles.emoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.questionContainer}>
                <Text style={styles.question}>How many hours did you sleep last night?</Text>
                <FlatList
                  data={[6, 7, 8, 9, 10]}
                  horizontal
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.option} onPress={() => setSleepTime(item)}>
                      <Text style={styles.optionText}>{item} hrs</Text>
                    </TouchableOpacity>
                  )}
                />
                <Button title="Submit" onPress={handleSubmitMood} />
              </View>
            )}

            {finalMessage !== '' && (
              <View style={styles.finalMessageContainer}>
                <Text style={styles.finalMessage}>{finalMessage}</Text>
                <Text style={styles.motivation}>
                  Remember, every day is a new opportunity to be better than yesterday!
                </Text>
              </View>
            )}
          </View>
        )}
      </ListItem.Accordion>
    </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  taskTitle: {
    fontSize: 18,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  emoji: {
    fontSize: 30,
  },
  questionContainer: {
    marginVertical: 20,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  optionText: {
    fontSize: 16,
  },
  finalMessageContainer: {
    padding:40,
    marginTop: 20,
    alignItems: 'center',
  },
  finalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  motivation: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default DailyLogs;
