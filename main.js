Webcam.set({
    width:350, 
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9xgyA_2_j/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');model.json
  }

  function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        if(results[0].label=="thumbs up"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
            prediction="it is good";
        }
        if(results[0].label=="thumbs down"){
            document.getElementById("update_emoji").innerHTML="&#128078;";
            prediction="it is bad";
        }
        if(results[0].label=="wow"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
            prediction="it is wow";
        }
        speak();
    }
  }

  function speak() {
    var synth= window.speechSynthesis;
    var utterThis= new SpeechSynthesisUtterance(prediction);
    synth.speak(utterThis);
  }