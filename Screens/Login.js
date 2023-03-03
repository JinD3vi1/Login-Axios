import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const navigation = useNavigation();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  //console.log(isValidUser);
  const InvalidCred = () =>
    Alert.alert("Ops!", "Invalid Credentials, try again?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Exiting");
        },
        style: "cancel",
      },
      {
        text: "yes",
        onPress: () => {
          setusername("");
          setpassword("");
        },
      },
    ]);

  function checkCredentials() {
    if (username == "user" && password == "123") {
      navigation.navigate('Home');
    } else {
      InvalidCred();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.LoginStyle}>
        <Text
          style={{
            color: "#d62828",
            fontSize: 20,
            fontWeight: "bold",
            margin: 40,
            textShadowColor: "#f77f00",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 5,
          }}
        >
          Simple Login + AXIOS App
        </Text>
        <TextInput
          style={styles.TitleClr}
          placeholder="Enter your username.."
          onChangeText={(ntext) => setusername(ntext)}
          value={username}
        ></TextInput>
        <TextInput
          style={styles.TitleClr}
          placeholder={"password for " + username}
          secureTextEntry={true}
          onChangeText={(npass) => setpassword(npass)}
          value={password}
        ></TextInput>
      </View>
      <View style={styles.FooterStyle}>
        <TouchableOpacity style={styles.BtnStyle} onPress={checkCredentials}>
          <Text style={styles.BtnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BtnStyle} onPress={()=>{
          setpassword('');
          setusername('');
        }}>
          <Text style={styles.BtnText}>Clear</Text>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            alignContent: "center",
            width: "100%",
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", margin: 10 }}>
            Copyright Ammad Farooq
          </Text>
          <Text style={{ color: "white", textAlign: "center" }}>
            Jin Tech | 2023
          </Text>
        </View>
      </View>
    </View>
  );
  useEffect(() => {
    Login, InvalidCred;
  });
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#003049",
    justifyContent: "center",
  },
  LoginStyle: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 80,
    padding: 30,
    backgroundColor: "#fcbf49",
  },
  TitleClr: {
    padding: 10,
    fontSize: 20,
    color: "#d62828",
    borderColor: "#6d6875",
    borderBottomWidth: 1,
    fontFamily: "Arial",
    margin: 10,
    width: "100%",
  },
  FooterStyle: {
    paddingTop: 20,
    flex: 2,
    backgroundColor: "#003049",
  },
  BtnStyle: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#f77f00",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fcbf49",
  },
  BtnText: {
    color: "#eae2b7",
    padding: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textWithShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
