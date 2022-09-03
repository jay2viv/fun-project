Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 Webcam.attach( '#camera' );

function Save_Image()
{
    Webcam.snap( function(data_uri){
        // display results in page
        document.getElementById('picture').innerHTML = 
         '<img id="pic_one" src="'+data_uri+'"/>';
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BdHdit9ea/model/json",modelReady);

function modelReady()
{
    console.log("success")
}

function speak()
{
    Synthesis = window.speechSynthesis;
    speak_data1 = "first prediction is "+prediction1;
    speak_data2 = "and second prediction is "+prediction2;
    speakthis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    Synthesis.speak(speakthis);
}

function Predict_Emoji()
{
    image1 = document.getElementById("pic_one");
    classifier.classify(image1, gotresult);
}

function gotresult(error, result) {
    if ( error) {
        console.error(error);
        
    }

    else {
        console.log(result);
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        document.getElementById("emotion1").innerHTML = prediction1;
        document.getElementById("emotion2").innerHTML = prediction2;

        if(prediction1=="happy")
        {
            document.getElementById("emoji1").innerHTML = "&#128522;";
        }
        if(prediction2=="happy"){
            document.getElementById("emoji1").innerHTML = "&#128522;";
        }

        if(prediction1=="sad")
        {
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }
        if(prediction2=="sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }


        if(prediction1=="angry")
        {
            document.getElementById("emoji1").innerHTML = "&#128548;";
        }
        if(prediction2=="angry"){
            document.getElementById("emoji1").innerHTML = "&#128548;";
        }
        speak()

    }
}