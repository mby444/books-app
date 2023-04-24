import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import HomeStack from "../stack/HomeStack";
import Wishlist from "../screen/Wishlist";
import homeIcon from "../../assets/images/home-dark-icon.png";
import searchIcon from "../../assets/images/search-dark-icon.png";
import wishlistIcon from "../../assets/images/wishlist-dark-icon.png";
import settingIcon from "../../assets/images/setting-dark-icon.png";

const Drawer = createDrawerNavigator();

function MainDrawerHeader() {
  return <View style={styles.header}></View>;
}

function MainDrawerItem({ name, icon, text }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(name);
  };

  return (
    <Pressable style={styles.pressableItem} onPress={handlePress}>
      <View style={styles.iconItemContainer}>
        <Image style={styles.iconItem} source={icon} />
      </View>
      <View style={styles.textItemContainer}>
        <Text style={styles.textItem}>{text}</Text>
      </View>
    </Pressable>
  );
}

function DrawerItemList({ dataList }) {
  return (
    <>
      {dataList.map((data) => (
        <MainDrawerItem
          name={data.name}
          icon={data.icon}
          text={data.text}
          key={data.id}
        />
      ))}
    </>
  );
}

function MainDrawerContent() {
  const itemData = [
    { id: 1, name: "HomeStack", icon: homeIcon, text: "Home" },
    { id: 2, name: "Wishlist", icon: wishlistIcon, text: "Wishlist" },
  ];

  return (
    <View>
      <MainDrawerHeader />
      <DrawerItemList dataList={itemData} />
    </View>
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
        <Drawer.Screen name="Wishlist" component={Wishlist} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 64,
    backgroundColor: "#50B3F4",
    marginVertical: 0,
    marginBottom: 26,
  },
  pressableItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 26,
    paddingVertical: 16,
  },
  iconItem: {
    width: 30,
    height: 30,
  },
  textItemContainer: {
    paddingLeft: 12,
  },
  textItem: {
    fontSize: 18,
    color: "#000",
  },
});
