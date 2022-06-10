import { useState } from "react";
import { StyleSheet, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, View } from "react-native"
import { Searchbar } from "react-native-paper"

export default function ShopScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      id: 1,
      name: "Baju Gemes",
      imageUrl: "https://im.uniqlo.com/global-cms/spa/res194a8fb124089fd98ae2d8172e500917fr.jpg",
      price: 149000
    },
    {
      id: 2,
      name: "Baju Gemes",
      imageUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/452289/item/idgoods_01_452289.jpg?width=1600&impolicy=quality_75",
      price: 149000
    },
    {
      id: 3,
      name: "Baju Gemes",
      imageUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/448970/item/idgoods_09_448970.jpg?width=1600&impolicy=quality_75",
      price: 399000
    }
  ]
  return (
    <>
      <Searchbar
        placeholder="Cari Produk"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {
                id: item.id
              })
            }}
            style={styles.cardContent} >
            <Image style={{ width: 140, height: 140, resizeMode: "contain" }}
              source={{ uri: item.imageUrl }} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>Rp {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  cardContent: {
    padding: 10,
    margin: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "500"
  },
  price: {
    fontSize: 16
  }
})