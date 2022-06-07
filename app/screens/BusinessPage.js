import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
import { useEffect, useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
  Dimensions,
  Linking,
  Alert,
  ImageBackground,
} from "react-native";
import { dataBase } from "../../firebase";
import { doc } from "../../firebase";

const SPACING = 8,
  cellWidth = 250,
  cellHeight = 300;
const FULL_SIZE = cellWidth + SPACING * 2;

const cSection = [];

const dialCall = (number) => {
  let phoneNumber = "";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

export default function BusinessPage({ route, navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [SearchValue, setSearchValue] = React.useState("");
  const [emptyList, setEmptyList] = React.useState([]);
  const [CommentsList, setCommentsList] = React.useState([]);
  const {
    name,
    city,
    pic,
    category,
    address,
    phone,
    rate,
    job,
    key,
    account,
    id,
    id_pure,
  } = route.params;
  // console.log("accepted3 ",account);
  // console.log("category" , key);
  // console.log("key", id);
  async function checkLogin() {
    if (account === undefined) {
      Alert.alert("Unable to Rate", "Log in or register to rate", [
        { text: "Cancel", style: "cancel" },
        { text: "Log in!", onPress: () => navigation.navigate("FirstPage") },
      ]);
    } else {
      navigation.navigate("RatingPage", { account, key, phone });
    }
  }

  //-------------------------CommentList----------------------------------
  async function getList() {
    console.log(id_pure);
    // const ref = dataBase.collection(key).doc(id).collection("rating");
    const ref = dataBase.collection(key).doc(id_pure).collection("rating");
    //const ref2 = ref.doc(id);
    //
    const snapshot = await ref.get();
    let tmp = [];
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      tmp.push(doc.data());
      //console.log(tmp);
    });
  }
  useEffect(() => {
    getList();
  }, []);
  //----------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/back.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        blurRadius={25}
      />
      <View style={styles.Header}>
        <View style={styles.Topper}>
          <View style={styles.optButt}>
            <AntDesign
              name="back"
              size={34}
              color="#222"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View width={"25%"}></View>
          <View width={"25%"}></View>
        </View>
      </View>
      <View style={{ justifyContent: "flex-start" }}>
        <View
          style={{
            backgroundColor: "dodgerblue",
            width: "95%",
            height: "26%",
            flexDirection: "row",
            borderRadius: 50,
            borderBottomLeftRadius: 0,
            shadowColor: "black",
            shadowOpacity: 1,
            shadowOffset: { width: 2, height: 2 },
            elevation: 50,
            alignSelf: "center",
          }}
        >
          <Image source={pic} style={styles.profileIcon} />
          <View
            style={{
              flex: 1,
              right: SPACING,
              top: SPACING,
              alignItems: "center",
            }}
          >
            <Text style={styles.mainName}>{name}</Text>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.subName}> עיר: </Text>
                <Text style={{ fontSize: 15 }}>{city}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.subName}> קטוגוריה: </Text>
                <Text style={{ fontSize: 15 }}>{category}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={styles.subName}> כתובת: </Text>
                <Text style={{ fontSize: 15 }}>{address}</Text>
              </View>
              <TouchableOpacity
                style={{
                  borderColor: "black",
                  borderBottomWidth: 0.5,
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
                onPress={() => dialCall(phone)}
              >
                <Text style={styles.subName}> תלפון:</Text>
                <Text style={{ fontSize: 15 }}> {phone}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            top: SPACING,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "15%",
          }}
        >
          <View
            style={{
              height: cellHeight * 0.3,
              width: "50%",
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.5)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 30,
              margin: SPACING * 2,
            }}
          >
            <AirbnbRating
              count={5}
              reviews={["רע מאוד", "רַע", "בסדר", "טוב", "טוב מאוד"]}
              defaultRating={Math.floor(rate)}
              size={25}
              isDisabled={true}
            />
          </View>
          <TouchableOpacity
            style={styles.rateButton}
            onPress={() => checkLogin()}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                alignSelf: "center",
              }}
            >
              Rate
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "700",
                alignSelf: "flex-end",
                right: 10,
              }}
            >
              Us!
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: "blue",
              fontSize: 25,
              fontWeight: "700",
              alignSelf: "flex-end",
              right: SPACING,
            }}
          >
            תיאור עלינו:
          </Text>
          <View style={styles.Description}>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                alignSelf: "flex-end",
                margin: SPACING,
              }}
            >
              {job}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: "blue",
              fontSize: 25,
              fontWeight: "700",
              alignSelf: "flex-end",
              right: SPACING,
            }}
          >
            הערות:
          </Text>
          <FlatList
            data={CommentsList}
            height={140}
            width={"90%"}
            backgroundColor={"rgba(255, 255, 255, 0.6)"}
            borderColor={"blue"}
            borderWidth={0.5}
            borderRadius={30}
            alignSelf={"center"}
            scrollIndicatorInsets={false}
            contentContainerStyle={{
              padding: SPACING,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    height: 50,
                    width: "90%",
                    backgroundColor: "#81daf5",
                    alignSelf: "center",
                    borderRadius: 30,
                    margin: SPACING,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{ color: "black", right: SPACING, fontSize: 18 }}
                  >
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            alignItems: "flex-end",
            marginRight: SPACING * 2,
            marginTop: SPACING,
          }}
        >
          <View style={{ margin: SPACING * 0.5, flexDirection: "row-reverse" }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              תאריך הצטרפות :
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              {" Date Here"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Reports")}
            style={{
              margin: SPACING * 0.5,
              borderRadius: 15,
              backgroundColor: "red",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 15,
                borderWidth: 0.3,
                borderRadius: 15,
                padding: 3,
                color: "white",
              }}
            >
              להגיש תלונה
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.5 : 0,
  },
  Header: {
    height: "5%",
    justifyContent: "flex-start",
  },
  Topper: {
    height: 30,
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
  },
  optButt: {
    width: 35,
    height: 35,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 90,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "#b8e2f2",
    margin: 15,
  },
  mainName: {
    fontSize: 25,
    fontWeight: "800",
    color: "white",
    paddingTop: SPACING,
  },

  subName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    alignSelf: "flex-end",
  },
  rateButton: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "rgba(50, 255, 30, 0.7)",
    justifyContent: "center",
  },
  Description: {
    width: "90%",
    height: 100,
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderColor: "blue",
    alignSelf: "center",
  },
});
