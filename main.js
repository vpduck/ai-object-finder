img = "";
objects = [];
status = "";


function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide
   
}


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name=document.getElementById("on").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    
}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw() {
    image(video, 0,0,640,420);

    if(status != "")
{
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are :" + objects.length;
        fill("#00FF00");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y + 15);
        noFill();
        stroke("##00FF00");
        rect(objects[i].y, objects[i].width, objects[i].height);
        

        if(objects[i].label==on)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML=object_name+"Found";
            synth=window.speechSynthesis;

            utterThis=new SpeechSynthesisUtterance(object_name+"Found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("object_status").innerHTML=object_name+"NotFound";
        }
    }
}
}