import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from '../screen/MapScreen';
import QuestList from '../screen/QuestList';
import UserProfile from '../screen/UserProfile';
import {COLORS} from '../asset/color/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignupForm from '../screen/SignUp';
import LoginForm from '../screen/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconname: any;

          if (route.name === 'HomeScreen') {
            iconname = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MapScreen') {
            iconname = focused ? 'map' : 'map-outline';
          } else if (route.name === 'QuestList') {
            iconname = focused ? 'view-list' : 'view-list-outline';
          } else if (route.name === 'UserProfile') {
            iconname = focused ? 'account-circle' : 'account-circle-outline';
          }

          return (
            <MaterialCommunityIcons name={iconname} color={color} size={28} />
          );
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.dark_border,
        tabBarStyle: {
          backgroundColor: COLORS.light_primary,
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          borderRadius: 20,
          elevation: 15,
          height: 45,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="QuestList" component={QuestList} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
