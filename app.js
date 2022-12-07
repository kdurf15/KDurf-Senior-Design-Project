/*Kevin ("Durf") Durfee's Safety Loop/Shutdown Circuit Educational Simulation
2023, Javascript. If issues or questions arise with this code, please contact
me (Durf) at (609) 917-4527, kdurf15@comcast.net, or durfeekd@lafayette.edu
(if it's still active)*/

//test variable for precahrge_count instead of button placeholder design
var precharge_state=false;
var precharge_count=0;

//attempt implementing precharge slider
var precharge_slider;

let [milliseconds,seconds] = [0,0];
let int = null;


var in1_button;
var in2_button;

var Y1light;
var Y2light;
var Y3light;

//inputs
var X1=false;
var X2=false;
var X3=false;

//outputs
var Y1=false;
var Y2=false;;
var Y3=false;
var Y4 = false;
var Y5 = false;
var Y6 = false;
var Y7 = false;
var Y8 = false;

//internal "coils"
var V1=false;
var V2=false;
var V3=false;
var V4=false;
var V5=false;
var V6=false;
var V7=false;
var V8=false;
var V9=false;
var V10=false;
var V11 = false;
var V12 = false;
var V13 = false;
var V14 = false;
var V15 = false;
var V16 = false;
var V17 = false;
var V18 = false;
var V19 = false;
var V20 = false;
var V21 = false;
var V22 = false;
var V23 = false;
var V24 = false;
var V25 = false;
var V26 = false;
var V27 = false;

var SP0 = true;

var canv_w = 1780;
var canv_h = 858;

let backgrnd;
let brb_off;
let green_off;
let green_on;

let rtds = new Audio('180077__iykqic0__sine-wave-2000-hz.wav');
var sound_count = 0;


