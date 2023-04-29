import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screen/Home";
import { NewHabit } from "../screen/NewHabit";
import { Habits } from "../screen/Habits";

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="newHabits" component={NewHabit} />
      <Screen name="habit" component={Habits} />
    </Navigator>
  )
}