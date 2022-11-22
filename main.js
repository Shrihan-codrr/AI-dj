var L_wrist_x = 0;
var L_wrist_y = 0;
var R_wrist_x = 0;
var R_wrist_y = 0;
var Math_Floor = 0;
var music_1="music.mp3";
var music_2="music2.mp3";
var score_l = 0;
var score_r = 0;

function preload() {
     music_1 = loadSound("music.mp3");
     music_2 = loadSound("music2.mp3");
}

function setup() {
     canvas = createCanvas(500, 450);
     background("white");
     canvas.position(435, 190);

     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, model_loaded);
     poseNet.on('pose', Get_results);


}

function draw() {
     
     image(video, 0, 0, 500, 450);
     fill("red");
     stroke("red");
     circle(R_wrist_x,R_wrist_y,15);
     
     int_R_wrist_y = Number(R_wrist_y);
     if(int_R_wrist_y >= 0 && int_R_wrist_y < 90 ){
          my_music.rate(0.5);
          document.getElementById("Speed_disc").innerHTML="Speed : 0.5";
     }
     else if (int_R_wrist_y >= 90 && int_R_wrist_y < 180){
          my_music.rate(1);
          document.getElementById("Speed_disc").innerHTML="Speed : 1";
     }
     else if (int_R_wrist_y >= 180 && int_R_wrist_y < 270){
          my_music.rate(1.5);
          document.getElementById("Speed_disc").innerHTML="Speed : 1.5";
     }
     else if (int_R_wrist_y >= 270 && int_R_wrist_y < 360){
          my_music.rate(2);
          document.getElementById("Speed_disc").innerHTML="Speed : 2";
     }
     else if (int_R_wrist_y >= 360 && int_R_wrist_y < 450){
          my_music.rate(2.5);
          document.getElementById("Speed_disc").innerHTML="Speed : 2.5";
     }

     fill("red");
     stroke("red");
     circle(L_wrist_x,L_wrist_y,15);

     int_L_wrist_y = Number(L_wrist_y);
     Math_Floor = floor(int_L_wrist_y);
     new_volume_1 = Math_Floor/450;
     new_volume = round(new_volume_1, 2);

     my_music.setVolume(new_volume);
     document.getElementById("Volume_disc").innerHTML="Volume : " + new_volume;

     score_l = result[0].pose.keypoints[9].score;
     
     score_r = result[0].pose.keypoints[9].score;
}

/* Volume Reference Range (0  - 1) 
○ Means variableName.setVolume(0.1) - Very low
○ Means variableName.setVolume(0.3) - Little low
○ Means variableName.setVolume(0.5) - Medium
○ Means variableName.setVolume(0.7) - Little high
○ Means variableName.setVolume(0.9) - High
○ Means variableName.setVolume(1) - Full volume

Playback Rate Reference
 0 - 450 into 5 parts 
○ Means variableName.rate(0.5) - Very slow 0-90
○ Means variableName.rate(1) - Normal 90-180
○ Means variableName.rate(1.5) - Little fast 180-270
○ Means variableName.rate(2) - Twice as fast 270-360
○ Means variableName.rate(2.5) - Very fast 360-450


*/


function Play_Sound() {
     my_music.play();
     my_music.setVolume(0.7);
     my_music.rate(2.5);
    
}

function model_loaded() {
     console.log("Model Successfully Loaded....");
}

function Get_results(results) {
     
     if (results.length > 0) {
          //console.log(results);

          L_wrist_x = results[0].pose.leftWrist.x;
          R_wrist_x = results[0].pose.rightWrist.x;
          L_wrist_y = results[0].pose.leftWrist.y;
          R_wrist_y = results[0].pose.rightWrist.y;


          console.log("Left Wrist X : " + L_wrist_x + " & Y : " + L_wrist_y);

          console.log("Right Writs X : " + R_wrist_x + " & Y : "+ R_wrist_y);
     }
}

function Stop_Sound(){
     music_1.stop();
     music_2.stop();
}