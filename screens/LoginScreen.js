import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image, Dimensions, ImageBackground, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        alert("Login Succeed")
        navigation.navigate("Shop")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      if (user) {
        navigation.navigate("Shop")
      }
    })
    return unsubscribe
  }, [])

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={{ uri: "https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1108.jpg?t=st=1654868037~exp=1654868637~hmac=41ce423e6bd4b9114a667a25a7c9f1f3ca192611a0717e65b48beef1c41b3394&w=900" }} style={styles.background}>
            <View style={{ flex: 4 }}>
              <Text style={styles.login} >Form Login</Text>
            </View>
            <View style={styles.formLogin}>
              <TextInput style={styles.textInputEmail} value={email} onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address" />
              <TextInput style={styles.textInput} value={password} onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password" />
              <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={{ color: "#FFFFFF", fontSize: 17 }}>Masuk</Text>
              </Pressable>
              <Text style={{ fontSize: 17, marginTop: 20, textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.navigate('Register')
                }}>Buat Akun</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
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
  login: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "bold"
  },
  formLogin: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center"
  },
  textInputEmail: {
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