function setup(){
  backgrnd = loadImage('https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/main/Senior%20Design%20Project%20Sim%20Cockpit%20Design%20-%20Scaled2.jpg')
  backgrnd = loadImage('Senior Design Project Sim Cockpit Design - Scaled2.jpg')
  brb_off = loadImage('https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/main/BRB%20Not%20Engaged.png');
  brb_off = loadImage('BRB Not Engaged.png');
  brb_on = loadImage('https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/main/BRB%20Engaged.png');
  brb_on = loadImage('BRB Engaged.png');
  green_off = loadImage('https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/main/GreenNotEngaged.png');
  green_off = loadImage('GreenNotEngaged.png');
  green_on = loadImage('https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/main/GreenEngaged.png');
  green_on = loadImage('GreenEngaged.png')

  var canvas = createCanvas(canv_w,canv_h);
  frameRate(30);
  stroke(0);
  textAlign(CENTER);

  var inox = 50.0/1200.0*canv_w;
  var inoy = 200.0/650.0*canv_h;
  var insepx = 75*canv_w/1200.;
  var insepy = 100*canv_h/650.0;
  var buttondscaled = 50.0*canv_w/1200;

  var brb_cock_locx = 1325;
  var brb_cock_locy = 235;
  var new_buttondscaled = 60;
  //textFont('Arial',32);
  in1_button = new RadioButton_greenBig(75,150,buttondscaled,'GLVMS');
  in2_button = new RadioButton(75,50,buttondscaled,'BRB S1');
  in3_button = new RadioButton(canv_w-75,50,buttondscaled,'BRB S2');
  //in4_button = new RadioButton(inox,inoy+3*insepy,buttondscaled,'BRB Cock');
  in5_button = new RadioButton_green(1325-75,235,new_buttondscaled,'TSMS');
  //in5_button = new RadioButton(1350,245,100,'TSMS');
  in6_button = new RadioButton(canv_w+100,canv_h+100,buttondscaled,'PC TBD');
  in7_button = new RadioButton_greenBig(180,50,buttondscaled,'MC');
  in8_button = new RadioButton_reg(75,canv_h-60,buttondscaled,'FAMS');
  in9_button = new RadioButton_reg(75,canv_h-150,buttondscaled,'FIMD');
  in10_button = new RadioButton_reg(180,canv_h-60,buttondscaled,'BOTS');

  in4_button = new RadioButton_small(1325,235,new_buttondscaled,'BRB Cock');

  //output lights
  var outox = canv_w-150*canv_w/1200.0;
  var outoy = 200*canv_h/650.0;
  var outsepx = 100*canv_w/1200.0;
  var outsepy = 100*canv_h/650.0;

  Y1light = new outputLight(750,400,25,color(0,128,0),color(0,255,0),'GLV OFF',12);
  Y2light = new outputLight(770,440,25,color(128,128,0),color(255,255,0),'TS OFF, GLV ON',12);
  Y3light = new outputLight(810,480,25,color(0,128,0),color(0,255,0),'Precharge',12);
  Y4light = new outputLight(955,400,25,color(128,128,0),color(255,255,0),'TS ENRGZD, NRTD',12);
  Y5light = new outputLight(945,440,25,color(0,128,0),color(0,255,0),'TS ENRGZD, RTD',12);
  Y6light = new outputLight(905,480,25,color(128,0,0),color(255,0,0),'AMS FLT',12);
  Y7light = new outputLight(895,520,25,color(128,0,0),color(255,0,0),'IMD FLT',12);
  Y8light = new outputLight(835,520,25,color(128,0,0),color(255,0,0),'BOTS',12);


  var intox = canv_w/2-300*canv_w/1200.0;
  var intoy = 200*canv_h/650;
  var intsepx = 100*canv_w/1200;
  var intsepy = 100*canv_h/650.0;

  //intermediate lights
  V1light = new outputLight(intox,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V1',12);
  V2light = new outputLight(intox+intsepx,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V2',12);
  V3light = new outputLight(intox+2*intsepx,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V3',12);
  V4light = new outputLight(intox+3*intsepx,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V4',12);
  V5light = new outputLight(intox+4*intsepx,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V5',12);
  V6light = new outputLight(intox+5*intsepx,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V6',12);
  V7light = new outputLight(intox+6*intsepx,intoy,buttondscaled,color(0,0,255),color(255,0,0),'V7',12);

  V8light = new outputLight(intox,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V8',12);
  V9light = new outputLight(intox+intsepx,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V9',12);
  V10light = new outputLight(intox+2*intsepx,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V10',12);
  V11light = new outputLight(intox+3*intsepx,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V11',12);
  V12light = new outputLight(intox+4*intsepx,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V12',12);
  V13light = new outputLight(intox+5*intsepx,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V13',12);
  V14light = new outputLight(intox+6*intsepx,intoy+intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V14',12);

  V15light = new outputLight(intox,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V15',12);
  V16light = new outputLight(intox+intsepx,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V16',12);
  V17light = new outputLight(intox+2*intsepx,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V17',12);
  V18light = new outputLight(intox+3*intsepx,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V18',12);
  V19light = new outputLight(intox+4*intsepx,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V19',12);
  V20light = new outputLight(intox+5*intsepx,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V20',12);
  V21light = new outputLight(intox+6*intsepx,intoy+2*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V21',12);

  V22light = new outputLight(intox,intoy+3*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V22',12);
  V23light = new outputLight(intox+intsepx,intoy+3*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V23',12);
  V24light = new outputLight(intox+2*intsepx,intoy+3*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V24',12);
  V25light = new outputLight(intox+3*intsepx,intoy+3*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V25',12);
  V26light = new outputLight(intox+4*intsepx,intoy+3*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V26',12);
  V27light = new outputLight(intox+5*intsepx,intoy+3*intsepy,buttondscaled,color(0,0,255),color(255,0,0),'V27',12);

  //implement slider
  precharge_slider = new XSlider(canv_w/2-65, canv_h-10, 100, 0, 10, seconds, "precharge");
}

function draw(){
  image(backgrnd,0,0);
  fill(255);
  //greet the user
  textSize(32);
  text("Mock Safety Loop Simulator",canv_w/2,72.5);

  //process inputs
  in1_button.updateRadio();
  in2_button.updateRadio();
  in3_button.updateRadio();
  in4_button.updateRadio();
  in5_button.updateRadio();
  in6_button.updateRadio();
  in7_button.updateRadio();
  in8_button.updateRadio();
  in9_button.updateRadio();
  in10_button.updateRadio();

  //update boolean code from text area with callback
  //console.log(run_button.newtouch);

  //boolean algebra block 3
  X1 = in1_button.state;
  X2 = in2_button.state;
  X3 = in3_button.state;
  X4 = in4_button.state;
  X5 = in5_button.state;
  X6 = in6_button.state;
  X7 = in7_button.state;
  X8 = in8_button.state;
  X9 = in9_button.state;
  X10 = in10_button.state;

  /*maybe consider tweaking to add previous inputs rather than states (X1,2,3 in V10 instead of V9)
  so that I can possibly rework code to only be in one output state at once*/
  V9 = X1&&X2&&X3;
  V21 = V1&&!V9;
  V10 = V9&&X4&&X5;
  //V10 = V2&&V9&&X4&&X5 //v10 is what initializes the car to enter precharge state
  V11 = V3&&V10&&X6;
  //V11 = V3&&V10;
  //V12 = V4&&X7;
  V12 = X7&&X5&&X4&&X3&&X2&&X1&&(seconds>=9);
  //V12 = X7&&Y4;
  V13 = V5&&!X7;
  V14 = (V3||V4||V5)&&(!X4||!X5);
  V15 = (V3||V4||V5)&&X8;
  V16 = (V3||V4||V5)&&X9;
  V17 = (V3||V4||V5)&&X10;
  V18 = V8&&(!X10&&!X4&&!X5);
  V19 = V7&&(!X9&&!X4&&!X5);

  if(V10){
    clearInterval(int);
    int=setInterval(prechargeTimer,10);
  }
  //int=setInterval(prechargeTimer,10);
  if(!V10){
    clearInterval(int);
    [milliseconds,seconds]=[0,0];
    precharge_state=false;
  }
  if(seconds>=9){
    precharge_state=true;
  }

  //inital condition to have Y1 on when GLVMS if off, make sure breaks when GLVMS is on
  V22 = !X1;

  //Y1 = V22||V21; //actual V21, not placeholder in code currently
  Y1 = V22
  Y2 = (V9||V23||V14||V18||V19||V20)&&!Y3&&!Y4&&!Y5;
  Y3 = ((V10||V26||V27)&&!Y4&&!Y5)&&!X8&&!X9&&!X10;
  Y4 = ((V11||V25||precharge_state)&&!Y5)&&!X8&&!X9&&!X10;
  Y5 = (V12||V24)&&!X8&&!X9&&!X10;
  Y6 = V15||X8;
  Y7 = V16||X9;
  Y8 = V17||X10;

  V1 = Y1;
  //V2 = Y2;
  V3 = Y3;
  //V4 = Y4;
  V5 = Y5;
  V6 = Y6;
  V7 = Y7;
  V8 = Y8;

  //try implementing ready to drive sounds
  if(V12){
    if(sound_count<=0){
      rtds.play();
      sound_count++;
    }
  }
  if(!V12){
    sound_count=0;
  }

  //slider implementation attempt //quick location: slider
  precharge_slider.slpos = seconds;
  precharge_slider.drawSlider();

  //boolean algebra block 4
  Y1light.state = Y1;
  Y2light.state = Y2;
  Y3light.state = Y3;
  Y4light.state = Y4;
  Y5light.state = Y5;
  Y6light.state = Y6;
  Y7light.state = Y7;
  Y8light.state = Y8;

  V1light.state = V1;
  V2light.state = V2;
  V3light.state = V3;
  V4light.state = V4;
  V5light.state = V5;
  V6light.state = V6;
  V7light.state = V7;
  V8light.state = V8;
  V9light.state = V9;
  V10light.state = V10;
  V11light.state = V11;
  V12light.state = V12;
  V13light.state = V13;
  V14light.state = V14;
  V15light.state = V15;
  V16light.state = V16;
  V17light.state = V17;
  V18light.state = V18;
  V19light.state = V19;
  V20light.state = V20;
  V21light.state = V21;
  V22light.state = V22;
  V23light.state = V23;
  V24light.state = V24;
  V25light.state = V25;
  V26light.state = V26;
  V27light.state = V27;



  //set light states to Y variables;
  //light up outputs
  //test2
  Y1light.drawLight();
  Y2light.drawLight();
  Y3light.drawLight();
  Y4light.drawLight();
  Y5light.drawLight();
  Y6light.drawLight();
  Y7light.drawLight();
  Y8light.drawLight();

  console.log(SP0);
  //kill SP0 if it's true
  if(SP0==true){
    SP0=false;
  }
}


function prechargeTimer(){
  if(seconds<10){
    milliseconds+=10;

    if(milliseconds==10){
      milliseconds=0;
      seconds+=0.01;
    }
    if(X8||X9||X10){
      seconds=0;
      milliseconds=0;
    }
  }
}

function outputLight(ix,iy,id,icolorFalse,icolorTrue,ilabel,itextSize){
  this.x =ix;
  this.y = iy;
  this.d = id;
  this.label = ilabel;
  this.colorFalse = icolorFalse;
  this.colorTrue = icolorTrue;
  this.state = false;
  this.textSize = itextSize;
  this.update = function(val){
    this.state = val;
  }
  this.drawLight=function(){
  if(this.state==false){
      fill(this.colorFalse);
      stroke(0);
    }
    else{
      fill(this.colorTrue);
      stroke(0);
    }

    //draw the radio button
    ellipse(this.x,this.y,this.d,this.d,2);
    fill(255);
    stroke(255);
    textSize(this.textSize);
    text(this.label, this.x, this.y+this.d);
    }
}
function Counter(ix,iy,iw,ih,ilabel,ifalseColor,itrueColor){
  this.thresh = 3;//global variable
  this.up = false;
  this.oldup = false;
  this.down = false;
  this.olddown = false;
  this.state = false;
  this.RST = false;
  this.count = 0;
  this.x = ix;
  this.y = iy;
  this.w = iw;
  this.h = ih;
  this.label = ilabel;
  this.falseColor = ifalseColor;
  this.trueColor = itrueColor;

  //variables for duration up/down control
  this.upbtnx = this.x+0.75*this.w/2;
  this.upbtny = this.y-0.5*this.h/2;
  this.dnbtny = this.y+0.5*this.h/2;
  this.upbtn_d = this.w*0.1;//diameter of the button circle

  this.uplightx = this.x-0.75*this.w/2;
  this.uplighty = this.y-0.5*this.h/2;
  this.downlightx = this.uplightx;
  this.downlighty = this.y;
  this.rstlightx = this.uplightx;
  this.rstlighty = this.y+this.h/4;
  this.lightd = 0.1*this.w;

  //lights for showing when inputs go high
  this.uplight = new outputLight(this.uplightx,this.uplighty,this.lightd,color(0,128,128),color(0,255,255),"UP",8);

  this.downlight = new outputLight(this.downlightx,this.downlighty,this.lightd,color(0,128,128),color(0,255,255),"DOWN",8);

  this.rstlight = new outputLight(this.rstlightx,this.rstlighty,this.lightd,color(0,128,128),color(0,255,255),"RST",8);

  //now create a momentary button for the up and down buttons
  this.upbtn = new MomentaryButton(this.upbtnx,this.upbtny,this.upbtn_d,"CNT+",8);
  this.dnbtn = new MomentaryButton(this.upbtnx,this.dnbtny,this.upbtn_d,"CNT-",8);

  this.update = function (){
    //draw timer box
    this.drawCounter();
    //update class-owned variables based on buttons on timer
    if (this.upbtn.newtouch==true){
      this.thresh=this.thresh+1;//increase the timer duration by 10.
    }
    if ((this.dnbtn.newtouch==true)&&(this.thresh>0)){
      this.thresh=this.thresh-1;//decrease
    }
    this.uplight.state = this.up;
    this.downlight.state = this.down;
    this.rstlight.state = this.RST;
    //actually update timer variables
    if (this.up&&!this.oldup){
      this.count = this.count+1;
    }
    if(this.down&&!this.olddown&&this.count>=0){
      this.count = this.count-1;
    }
    if(this.RST){
      this.count=0;
    }
    //reset old enable to detect rising edge
    this.oldup=this.up;
    this.olddown = this.down;
    this.state = this.count>=this.thresh;
  }

  this.drawCounter = function(){
    rectMode(CENTER);
    if(this.state==false){
      fill(this.falseColor);
    }
    else{
      fill(this.trueColor);
    }
    stroke(0);
    //draw box for timer
    rect(this.x,this.y,this.w,this.h);
    this.uplight.drawLight();
    this.downlight.drawLight();
    this.rstlight.drawLight();
    //draw buttons
    this.dnbtn.updateButton();
    this.upbtn.updateButton();
    //draw some text
    textSize(8);
    fill(0);
    text(this.label+" (out)",this.x,this.y-0.25*this.h);
    text("CT"+str(this.label[2])+"_CNT: "+str(int(this.thresh)),this.x,this.y);
    text(this.label[0]+this.label[1]+"A"+this.label[2]+": "+str(int(this.count))+" (out)",this.x,this.y+this.h*.25);
    text(this.label[0]+this.label[1]+"A"+this.label[2]+" counts up on "+str(this.label)+"_UP rising edge",this.x,this.y+1.3*this.h/2);
    text(this.label[0]+this.label[2]+"A"+this.label[2]+" counts down on "+str(this.label)+"_DOWN rising edge",this.x,this.y+1.6*this.h/2);
    text(str(this.label)+" is true when "+str(this.label[0]+this.label[1])+"A"+str(this.label[2])+">CT"+str(this.label[2])+"_CNT",this.x,this.y+1.9*this.h/2);
    text(str(this.label[0]+this.label[1])+"A"+str(this.label[2])+" resets when "+str(this.label)+"_RST is true",this.x,this.y+2.2*this.h/2);
  }
}

function Timer(ix,iy,iw,ih,ilabel,ifalseColor,itrueColor){
  this.duration = 1000;//global variable
  this.en = false;
  this.olden = false;
  this.state = false;
  this.RST = false;
  this.tstart = millis();
  this.elapsed = 0;
  this.x = ix;
  this.y = iy;
  this.w = iw;
  this.h = ih;
  this.label = ilabel;
  this.falseColor = ifalseColor;
  this.trueColor = itrueColor;

  //variables for duration up/down control
  this.upbtnx = this.x+0.75*this.w/2;
  this.upbtny = this.y-0.5*this.h/2;
  this.dnbtny = this.y+0.5*this.h/2;
  this.upbtn_d = this.w*0.1;//diameter of the button circle

  this.enlightx = this.x-0.75*this.w/2;
  this.enlighty = this.y;
  this.enlightd = this.w*0.1;

  this.enlight = new outputLight(this.enlightx,this.enlighty,this.enlightd,color(0,128,128),color(0,255,255),"EN",8);

  //now create a momentary button for the up and down buttons
  this.upbtn = new MomentaryButton(this.upbtnx,this.upbtny,this.upbtn_d,"dur+",8);
  this.dnbtn = new MomentaryButton(this.upbtnx,this.dnbtny,this.upbtn_d,"dur-",8);

  this.update = function (){
    this.enlight.state = this.en;
    //draw timer box
    this.drawTimer();
    //update class-owned variables based on buttons on timer
    if (this.upbtn.newtouch==true){
      this.duration=this.duration+100;//increase the timer duration by 10.
    }
    if (this.dnbtn.newtouch==true){
      this.duration=this.duration-100;//decrease
    }

    //actually update timer variables
    if (this.en){
      this.elapsed = millis()-this.tstart;
    }
    else{
      this.elapsed=0;
      this.tstart = millis();
    }
    //reset old enable to detect rising edge
    this.olden=this.en;
    this.state = this.elapsed>=this.duration;


  }

  this.drawTimer = function(){
    rectMode(CENTER);
    if(this.state==false){
      fill(this.falseColor);
    }
    else{
      fill(this.trueColor);
    }
    stroke(0);
    //draw box for timer
    rect(this.x,this.y,this.w,this.h);
    //draw light
    this.enlight.drawLight();
    //draw buttons
    this.dnbtn.updateButton();
    this.upbtn.updateButton();
    //draw some text
    textSize(8);
    fill(0);
    text(this.label+" (out)",this.x,this.y-0.25*this.h);
    text("T"+str(this.label[1])+"_DUR: "+str(int(this.duration)),this.x,this.y);
    text(this.label[0]+"A"+this.label[1]+": "+str(int(this.elapsed))+" (out)",this.x,this.y+this.h*.25);
    text(this.label+" counts when "+str(this.label)+"_EN is true",this.x,this.y+1.3*this.h/2);
    text(str(this.label)+" is true when "+str(this.label[0])+"A"+str(this.label[1])+">"+"T"+str(this.label[1])+"_DUR",this.x,this.y+1.6*this.h/2);
  }

}
function MomentaryButton(ix,iy,id,ilabel,itextSize){
this.x = ix;
this.y = iy;
this.d = id;
this.state = false;
this.touched = false;
this.wastouched = false;
this.newtouch = false;
this.label = ilabel;
this.textSize = itextSize;

this.updateButton=function(){
  //detect whether the radio button is
if (mouseIsPressed==true){
  if ((sqrt(pow(mouseX-this.x,2)+pow(mouseY-this.y,2))<=this.d/2)){
    this.touched=true;
  }
}
  else{
    this.touched=false;
  }
  this.newtouch = this.touched&!this.wastouched;
  this.state = this.touched;
  //update value of touched
  this.wastouched = this.touched;

  //draw the button
  this.drawButton();
}


this.drawButton=function(){
if(this.state==false){
  fill(255);
}
else{
  fill(0);
}
stroke(0);
//draw the radio button
ellipse(this.x,this.y,this.d,this.d,2);
fill(0);
stroke(0);
textSize(this.textSize);
text(this.label, this.x, this.y+this.d);
}
}

function RadioButton_small(ix,iy,id,ilabel){
this.x = ix;
this.y = iy;
this.d = id;
this.state = false;
this.touched = false;
this.wastouched = false;
this.newtouch = false;
this.label = ilabel;

this.updateRadio=function(){
  //detect whether the radio button is
if (mouseIsPressed==true){
  if ((sqrt(pow(mouseX-this.x,2)+pow(mouseY-this.y,2))<=this.d/2)){
    this.touched=true;
  }
}
  else{
    this.touched=false;
  }

  if(this.touched==true & this.wastouched==false){
    this.state = !this.state;
  }
  //update value of touched
  this.wastouched = this.touched;


//draw the button
  this.drawRadio_small();
}


this.drawRadio_small=function(){
if(this.state==false){
  image(brb_off,this.x-30,this.y-37.5,this.d,this.d);
}
else {
  image(brb_on,this.x-30,this.y-37.5,this.d,this.d);
}
stroke(0);
//draw the radio button
//ellipse(this.x,this.y,this.d,this.d,2);
fill(0);
stroke(0);
textSize(12);
text(this.label, this.x, this.y+(5*this.d/9));
}
}

function RadioButton(ix,iy,id,ilabel){
this.x = ix;
this.y = iy;
this.d = id;
this.state = false;
this.touched = false;
this.wastouched = false;
this.newtouch = false;
this.label = ilabel;

this.updateRadio=function(){
  //detect whether the radio button is
if (mouseIsPressed==true){
  if ((sqrt(pow(mouseX-this.x,2)+pow(mouseY-this.y,2))<=this.d/2)){
    this.touched=true;
  }
}
  else{
    this.touched=false;
  }



  if(this.touched==true & this.wastouched==false){
    this.state = !this.state;
  }
  //update value of touched
  this.wastouched = this.touched;

  // if(this.touched=true){
  //   this.drawRadioOn();
  // }else if(this.touched=false){
  //   this.drawRadioOff();
  // }

//draw the button
  this.drawRadio();
}

this.drawRadio=function(){
if(this.state==false){
  image(brb_off,this.x-37.5,this.y-37.5,this.d,this.d);
}
else {
  image(brb_on,this.x-37.5,this.y-37.5,this.d,this.d);
}
stroke(0);
//draw the radio button
//ellipse(this.x,this.y,this.d,this.d,2);
fill(0);
stroke(0);
textSize(12);
text(this.label, this.x, this.y+(2*this.d/3));
}
}

function RadioButton_greenBig(ix,iy,id,ilabel){
this.x = ix;
this.y = iy;
this.d = id;
this.state = false;
this.touched = false;
this.wastouched = false;
this.newtouch = false;
this.label = ilabel;

this.updateRadio=function(){
  //detect whether the radio button is
if (mouseIsPressed==true){
  if ((sqrt(pow(mouseX-this.x,2)+pow(mouseY-this.y,2))<=this.d/2)){
    this.touched=true;
  }
}
  else{
    this.touched=false;
  }



  if(this.touched==true & this.wastouched==false){
    this.state = !this.state;
  }
  //update value of touched
  this.wastouched = this.touched;

//draw the button
  this.drawRadio_greenBig();
}

this.drawRadio_greenBig=function(){
if(this.state==false){
  image(green_off,this.x-37.5,this.y-37.5,this.d,this.d);
}
else {
  image(green_on,this.x-37.5,this.y-37.5,this.d,this.d);
}
stroke(0);
//draw the radio button
//ellipse(this.x,this.y,this.d,this.d,2);
fill(0);
stroke(0);
textSize(12);
text(this.label, this.x, this.y+(2*this.d/3));
}
}


function RadioButton_reg(ix,iy,id,ilabel){
this.x = ix;
this.y = iy;
this.d = id;
this.state = false;
this.touched = false;
this.wastouched = false;
this.newtouch = false;
this.label = ilabel;

this.updateRadio=function(){
  //detect whether the radio button is
if (mouseIsPressed==true){
  if ((sqrt(pow(mouseX-this.x,2)+pow(mouseY-this.y,2))<=this.d/2)){
    this.touched=true;
  }
}
  else{
    this.touched=false;
  }



  if(this.touched==true & this.wastouched==false){
    this.state = !this.state;
  }
  //update value of touched
  this.wastouched = this.touched;


//draw the button
  this.drawRadio_reg();
}

this.drawRadio_reg=function(){
if(this.state==false){
  fill(255);
}
else {
  fill(0);
}
stroke(0);
//draw the radio button
ellipse(this.x,this.y,this.d,this.d,2);
fill(255);
stroke(255);
textSize(12);
text(this.label, this.x, this.y+(2*this.d/3));
}
}


function RadioButton_green(ix,iy,id,ilabel){
this.x = ix;
this.y = iy;
this.d = id;
this.state = false;
this.touched = false;
this.wastouched = false;
this.newtouch = false;
this.label = ilabel;

this.updateRadio=function(){
  //detect whether the radio button is
if (mouseIsPressed==true){
  if ((sqrt(pow(mouseX-this.x,2)+pow(mouseY-this.y,2))<=this.d/2)){
    this.touched=true;
  }
}
  else{
    this.touched=false;
  }



  if(this.touched==true & this.wastouched==false){
    this.state = !this.state;
  }
  //update value of touched
  this.wastouched = this.touched;

//draw the button
  this.drawRadio_green();
}

this.drawRadio_green=function(){
if(this.state==false){
  image(green_off,this.x-30,this.y-37.5,this.d,this.d);
}
else {
  image(green_on,this.x-30,this.y-37.5,this.d,this.d);
}
stroke(0);
//draw the radio button
//ellipse(this.x,this.y,this.d,this.d,2);
fill(0);
stroke(0);
textSize(12);
text(this.label, this.x, this.y+(5*this.d/9));
}
}

function XSlider(ixorg, iyorg, ilen, imin, imax, islpos, ilabel) {
    this.xorg = ixorg;
    this.yorg = iyorg;
    this.len = ilen;
    this.slpos = islpos;
    this.min = imin;
    this.max = imax;
    this.label = ilabel;
    // this.sliderstroke = color(0, 0, 0);
    // this.sliderfill = color(0, 0, 0);
    this.sliderstroke = color(255);
    this.sliderfill = color(255);
    this.was_pressed=false;
    this.held=false;

  this.drawSlider=function() {
    //box_x = (slpos-min)*len/(max-min);
    this.updateSlider();
    stroke(this.sliderstroke);
    fill(this.sliderfill);
    line(this.xorg, this.yorg, this.xorg+this.len, this.yorg);
    rectMode(CENTER);
    this.box_x = (this.slpos-this.min)*this.len/(this.max-this.min);
    rect(this.xorg+this.box_x, this.yorg, this.len*.2, this.len*.1);
    textSize(12);
    //text(this.label+": "+nf(this.slpos, 1, 2), this.xorg, this.yorg-this.len*.1);
    text(this.label+": "+nf(this.slpos, 1, 2), this.xorg+45, this.yorg-this.len*.1);
  }

  this.updateSlider = function() {
    this.box_x = (this.slpos-this.min)*this.len/(this.max-this.min);
    //console.log(touches)
    if ((mouseIsPressed && !this.was_pressed && !this.held)||(mouseIsPressed && !this.was_pressed && !this.held)) {

      //println((xorg+box_x-mouseX));
      if (abs(this.xorg+this.box_x-mouseX)<0.2*this.len && abs(this.yorg-mouseY)<0.2*this.len) {
        this.held=true;
        //println("held");
      }
    } else if ((mouseIsPressed && this.held)||(mouseIsPressed && this.held)) {
      this.held = true;
    } else {
      this.held=false;
    }
    //println(mouseX-xorg);
    this.was_pressed=mouseIsPressed;
    if (this.held==true) {
      //update slider if the box is being dragged
      this.box_x = mouseX-this.xorg;
      if (mouseX>this.xorg+this.len) {
        this.box_x = this.len;
      }
      if (mouseX<this.xorg) {
        this.box_x=0;
      }
      this.slpos = this.min+(this.max-this.min)*this.box_x/this.len;
    }
  }
}
