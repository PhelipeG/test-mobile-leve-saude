import LogoMain from "@/assets/images/logo-main.jpg";
import { COLORS } from "@/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image source={LogoMain} style={styles.imageContainer} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Feedback Hub</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.background,
    padding: 20,
    alignItems: "center",
  },
  imageContainer:{
    width: 250,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
})