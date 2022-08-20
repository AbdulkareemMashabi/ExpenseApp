import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecentExpenses from "./Components/RecentExpenses";
import AllExpenses from "./Components/AllExpenses";
import { Ionicons } from "@expo/vector-icons";
import AddExpense from "./Components/AddExpense";
import EditExpense from "./Components/EditExpense";
import { store } from "./redux/Store";
import { Provider } from "react-redux";
export default function App() {
  const BottomTab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const TabNaV = () => {

    return (
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "blue" },
          tabBarActiveTintColor: "orange",
          tabBarInactiveTintColor: "white",
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
        }}
      >
        <BottomTab.Screen
          name="Recent Expenses"
          component={RecentExpenses}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass-outline" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="All Expenses"
          component={AllExpenses}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  };
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "blue" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="Home"
              component={TabNaV}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add Expense"
              component={AddExpense}
              options={{ headerTitleAlign: "center", headerBackVisible: false }}
            />
            <Stack.Screen
              name="Edit Expense"
              component={EditExpense}
              options={{ headerTitleAlign: "center" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
