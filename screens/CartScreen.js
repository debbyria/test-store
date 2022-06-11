import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";

export default function CartScreen({ navigation }) {

  const [data, setData] = useState("")

  async function getCart() {
    let email
    await auth.onAuthStateChanged(user => {
      email = user.email
    })

    const querySnapshot = await getDocs(collection(db, "carts"));

    let tempData = []
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        tempData.push(doc.data())
      }
    });
    setData(tempData)
  }

  useEffect(() => {
    getCart()
  })

  return (
    <>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.cardContainer}>
              <View>
                <Image source={{ uri: item.imageUrl }} style={{ width: 80, height: 80 }} />
              </View>
              <View style={styles.content}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ fontSize: 14, marginVertical: 5 }}>Size: {item.size}</Text>
                <Text style={{ fontSize: 14 }}>Rp {item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />
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
    marginVertical: 15,
    borderRadius: 5
  },
  content: {
    marginHorizontal: 10,
  }
})