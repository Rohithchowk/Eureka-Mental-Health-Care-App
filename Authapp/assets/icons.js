import { AntDesign, Feather } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const icons = {
    index: (props) => <AntDesign name="home" size={26} {...props} />,
    DailyLogs: (props) => <Feather name="user" size={26} {...props} />,
    Games: (props) => <Ionicons name="game-controller-outline" size={24} {...props} />,
    Doctor: (props) => <FontAwesome6 name="user-doctor" size={24} {...props} />,
    profile: (props) => <AntDesign name="user" size={26} {...props} />, // Changed profile icon
};
