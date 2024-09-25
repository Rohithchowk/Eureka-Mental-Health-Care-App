import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import ProtectedRoute from "../../components/ProtectedRoute";
export default function RootLayout() {
    return (
        <ProtectedRoute>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'tomato', 
                tabBarInactiveTintColor: 'gray', 
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    headerShown: false, 
                    title: "Home", 
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    headerShown: false, 
                    title: "Profile", 
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="profile" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="settings" 
                options={{
                    headerShown: false, 
                    title: "Settings", 
                    tabBarIcon: ({ color }) => (
                        <Feather name="settings" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="Doctor" 
                options={{
                    headerShown: false, 
                    title: "Doctor", 
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="user-doctor" size={24} color={color} />
                    )
                }} 
            />
        </Tabs>
        </ProtectedRoute>
    );
}
