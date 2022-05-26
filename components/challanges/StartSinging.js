import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as FaceDetector from "expo-face-detector";
import { LinearGradient } from "expo-linear-gradient";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import { ScrollView } from "react-native-gesture-handler";
import constants from "../../assets/constants";
import apiDetails from "../../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import { BlurView } from "expo-blur";
import Images from "../../assets/Images";
import { ModelView } from "../Components/ModeLView";
import Slider from '@react-native-community/slider';
import { ProgressBar, Colors } from 'react-native-paper';


// import Slider from "react-native-slider";

const StartSinging = ({ navigation, route }) => {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [showBlurEffect, setShowBlurEffect] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [startButton, setStartButton] = useState(true);
  const [songDetails, setSongDetails] = useState(true);
  const [stopButton, setStopButton] = useState(null);
  const [songLysics, setSongLysics] = useState(null);
  const [counting, setCounting] = useState(null);
  const [status, setStatus] = React.useState({});
  const [hideView, setHideView] = useState(true);
  const [sideView, setSideView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("2:30 min");
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [image, setImage] = useState(null);
  const [sliderValue, setSliderValue] = useState(20);
  const [singAgain, setSingAgain] = useState(false);
  const [songDetailsData, setSongDetailsData] = useState({});
  const [show, setShow] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [wait, setWait] = useState(0);
  const video = React.useRef(null);
  var userDetails = null;
  var type_sing = "";
  var id = "";

  id = route.params?.id;
  type_sing = route.params?.type;

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  function callApiForPostVideo(postVideo, image_url) {
    setProgressUpload(0.1);
    setWait(0);
    AsyncStorage.getItem("userInfo").then((user) => {

      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        const formData = new FormData();
        formData.append("post_by", d.id);
        formData.append("challenge_id", id);

        formData.append("video", {
          name: "omgitsme.mov",
          uri: postVideo,
        });

        formData.append("thumbnail", {
          uri: image_url,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        const headers = {
          "Content-Type": "multipart/form-data",
        };

        a.getClient(d.token)
          .post(a.add_post, formData, {
            headers, onUploadProgress: ({ loaded, total }) => {
              let load = loaded / total;
              setProgressUpload(load);
              console.log(load);
              if(load == 1)
                setWait(load);
            }
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.status == "200") {
              alert("Video is uploaded");
              //navigation.navigate("HomeFeed");
              // setData(response.data.Songs.data);
            } else {
              console.log(response);
              // alert('Oops something went wrong');
            }
          }).catch(error => console.log(error.message));
      }

    }).catch(error => console.log(error.message));
  }

  function songDetails_fun(id) {
    const a = new apiDetails();
    a.getClient(userDetails.token)
      .post(a.get_songById, {
        song_id: id
      })
      .then((response) => {
        if (response.data.status == "200") {
          setSongDetailsData(response.data.Songs[0]);
        } else {
          console.log(response);
        }
      }).catch(error => console.log(error.message));
  }


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
    AsyncStorage.getItem("userInfo").then((user) => {
      var d = JSON.parse(user);
      userDetails = d;
      if (route.params?.type == "song") {
        songDetails_fun(route.params?.id);
      }
    }).catch(error => console.log(error.message));
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (hasAudioPermission === null) {
    return <View />;
  }

  if (hasAudioPermission === false) {
    return <Text>No access to Microphone</Text>;
  }

  const takeVideo = async () => {
    setCounting(Date.now());
    if (camera) {
      const data = await camera.recordAsync({
        maxDuration: 10,
      });
      setRecord(data.uri);
      generateThumbnail(data.uri);
    }
  };

  const stopVideo = async () => {
    var end = Moment(Date.now());
    var duration = Moment.duration(end.diff(counting));
    setTime(Number(duration.as("minutes").toFixed(2)));
    camera.stopRecording();
  };

  const loadView = () => {
    if (hideView) {
      return;
    } else {
      return (
        <View
          style={{
            marginTop: "-20%",
            // zIndex: 1,
            // justifyContent: "center",
            // alignContent: "center",
            // alignItems: "center",
            // backgroundColor:'red',
            // marginRight:0,
            width: 320
          }}
        >
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: record,
            }}
            shouldPlay={true}
            useNativeControls
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={{ flexDirection: "row", marginTop: 30, justifyContent: "space-between" }}>

            <TouchableOpacity
              style={[styles.sing_again]}
              onPress={() => {
                startRecording();
                //setSingAgain(true)
              }}
            >
              <Text
                style={[
                  styles.center,
                  {
                    color: "#fff",
                    margin: 13,
                    fontWeight: "500",
                    fontSize: 15,
                  },
                ]}
              >
                Sing Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.signup]}
              onPress={() => {
                callApiForPostVideo(record);
              }}
            >
              <LinearGradient
                style={{ borderRadius: 15 }}
                colors={["#CE72F6", "#9C71FE", "#7572FF"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              >

              </LinearGradient>
              <LinearGradient
                style={[{
                  // backgroundColor: 'red',
                  width: 140,
                  height: 45,
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center"
                }]}
                colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <TouchableOpacity
                  style={[styles.signup]}
                  onPress={() => {
                    callApiForPostVideo(record);
                  }}
                >


                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                      style={[
                        styles.center,
                        {
                          color: "#fff",
                          fontWeight: "500",
                          fontSize: 15,
                          height: 20,
                          // backgroundColor:'red'
                        },
                      ]}
                    >
                      Post Video
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  <ModelView
    transparent={true}
    visible={show}
    onRequestClose={() => {
      setSingAgain(false);
    }}
    lableTopOne="Sing Again"
    lableBottomOne="Follow"
    lableBottomTwo=""
    lableBottomThree="Exit Recording"
    buttonText="Cancel"
    onPress={() => closeModal()}
    ModalBottomView={[{ flexDirection: "row" }]}
    lableTopOnePress={() => {
      openReportModal();
      closeModal();
    }}
    lableBottomOnePress={() => {
      addFollowingApi();
      closeModal();
    }}
  />
  const generateThumbnail = async (record) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(record, {
        time: 15000,
      });
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  const startRecording = () => {
    setStopButton(true);
    setStartButton(null);
    setSideView(null);
    setSongLysics(true);
    setSongDetails(null);
    setHideView(true);
    setRecord(null);
    setImage(null);
    takeVideo();
  };

  const stopRecording = () => {
    setStopButton(null);
    setStartButton(null);
    setSideView(null);
    setSongLysics(null);
    setSongDetails(null);
    setHideView(true);
    setShowBlurEffect(true);
    stopVideo();
  };

  return (
    <BlurView intensity={95} style={[{
      width: "100%",
      height: "100%",

      //  marginTop:Platform.OS=='ios'?-47:0
    }]}>

      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            height: 70,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowBlurEffect(null);
              setSideView(true);
              setSongLysics(null);
              setSongDetails(true);
            }}
          >
            <Image
              style={{ width: 15, height: 15, marginTop: 4 }}
              source={require("../../assets/images/cross_white.png")}
            />
          </TouchableOpacity>
          <View
            style={{ width: "90%", alignContent: "center", alignItems: "center" }}
          >
            <Text style={styles.heading}>{songDetailsData.title}</Text>
            <Text style={styles.subHeading}>{songDetailsData.genere}</Text>
          </View>
        </View>

        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
        // onFacesDetected={handleFacesDetected}
        // faceDetectorSettings={{
        //   mode: FaceDetector.Constants.Mode.fast,
        //   detectLandmarks: FaceDetector.Constants.Landmarks.none,
        //   runClassifications: FaceDetector.Constants.Classifications.none,
        //   minDetectionInterval: 100,
        //   tracking: true,
        // }}
        >
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View> */}
        </Camera>

        {sideView && (
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              style={[styles.itemsStyle]}
            >
              <Image
                style={{ width: 28, height: 25 }}
                source={require("../../assets/images/camera_flip.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowBlurEffect(true);
              }}
              style={[styles.itemsStyle]}
            >
              <Image
                style={{ width: 28, height: 22 }}
                source={require("../../assets/images/volumn.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.itemsStyle]}>
              <Image
                style={{ width: 27, height: 27 }}
                source={require("../../assets/images/smiles_icon.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.itemsStyle]}>
              <Image
                style={{ width: 27, height: 27 }}
                source={require("../../assets/images/gallery_images.png")}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            zIndex: 1,
            position: "absolute",
            top: 30,
            left: 10,
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              style={{ width: 25, height: 25, marginTop: 4 }}
              source={require("../../assets/images/cross_white.png")}
            />
          </TouchableOpacity>
        </View>

        {showBlurEffect && (
          <View
            style={{
              zIndex: 1,
              position: "absolute",
              height: "100%",
              width: "100%",
              flex: 1,
            }}
          >
            <Image
              style={{
                height: "100%",
                position: "absolute",
                width: "100%",
                opacity: 0.8,
                backgroundColor: "#000",
              }}
              source={require("../../assets/images/blur_bg.png")}
            />
            <View
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                backgroundColor: 'voilet',
                opacity: 0.6,
                backgroundColor: "#000",
              }}
            />
            <View
              style={{
                position: "absolute",
                // backgroundColor:'blue',
                flex: 1,
                flexDirection: "column",
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: "100%",
              }}
            >
              <View
                style={[
                  styles.container,
                  {
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginTop: 30,
                    marginLeft: 25,
                    marginRight: 20,
                  },
                ]}
              >
                <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowBlurEffect(null);
                      setSideView(true);
                      setSongLysics(null);
                      setSongDetails(true);
                    }}
                  >
                    <Image
                      style={{ width: 15, height: 15, marginTop: 24 }}
                      source={require("../../assets/images/cross_white.png")}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "90%",
                      alignItems: "center",
                      marginTop: 24
                    }}
                  >
                    <Text style={styles.heading}>{songDetailsData.title}</Text>
                    <Text style={styles.subHeading}>{songDetailsData.genere}</Text>
                  </View>
                  {/* <TouchableOpacity style={{ right: 0 }} onPress={() => {
                  setShowBlurEffect(null);
                  setSideView(true);
                  setSongLysics(null);
                  setSongDetails(true);
                }}>
                  <Image style={{ width: 15, height: 15, marginTop: 4 }} source={require('../../assets/images/cross_white.png')} />
                </TouchableOpacity> */}
                </View>

                {songDetails && (
                  <View
                    style={{
                      flex: 1,
                      //  backgroundColor:'red',
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 94, height: 94 }}
                      source={{ uri: songDetailsData.artist }}
                    />
                    <Text style={styles.song_title}>{songDetailsData.artist}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setStopButton(true);
                        setShowBlurEffect(true);
                        setStartButton(null);
                        setSideView(null);
                        setSongLysics(true);
                        setSongDetails(null);
                      }}
                    >
                      <Text style={styles.song_subtitle}>
                        Tap start to singing with lyrics.
                      </Text>
                    </TouchableOpacity>
                    <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Slider
                        maximumValue={100}
                        minimumValue={0}
                        minimumTrackTintColor="#77A1D3"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={sliderValue}
                        onValueChange={(sliderNewValue) => setSliderValue({ sliderNewValue })}
                        style={{ width: 300, height: 40 }}
                      />

                    </View>

                  </View>

                )}

                {songLysics && (
                  <View style={{ flex: 1, zIndex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {/* <View style={{ alignContent: "center", alignItems: "center" }}> */}
                      <Text style={styles.song_lysics}>
                        Tainu takdi rawaan{"\n"}
                        Naina ‘ch tere main vasdi ravaan{"\n"}
                        Paagal main khud nu banaunda ravaan{"\n"}
                        Tu hansdi rave, main hansanda ravaan{"\n"}
                        Tainu takda ravaan
                        {"\n"}
                        {"\n"}
                        Ishq duaavan jaane kab aave{"\n"}
                        Ishq duaavan aave jab aave{"\n"}
                        Main ta kol tere rehna{"\n"}
                        Main ta kol tere rehna{"\n"}
                        Main taa baitha kol tere…{"\n"}
                        {"\n"}
                        {"\n"}
                        Tainu takda ravaan{"\n"}
                        Baaton pe teri hansda ravaan{"\n"}
                        Pagal main khud nu banaanda ravaan{"\n"}
                        Tu hansdi rave, main hansanda ravaan{"\n"}
                        Tenu takda ravan (x2)
                      </Text>
                      {/* </View> */}
                    </ScrollView>
                  </View>
                )}

                {image && (
                  <View
                    style={{
                      marginTop: "-20%",
                      zIndex: 1,
                      width: '100%',
                      justifyContent: "center",
                      // alignContent: "center",
                      alignItems: "center",
                      // backgroundColor:'cyan',
                      marginRight: 20
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setHideView(false);
                        setImage(null);
                        setStopButton(null);
                        setShowBlurEffect(true);
                        setStartButton(true);
                        setSideView(null);
                        setSongLysics(null);
                        setSongDetails(null);
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: 'orange'
                        }}
                      >
                        <Image
                          source={{ uri: image }}
                          style={[styles.image, { width: Dimensions.get('window').width - 60, height: 350 }]}
                        />
                        <View
                          style={{
                            backgroundColor: "#000",
                            width: '100%',
                            height: 350,
                            position: "absolute",
                            // backgroundColor:'red',
                            opacity: 0.2
                          }}
                        ></View>
                        <View
                          style={{
                            backgroundColor: "#272D37",
                            left: 10,
                            bottom: 10,
                            position: "absolute",
                            // backgroundColor:'green',

                            borderRadius: 10,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          <Image
                            style={{ width: 15, height: 15, margin: 8 }}
                            source={require("../../assets/images/song_bars.png")}
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#FFFFFF",
                              justifyContent: "center",
                              alignContent: "center",
                              marginRight: 10,
                              alignSelf: "center",
                            }}
                          >
                            {time}
                          </Text>
                        </View>
                        <Image
                          style={{
                            width: 64, height: 64, position: "absolute",
                          }}
                          source={require("../../assets/images/play_icon_challange.png")}
                        />
                      </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", marginTop: 30, justifyContent: 'space-around', alignItems: 'center', width: Dimensions.get('window').width * 0.8853 }}>
                      <TouchableOpacity
                        style={[styles.sing_again]}
                        onPress={() => {
                          startRecording();
                        }}
                      >
                        <Text
                          style={[
                            styles.center,
                            {
                              color: "#fff",
                              margin: 13,
                              fontWeight: "500",
                              fontSize: 15,
                            },
                          ]}
                        >
                          Sing Again
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.signup]}
                        onPress={() => {
                          callApiForPostVideo(record);
                        }}
                      >
                        <LinearGradient
                          style={{ borderRadius: 15 }}
                          colors={["#CE72F6", "#9C71FE", "#7572FF"]}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 1 }}
                        >

                        </LinearGradient>
                        <LinearGradient
                          style={[{
                            // backgroundColor: 'red',
                            width: 140,
                            height: 45,
                            borderRadius: 16,
                            justifyContent: "center",
                            alignItems: "center"
                          }]}
                          colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 1 }}
                        >
                          <TouchableOpacity
                            style={[styles.signup]}
                            onPress={() => {
                              callApiForPostVideo(record);
                            }}
                          >


                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <Text
                                style={[
                                  styles.center,
                                  {
                                    color: "#fff",
                                    fontWeight: "500",
                                    fontSize: 15,
                                    height: 20,
                                    // backgroundColor:'red'
                                  },
                                ]}
                              >
                                Post Video
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    {progressUpload ? <View style={{
                      justifyContent: "center",
                      width: "100%",
                      marginTop: 20,
                      marginBottom: -20,
                      height: 50,
                      flexDirection: "column",
                      textAlign: "center", alignContent: "center", alignItems: "center",
                    }}>

                      <Text style={{ flex: 1, marginBottom: 0, color: "#ffffff", width: "100%" }}>Uploading your work...</Text>
                      
                      <ProgressBar
                        style={styles.progress}
                        progress={progressUpload}
                        color={Colors.red800} />

                      {wait ? <Text style={{ flex: 1, marginBottom: 0, color: "#ffffff", width: "100%" }}>
                        Please wait it will take few seconds
                      </Text> : null} 

                    </View> : null}
                  </View>
                )}
                {loadView()}
                <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            width: "100%",
            justifyContent: "flex-end",
            position: "absolute",
            //  backgroundColor:'green',
            zIndex: 2,
            alignContent: "flex-end",
            alignSelf: "flex-end",
          }}
        >

          {startButton && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                startRecording();
              }}
            >
              <LinearGradient
                style={{ borderRadius: 15 }}
                colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text
                  style={[styles.center, { color: "#FFF", fontWeight: "500" }]}
                >
                  Start Singing
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {stopButton && (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                stopRecording();
              }}
            >
              <LinearGradient
                style={{ borderRadius: 15 }}
                colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text
                  style={[styles.center, { color: "#FFF", fontWeight: "500" }]}
                >
                  Stop Singing
                </Text>
              </LinearGradient>

            </TouchableOpacity>
          )}

        </View>
        {/* </BlurView>   */}
        {/* <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View> */}
        {/* <Button
          title="Flip Video"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
        </Button> */}
        {/* <Button title="Take video" onPress={() => takeVideo()} />
        <Button title="Stop Video" onPress={() => stopVideo()} /> */}

      </View>

    </BlurView>
  );

  // const cameraRef = useRef(null);
  // const takePicture = async () => {
  //    console.log(">>>>>>>>>>>>>>>");
  // };

  // return (
  //   <SafeAreaView style={styles.safeWrapper}>
  //     <View style={styles.container}>
  //       <RNCamera
  //         ref={cameraRef}
  //         style={styles.camera}
  //         type={RNCamera.Constants.Type.back}
  //         flashMode={RNCamera.Constants.FlashMode.on}
  //       />
  //       <View style={styles.snapWrapper}>
  //         <TouchableOpacity onPress={takePicture} style={styles.capture}>
  //           <Text style={styles.snapText}>SNAP</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </SafeAreaView>
  // );
};

