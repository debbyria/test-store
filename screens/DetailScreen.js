import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView, Image, Dimensions, StyleSheet } from "react-native"
import { RadioButton, Button, Provider, Modal, Portal } from 'react-native-paper';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DetailScreen({ navigation, route }) {
  const [gender, setGender] = useState("pria")
  const [size, setSize] = useState("small")
  const [data, setData] = useState("")

  // MODAL
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const fid = route.params.fid

  async function getDetailData() {
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((doc) => {
      if (doc.data().fid === fid) {
        setData(doc.data())
      }
    });
  }

  async function addToDb() {
    try {
      let email
      await auth.onAuthStateChanged(user => {
        email = user.email
      })

      const docRef = await addDoc(collection(db, "carts"), {
        email,
        gender,
        size,
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price
      });
      console.log("Document written with ID: ", docRef.id);

      showModal()

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  useEffect(() => {
    getDetailData()
  }, [])

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ width: windowWidth, alignItems: "center" }}>
            <Image style={{ width: 200, height: 200 }} source={{ uri: data.imageUrl }} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.productName}>{data.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5 }}>Rp {data.price}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine}></View>

        {/* CHOOSE GENDER */}
        <View style={styles.optionContainer}>
          <Text style={styles.selectTitle}>Pilih jenis kelamin</Text>

          <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="pria" />
              <Text style={{ fontSize: 16 }}>Pria</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="wanita" />
              <Text style={{ fontSize: 16 }}>Wanita</Text>
            </View>
          </RadioButton.Group>
        </View>
        {/* CHOOSE SIZE */}
        <View style={styles.optionContainer}>
          <Text style={styles.selectTitle}>Pilih ukuran</Text>
          <RadioButton.Group onValueChange={newValue => setSize(newValue)} value={size}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="S" />
                <Text style={{ fontSize: 16 }}>S</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="M" />
                <Text style={{ fontSize: 16 }}>M</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="L" />
                <Text style={{ fontSize: 16 }}>L</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="XL" />
                <Text style={{ fontSize: 16 }}>XL</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.buttonContainer}>
          <Button icon="plus" mode="contained" color="#3A5BA0" style={{ width: "90%" }} onPress={addToDb}>Tambah Ke Keranjang</Button>
        </View>
      </ScrollView >

      {/* MODAL */}
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} style={{ alignItems: "center" }} contentContainerStyle={containerStyle}>
            <Image source={require("../assets/icons8-favorite-cart-100.png")} style={{ width: 120, height: 120 }} />
            <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 5 }}>Produk berhasil ditambahkan</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>Cek keranjangmu untuk lihat produk</Text>
            <Button mode="contained" color="#3A5BA0" style={{ marginVertical: 20, width: "80%" }}
              onPress={() => {
                navigation.navigate('Cart')
              }}
            >Lihat Keranjang</Button>
          </Modal>
        </Portal>
      </Provider>
    </>
  )
}
const containerStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: 'white',
  padding: 20,
  height: "50%",
  width: "90%",
};
const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  optionContainer: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderColor: "#7F8487",
    width: windowWidth
  },
  selectTitle: {
    fontWeight: "500",
    fontSize: 16
  },
  productName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500"
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  }
})