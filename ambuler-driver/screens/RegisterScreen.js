import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
// EXAMPLE - API_URL="http://192.168.170.61:3000/"
const API_URL="http://192.168.170.61:3000/"

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [snackbox, setSnackbox] = useState("");
  async function onClickLogin(e) {

    if (email.trim() === "" || password.trim() === "" || name.trim() === "" || number.trim() === "" ) {
      setSnackbox("FIELD EMPTY");
    } else {
      const message = await fetch(API_URL + "api/driver/register",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email.trim(),password:password.trim(),name:name.trim(),number:number.trim()})
      }).then(e => e.json()).catch(err =>{})
      
      if(message.error){
        setSnackbox(message.message)
      }else{
        setSnackbox(message.message)
        navigation.navigate("login")
      }

    }
  }
  return (
    <View style={styles.container}>
      <View>
      <Text style={{ color: "white", fontSize: 30 }}>{snackbox}</Text>
      </View>
      <View>
        <Image
          source={require("../assets/logo2.png")}
          style={{ width: 150, height: 60 }}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          placeholder="Name..."
          value={name}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          placeholder="Number..."
          value={number}
          placeholderTextColor="#fff"
        /> 
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email..."
          value={email}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="password..."
          value={password}
          placeholderTextColor="#fff"
        />

        <Text onPress={onClickLogin} style={styles.text_register}>
          REGISTER
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A4041",
    alignItems: "center",
    justifyContent: "center",
  },
  text_register: {
    color: "#1A4041",
    backgroundColor: "#fff",
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 50,
  },
  text_login: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    borderColor: "white",
    fontSize: 20,
  },
});
