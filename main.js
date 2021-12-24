objects = [];

status = "";

function preload() {
    video = createVideo('video.mp4');

}



function setup() {
    canvas = createCanvas(480, 380);
    video = createCapture(VIDEO);
    canvas.center();
    video.hide();
}



function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status:Object Detected";
            document.getElementById("Number_Of_Objects").innerHTML = "Number of Objects Detected are:" + objects.length;
            fill("#FF0008");
            noFill();
            stroke("#FF0008");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        }
    }
}



function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status:Detecting Objects";
}



function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.rate(1);
    video.volume(0);
}



function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}