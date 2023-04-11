import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "../stack/HomeStack";
import Watchlist from "../screen/Watchlist";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="Watchlist" component={Watchlist} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}