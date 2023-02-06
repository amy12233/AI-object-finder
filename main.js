status = "";
objects = "[]";
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
}