// const styles = StyleSheet.create({
//   safeWrapper: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//     position: 'relative',
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
//   snapWrapper: {
//     flex: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0)',
//     position: 'absolute',
//     top: 50,
//     left: 16,
//     right: 16,
//   },
//   snapText: {
//     fontSize: 14,
//     color: 'red',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  video: {
    // alignSelf: "center",
    width: 320,
    height: 350,
    // backgroundColor:"red"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#F7EFFA",
    borderRadius: 15,
    marginBottom: 30,
    marginLeft: 30,
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 30,
    alignSelf: "stretch",
  },
  progress: {
    width: "100%",
    flexDirection: "row",
  },
  signup: {
    borderRadius: 10,
    marginLeft: 5,
    width: 140,
    height: 40
    // justifyContent: "space-between",
    // alignSelf: "stretch",
  },
  center: {
    alignSelf: "center",
    margin: 15,
    fontSize: 18,
    justifyContent: "center",
  },
  heading: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  subHeading: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  song_title: {
    color: "#fff",
    fontSize: 22,
    marginTop: 2,
    fontWeight: "500",
    textAlign: "center",
  },
  song_subtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  song_desc: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginTop: 5,
  },
  song_lysics: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 35,
  },
  image: {
    width: 200,
    height: 200,
  },
  optionsView: {
    backgroundColor: "#000",
    position: "absolute",
    // backgroundColor:'pink',
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    alignContent: "space-around",
    justifyContent: "center",
    zIndex: 1,
    right: 20,
    top: "30%",
  },
  itemsStyle: {
    marginTop: 20,
    marginLeft: 3,
    marginRight: 3,
  },
  sing_again: {
    borderRadius: 15,
    borderWidth: 1,
    // marginRight: 15,
    // marginBottom: 10,
    width: 140,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#FFFFFF",
  },
});

export default StartSinging;
