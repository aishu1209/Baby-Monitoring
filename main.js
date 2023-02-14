objects = [];
alarm = "";
status1 = ""

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(600,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";


}



function draw(){
    image(video,0,0,600,420);

    if(status1 != ""){

        for(i = 0; i < objects.length; i++){
            if(objects.label == "person"){
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                alarm.stop();


            }
            else{
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                alarm.play();
            }
        }
    }
}

function modelLoaded(){
    status1 = true; 
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results){

    if(error){
        console.log(error);

    }

    console.log(results);
    objects = results;
}
