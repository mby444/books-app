import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import HomeStack from "../stack/HomeStack";
import Watchlist from "../screen/Watchlist";

const Drawer = createDrawerNavigator();

function MainDrawerContent() {
  return (
    <DrawerContentScrollView>
      
    </DrawerContentScrollView>
  );
}

export default function MainDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HomeStack"
        drawerContent={MainDrawerContent}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="Watchlist" component={Watchlist} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}