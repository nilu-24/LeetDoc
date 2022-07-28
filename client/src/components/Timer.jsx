
import React from "react";



export default function Timer(){

const[minutes,setMinutes] = React.useState("25");
const[seconds,setSeconds] = React.useState("00");


//for pause, start and reset function of the timer
const[change,setChange] = React.useState(false);

React.useEffect(() => {
    const interval = setInterval(() => {
      countdown(change);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [change,seconds]);


function countdown(change){

    if(change){ //state change only when change is true
          //if the seconds is not 0, and is anything between 1 to 59,
    //decrement the timer
    if (seconds !=="00"){
        setSeconds(String(seconds-1).padStart(2,"0"));
    }
    //if the minutes is not 0 and seconds is 0
    //decrease the minutes
    else if(minutes!=="00" && seconds==="00"){
        setSeconds("59");

        setMinutes(String(minutes-1).padStart(2,"0"));
    }

    else if(minutes==="00" && seconds==="00"){ //when timer ends, enable slider and set change false
        document.getElementById("slider").disabled = false;
        setChange(false);
        alert("Time Up!⏰ Take a break...");
        return
    }

    }
    
}
return (
<div>

<div className="timer">

<h2>{minutes}:<span style={{color:"#DC582A"}} >{seconds}</span></h2>


<button onClick={()=>{
    document.getElementById("slider").disabled = true;
    setChange(true);
}} id="start" className="timer-button"><i class="fa-solid fa-play"></i></button>


<button onClick={()=>{
    setChange(false);
}} className="timer-button"><i class="fa-solid fa-pause"></i></button>


<button onClick={()=>{
    setSeconds("00");
    setMinutes("25");
    setChange(false);
    document.getElementById("slider").disabled = false;
    document.getElementById("slider").value = "25";


}} className="timer-button"><i class="fa-solid fa-stop"></i></button>

<h4>Set Time:</h4>
<input onChange={(e)=>{
    setMinutes(String(e.target.value).padStart(2,"0"));
}} id = "slider" className="slider" type="range" max="60" min="1" defaultValue="25"></input>



</div>

</div>
);

}