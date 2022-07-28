
import * as React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';




const styles = {
    border: '5px solid grey',
    borderRadius: '10px',
    marginLeft: "auto",
    marginRight: "auto"
  };


export default function Painter(){

    const[thickness,setThickness] = React.useState(5);
    const[color,setColor] = React.useState("black");

    const canvas = React.useRef(null);


    return (

        <div>
<ReactSketchCanvas
      style={styles}
      width="70%"
      height="85vh"
      strokeWidth={thickness}
      strokeColor={color}
      ref={canvas}
    />

    <br></br>
   

<div className="canvas-items">


<div onClick={()=>{setColor("black")}} class="color" style={{backgroundColor:"black"}}></div>
<div onClick={()=>{setColor("blue")}} class="color" style={{backgroundColor:"blue"}}></div>
<div onClick={()=>{setColor("red")}} class="color" style={{backgroundColor:"red"}}></div>
<div onClick={()=>{setColor("green")}} class="color" style={{backgroundColor:"green"}}></div>

<p>Set Thickness:</p>
<input onChange={(e)=>{
    setThickness(e.target.value)
}} class="thickness" defaultValue={5} type="range" min="1" max="20"></input>



<button onClick={()=>{
    canvas.current.clearCanvas();
}} class="canvas-button">Clear</button>


<button onClick={()=>{
    canvas.current.undo();
}} class="canvas-button">Undo</button>


</div>

        </div>
    );
}