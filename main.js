status = "";
object = [];
function setup(){
canvas = createCanvas(480, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(480, 380);
video.hide();
}
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
object_name = document.getElementById("inputbox").value;

}
function modelLoaded(){
    status = true;
console.log("model loaded")
}
function draw(){
image(video, 0 ,0, 480, 380);
if(status !="")
{
    objectDetector.detect(video, gotResult);
    
    for (i = 0; i < object.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of object detected are : "+object.length;
        
        fill('#FF0000');
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke('#FF0000');
        rect(object[i].x, object[i].y, object[i].width, object[i].height);

        if(object[i].label == object_name)
        {
            vidoe.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("object_status").innerHTML = object_name + " Not Found";
        }
}

}
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results
}