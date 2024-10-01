import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../(redux)/authSlice";
import { LineChart } from "react-native-chart-kit";
import SwitchToggle from "react-native-switch-toggle";

const screenWidth = Dimensions.get("window").width;

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const [isChart1, setIsChart1] = useState(true);

  const chart1Data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
        strokeWidth: 3,
      },
    ],
  };

  const chart2Data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, 
        strokeWidth: 3,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Logout Button positioned at the top right */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Toggle Switch as Header */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>{isChart1 ?"Monthly Analysis" : "Weekly Analysis"}</Text>
        <SwitchToggle
          switchOn={isChart1}
          onPress={() => setIsChart1(!isChart1)}
          containerStyle={styles.switchContainer}
          circleStyle={styles.switchCircle}
          backgroundColorOn="#4CAF50"
          backgroundColorOff="#FF5252"
          circleColorOff="#fff"
          circleColorOn="#fff"
        />
      </View>

      {/* User Info */}
      {user ? (
        <Text style={styles.text}>Email: {user.email}</Text>
      ) : (
        <Text style={styles.noUserText}>No User Logged In</Text>
      )}

      {/* Conditional Chart Rendering */}
      {isChart1 ? (
        <LineChart
          data={chart1Data}
          width={screenWidth - 50}
          height={220}
          chartConfig={styles.chartConfig}
          bezier
          style={styles.chartStyle}
        />
      ) : (
        <LineChart
          data={chart2Data}
          width={screenWidth - 50}
          height={220}
          chartConfig={styles.chartConfig}
          bezier
          style={styles.chartStyle}
        />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 40,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  noUserText: {
    fontSize: 18,
    marginBottom: 16,
    color: "gray",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    
    marginTop: 80, // Space for the logout button
  },
  toggleLabel: {
    fontSize: 18,
    color: "#333",
  },
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#ddd",
  },
  switchCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#fff",
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  chartConfig: {
    backgroundColor: "#0000",
    backgroundGradientFrom: "#FFEB3B",
    backgroundGradientTo: "#03A9F4",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
