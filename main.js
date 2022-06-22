Webcam.set({
  width: 350,
  height: 300,
  img_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      "<img id='captured_image' src=" + data_uri + ">";
  });
}

console.log("ml5 version is", ml5.version);
classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/b3FXJsmDg/model.json",
  modelLoaded
);
function modelLoaded() {
  console.log("Model has been loaded!");
}
function Speak() {
  Api = window.speechSynthesis;
  sd =
    "The first prediction is " +
    prediction1 +
    "and the second prediction is " +
    prediction2;
  ut = new SpeechSynthesisUtterance(sd);
  Api.speak(ut);
}

function predict() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML =
      results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    Speak();
    if (results[0].label == "Happy") {
      document.getElementById("emoji1").innerHTML = "😀";
    } else if (results[0].label == "Sad") {
      document.getElementById("emoji1").innerHTML = "😢";
    } else if (results[0].label == "Angry") {
      document.getElementById("emoji1").innerHTML = "😡";
    }
    if (results[1].label == "Happy") {
      document.getElementById("emoji2").innerHTML = "😁";
    } else if (results[1].label == "Sad") {
      document.getElementById("emoji2").innerHTML = "😭";
    } else if (results[1].label == "Angry") {
      document.getElementById("emoji2").innerHTML = "🤬";
    }
  }
}
