import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, View } from "react-native"
import { Searchbar } from "react-native-paper"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ShopScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([])

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "products"));

    let tempData = []
    querySnapshot.forEach((doc) => {
      tempData.push(doc.data())
    });
    setData(tempData)
  }

  useEffect(() => {
    getData()
  }, [])

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
                fid: item.fid,
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