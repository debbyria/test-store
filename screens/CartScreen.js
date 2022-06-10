import { View, StyleSheet, Image, Text } from "react-native";

export default function CartScreen({ navigation }) {
  const data = {
    id: 1,
    name: "Baju Gemes",
    imageUrl: "https://im.uniqlo.com/global-cms/spa/res194a8fb124089fd98ae2d8172e500917fr.jpg",
    price: 149000
  }
  return (
    <>
      <View style={{ flex: 1, alignItems: "center" }}>

        <View style={styles.cardContainer}>
          <View>
            <Image source={{ uri: data.imageUrl }} style={{ width: 80, height: 80 }} />
          </View>
          <View style={styles.content}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{data.name}</Text>
            <Text style={{ fontSize: 14, marginVertical: 5 }}>Size: S</Text>
            <Text style={{ fontSize: 14 }}>Rp {data.price}</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 30,
    borderRadius: 5
  },
  content: {
    marginHorizontal: 10,
  }
})