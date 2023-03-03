import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
const baseUrl = "https://reqres.in";
function User({ userObject }) {
  return (
    <View>
      <Image
        source={{ uri: userObject.avatar }}
        style={{ width: 128, height: 128, borderRadius: 64 }}
      />
      <Text style={{ textAlign: "center", color: "white" }}>
        {`${userObject.first_name} ${userObject.last_name}`}
      </Text>
    </View>
  );
}
export default RunAxios = (props) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeUserIdHandler = () => {
    setUserId((userId) => (userId === 12 ? 1 : userId + 1));
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/api/users/${userId}`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setUser(response.data.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancelled");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  }, [userId]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapperStyle}>
        {!isLoading && !hasError && user && <User userObject={user} />}
      </View>
      <View style={styles.wrapperStyle}>
        {isLoading && <Text> Loading </Text>}
        {!isLoading && hasError && <Text> An error has occurred </Text>}
      </View>
      <View>
        <TouchableOpacity
          onPress={changeUserIdHandler}
          disabled={isLoading}
          style={styles.buttonStyles}
        >
          <Text style={styles.btnTxt}>Load User</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          disabled={isLoading}
          style={styles.buttonStyles}
        >
          <Text style={styles.btnTxt}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  wrapperStyle: {
    minHeight: 128,
  },
  btnTxt: {
    color: "#fff",
    padding: 10,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  buttonStyles: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 15,
    color: "white",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 64,
  },
});
