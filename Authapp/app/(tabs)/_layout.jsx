import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import ProtectedRoute from "../../components/ProtectedRoute";
import TabBar from "../../components/TabBar";
import { StyleSheet,View,Text } from "react-native";

export default function RootLayout() {
    return (
        <ProtectedRoute>
        <Tabs
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleStyle: styles.title, 
          tabBarLabelStyle: styles.tabLabel, 
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="DailyLogs"
        options={{
          title: "Daily Logs",
          headerTitleStyle: styles.title,
          header: () => (
            <View style={styles.centeredContent}>
              <Text style={styles.title}>Daily Logs</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Games"
        options={{
          title: "Games",
          headerTitleStyle: styles.title,
          header: () => (
            <View style={styles.centeredContent}>
              <Text style={styles.title}>Games</Text>
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="Doctor"
        options={{
          title: "Doctor",
          headerTitleStyle: styles.title,
          header: () => (
            <View style={styles.centeredContent}>
              <Text style={styles.title}>Doctor</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleStyle: styles.title,
          header: () => (
            <View style={styles.centeredContent}>
              <Text style={styles.title}>Doctor</Text>
            </View>
          ),
        }}
      />
    </Tabs>
        </ProtectedRoute>
    );
}

const styles = StyleSheet.create({
    tabs: {
      marginBottom: -20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#41B3A2",
      marginTop:5
    },
    centeredContent: {
      flex: 1,
      justifyContent: "center", 
      alignItems: "center", 
    },
    tabLabel: {
      fontSize: 14,
      color: "#333",
    },
  });
  
  
  