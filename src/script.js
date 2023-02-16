const audio = document.createElement("AUDIO");
const knob = document.getElementById("knob1");
const container = document.getElementById("container");
const knobRect = knob.getBoundingClientRect();
const conRect = container.getBoundingClientRect();

audio.setAttribute("id", "audio");
audio.src = "http://www.hscripts.com/tutorials/html/music.wav";
audio.controls = true;
audio.onloadedmetadata = function() {
  document.getElementById("duration").style.color = "magenta";
  document.getElementById("timeupdate").style.color = "blue";
  document.getElementById("setInterval").style.color = "lightblue";
  document.getElementById("duration").innerHTML = audio.duration;
};

tl = new TimelineLite({ paused: true });

// create object to tween
tl.to(".red", 11, { x: 500, ease: Linear.easeNone });

function Update() {
  tl.progress(audio.currentTime / audio.duration);  
  TweenMax.set(knob, { x: (conRect.width - knobRect.width) * tl.progress() });
  document.getElementById("setInterval").innerHTML = audio.currentTime;
}

audio.onplay = function() {
  TweenLite.ticker.addEventListener("tick", Update);
};
audio.onpause = function() {
  TweenLite.ticker.removeEventListener("tick", Update);
};

$(".play").click(function() {
  audio.play();
});

$(".pause").click(function() {
  audio.pause();
});

// draggable

Draggable.create(".knob", {
  type: "x",
  trigger: "#container",
  bounds: "#container",
  edgeResistance: 1,
  lockAxis: true,
  cursor: "pointer",
  onDrag: updateRange,
  onPress: updatePosition
});

function updatePosition(e) {
  TweenMax.set(knob, { x: this.pointerX - conRect.left - knobRect.width / 2 });    
  this.update();  
}

function updateRange() {  
  tl.progress(this.x / (conRect.width - knobRect.width));
  audio.currentTime = tl.progress() * audio.duration;
  
  document.getElementById("setInterval").innerHTML = audio.currentTime;
}
