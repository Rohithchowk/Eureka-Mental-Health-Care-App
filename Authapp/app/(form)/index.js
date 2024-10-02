import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Animated } from 'react-native';
import axios from 'axios';

// CircleSelector Component for Various Inputs
const CircleSelector = ({ label, value, setValue, options }) => {
  const animatedValues = options.map(() => new Animated.Value(1));

  const handlePress = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 1.2, // Scale up
      friction: 3, // Control the bounciness
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(animatedValues[index], {
        toValue: 1, // Scale back down
        friction: 3,
        useNativeDriver: true,
      }).start();
    });

    setValue(options[index].value); // Set the selected value
  };

  return (
    <View style={styles.selectorContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.circleContainer}>
        {options.map((option, index) => (
          <TouchableOpacity key={option.value} onPress={() => handlePress(index)}>
            <Animated.View
              style={[
                styles.circle,
                { transform: [{ scale: animatedValues[index] }] },
                value === option.value && styles.selectedCircle,
              ]}
            >
              <Text style={styles.circleText}>{option.label}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const App = () => {
  const [physicalActivity, setPhysicalActivity] = useState(null);
  const [screenTime, setScreenTime] = useState(null);
  const [nutritionScore, setNutritionScore] = useState(null);
  const [moodScore, setMoodScore] = useState(null);
  const [stressLevel, setStressLevel] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [goalSettingScore, setGoalSettingScore] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const data = {
        'Physical_Activity_Minutes': physicalActivity,
        'Screen_Time_Minutes': screenTime,
        'Nutrition_Score': nutritionScore,
        'Mood_Score': moodScore,
        'Stress_Level': stressLevel,
        'Energy_Level': energyLevel,
        'Sleep_Hours': sleepHours,
        'Goal_Setting_Score': goalSettingScore,
        'Gender': gender,
        'Age': Number(age),
      };

      const response = await axios.post('https://upgraded-barnacle-5649769v796cv567-5000.app.github.dev/predict', data);
      setPrediction(response.data.predicted_score);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Mental Health Score Prediction</Text>

        {/* Physical Activity Selector */}
        <CircleSelector
          label="Physical Activity"
          value={physicalActivity}
          setValue={setPhysicalActivity}
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
          ]}
        />

        {/* Screen Time Selector */}
        <CircleSelector
          label="Screen Time (minutes)"
          value={screenTime}
          setValue={setScreenTime}
          options={[
            { label: '2', value: 2 },
            { label: '4', value: 4 },
            { label: '6', value: 6 },
            { label: '8', value: 8 },
            { label: '10', value: 10 },
            { label: '12', value: 12 },
          ]}
        />

        {/* Nutrition Score Selector */}
        <CircleSelector
          label="Nutrition Score"
          value={nutritionScore}
          setValue={setNutritionScore}
          options={[
            { label: '🍔', value: 30 }, // Junk
            { label: '🥗', value: 60 }, // Healthy
            { label: '🍔+🥗', value: 90 }, // Mix
          ]}
        />

        {/* Mood Score Selector */}
        <CircleSelector
          label="Mood Score"
          value={moodScore}
          setValue={setMoodScore}
          options={[
            { label: '😢', value: 0 },
            { label: '😐', value: 15 },
            { label: '😊', value: 30 },
            { label: '😁', value: 45 },
            { label: '😃', value: 60 },
            { label: '🤩', value: 75 },
          ]}
        />

        {/* Stress Level Selector */}
        <CircleSelector
          label="Stress Level"
          value={stressLevel}
          setValue={setStressLevel}
          options={[
            { label: '😩', value: 20 },
            { label: '😓', value: 40 },
            { label: '😰', value: 60 },
            { label: '😱', value: 80 },
          ]}
        />

        {/* Energy Level Selector */}
        <CircleSelector
          label="Energy Level"
          value={energyLevel}
          setValue={setEnergyLevel}
          options={[
            { label: '😴', value: 20 }, // Weak
            { label: '😐', value: 40 }, // Medium
            { label: '😃', value: 60 }, // Healthy
            { label: '💪', value: 80 }, // Much Healthy
          ]}
        />

        {/* Sleep Hours Selector */}
        <CircleSelector
          label="Sleep Hours"
          value={sleepHours}
          setValue={setSleepHours}
          options={[
            { label: '2', value: 2 },
            { label: '4', value: 4 },
            { label: '6', value: 6 },
            { label: '8', value: 8 },
            { label: '10', value: 10 },
          ]}
        />

        {/* Goal Setting Score Selector */}
        <CircleSelector
          label="Goal Setting Score"
          value={goalSettingScore}
          setValue={setGoalSettingScore}
          options={[
            { label: '30', value: 30 },
            { label: '60', value: 60 },
            { label: '90', value: 90 },
            { label: '120', value: 120 },
          ]}
        />

        {/* Gender Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.circleContainer}>
            <TouchableOpacity onPress={() => setGender(1)}>
              <Animated.View
                style={[
                  styles.circle,
                  { transform: [{ scale: gender === 1 ? 1.2 : 1 }] },
                  gender === 1 && styles.selectedCircle,
                ]}
              >
                <Text style={styles.circleText}>Male</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender(0)}>
              <Animated.View
                style={[
                  styles.circle,
                  { transform: [{ scale: gender === 0 ? 1.2 : 1 }] },
                  gender === 0 && styles.selectedCircle,
                ]}
              >
                <Text style={styles.circleText}>Female</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Age Selector */}
        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            onChangeText={setAge}
            value={age}
            keyboardType="numeric"
          />
        </View>

        <Button title="Predict" onPress={handlePredict} />

        {prediction && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Predicted Mental Health Score: {prediction}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  selectorContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  circle: {
    width: 70, // Increased width
    height: 70, // Increased height
    borderRadius: 35, // Adjusted radius
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1, // Adjusted margin
  },
  selectedCircle: {
    backgroundColor: '#a5d6a7', 
  },
  circleText: {
    fontSize: 20, // Increased font size for emojis
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
