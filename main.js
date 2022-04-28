function setup(){
    canvas=createCanvas(280,280)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifycanvas)
}
array_1=["pen","pencil", "car", "bike", "pineapple", "jackfruit", "apple", "carrot", "bottle", "cat", "dog", "cart", "bag", "mat", "bed", "door", "house", "banana"]
var random_number= Math.floor((Math.random()*array_1.length)+1)
console.log(random_number)

function clearCanvas(){
    background("white")
    

}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet')
}
function draw(){
    strokeWeight(11)
    stroke(0)
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
  check_sketch()
     if(drawn_sketch==sketch){
         answer_holder="set"
         score=score+1
         document.getElementById("score").innerHTML="Score: " + score
    }
}
function check_sketch(){
    timer_counter++
    document.getElementById("timer").innerHTML="Timer:" + timer_counter
    console.log(timer_counter)
    if(timer_counter>3000){     
 timer_counter=0
 timer_check="completed"
 if(timer_check=="completed"||answer_holder=="set"){
timer_check=""
answer_holder=""
clearCanvas()
 }
}
}

function classifycanvas(){
    classifier.classify(canvas,gotresult)
}

function gotresult(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)
    document.getElementById("label").innerHTML="label: " + results[0].label
    document.getElementById("confidence").innerHTML="cofidence: " + Math.round(results[0].confidence*100) + "%"
    utterthis=new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utterthis)
}



document.getElementById("sketchtobedrawn").innerHTML="Sketch to be drawn: " + array_1[random_number]
var timer_counter=0 
var timer_check=""
var drawn_sketch= ""
var answer_holder=""
var score=0
var sketch=array_1[random_number]
