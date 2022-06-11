import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image, Dimensions, ImageBackground, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        alert("Register Succeed")
        navigation.navigate("Login")
        console.log(user.email)
      })
      .catch(error => alert(error.message))
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={{ uri: "https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1108.jpg?t=st=1654868037~exp=1654868637~hmac=41ce423e6bd4b9114a667a25a7c9f1f3ca192611a0717e65b48beef1c41b3394&w=900" }} style={styles.background}>
            <View style={{ flex: 2 }}>
              <Text style={styles.register} >Form Register</Text>
            </View>
            <View style={styles.formRegister}>
              <TextInput style={styles.textInputTop} value={name} onChangeText={setName}
                placeholder="Nama Lengkap" />
              <TextInput style={styles.textInput} value={email} onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address" />
              <TextInput style={styles.textInput} value={password} onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password" />
              <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber}
                placeholder="Nomor HP"
                keyboardType="phone-pad"
                textContentType="telephoneNumber" />
              <Pressable style={styles.loginButton}
                onPress={handleSignUp}>
                <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Buat Akun</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </ScrollView >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    width: windowWidth,
    height: windowHeight
  },
  register: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "bold"
  },
  formRegister: {
    flex: 8,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center"
  },
  textInputTop: {
    width: "90%",
    height: 40,
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 60,
    paddingHorizontal: 10,
    fontSize: 17
  },
  textInput: {
    width: "90%",
    height: 40,
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 10,
    fontSize: 17
  },
  loginButton: {
    backgroundColor: "#3A5BA0",
    width: "90%",
    height: 40,
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  }
})