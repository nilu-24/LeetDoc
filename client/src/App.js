
import './App.css';
// eslint-disable-next-line
import axios from "axios";
import React from "react";
import Timer from './components/Timer';
import Painter from './components/Painter';
import Note from './components/Note';



//importing the images of languages
import python from "./images/python.png";
import java from "./images/java.png";
import javascript from "./images/javascript.png"
import c from "./images/c.png";
import cPlusPlus from "./images/cPlusPlus.png";

//mapping languages to language images
const languageMap = {
  "python": python,
  "java":java,
  "javascript": javascript,
  "c": c,
  "c++": cPlusPlus
}

//a function for parsing HTML from JSON to HTML in React
//https://www.pluralsight.com/guides/return-html-elements-in-json
const RenderHTML=(htmlPart)=>{
    return(
      <div dangerouslySetInnerHTML={ {__html: htmlPart} } />
    )
}

function App() {

  //defining react states

  const[showDraw , setShowDraw] = React.useState(false);
  const [showNote,setShowNote] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const [url,setUrl] = React.useState("");
  const [problem,setProblem] = React.useState("");
  const[title,setTitle]= React.useState("")
  const [difficulty,setDifficulty] = React.useState("");
  const [language,setLanguage] = React.useState("python");

  const[yt, setYt] = React.useState("https://www.youtube.com");
  const[google,setGoogle] = React.useState("https://www.google.com/");


  return (
    <div className="App">
    <h1 style={{fontSize:"40px"}}>Leet<span style={{color:"#DC582A"}}>Doc</span> <i class="fa-solid fa-file-code"></i></h1>
    <p style={{color: "#FFD580",width:"80%",marginLeft:"auto",marginRight:"auto"}}>The IDE to help you grind LeetCode & crack the coding interview.</p>

    <Timer/>

    <p>Enter LeetCode Problem Tag:</p>
    <p>e.g. for the URL - leetcode.com/problems/<span style={{color:"yellowgreen"}}>two-sum</span>/ </p>
    <p><span style={{color:"yellowgreen"}}>two-sum</span> is the Problem Tag.</p>

    <input className="search" style={{marginBottom:"5px"}} value={url} onChange={(e)=>{
      setUrl(e.target.value);
    }} type="text"></input>


    <button className="get" onClick={async()=>{
      setProblem("Fetching question. Please wait...")
      setTitle("")
      setDifficulty("")
  const question = await axios.get("https://leetcode-scraper-api.herokuapp.com/?question="+url);

  if(question.data==="Question Not Found"){
   //
    setProblem(question.data);
  }
  else{
    setProblem(question.data.question);
    setTitle(question.data.questionId+". "+question.data.title)
    setDifficulty(question.data.difficulty)
    setYt("https://www.youtube.com/results?search_query="+question.data.title);
    setGoogle("https://www.google.com/search?q="+question.data.title);
  }
    }}>Get Question</button>

<br></br>
<br></br>
<br></br>
<br></br>

<hr></hr>

<h2>{title}</h2>
<h3 style={{color:"pink"}}>{difficulty}</h3>

<div className="code-body">
{RenderHTML(problem)}
</div>

<div class="brainstorm">
<h2 style={{color:"#DC582A"}}>Brain<span style={{color:"white"}}>storm</span> 🧠</h2>
<h4>Write notes, test cases and plan out your approach...</h4>

<button onClick={()=>{setShowDraw(!showDraw)}} className="drawing-pad">Drawing Pad 🎨</button>
<button onClick={()=>{setShowNote(!showNote)}} className="note">Make Notes ✏️ </button>
</div>



{showDraw ? <Painter/>: <div></div>}
{showNote ? <Note/>: <div></div>}




<h4 class="ide">Choose Your Fighter:</h4>

<div style={{paddingBottom:"10px"}}><img alt="language" style={{height:"50px",
width:"50px"}} src={languageMap[language]}/></div>


<select value= {language} onChange={(e)=>{
setLanguage(e.target.value);
}} name="p-languages" id="p-languages">
<option value="python">Python</option>
<option value="java">Java</option>
<option value="javascript">JavaScript</option>
<option value="c">C</option>
<option value="c++">C++</option>
</select>

<br></br>

<textarea spellcheck="false" placeholder="Start Coding Here..." onKeyDown={(event)=>{
  //code for making indent while pressing Tab
  //https://www.codegrepper.com/code-examples/typescript/how+to+make+tab+indent+in+textarea+react
     if ( event.key === 'Tab' && !event.shiftKey ) {
   document.execCommand('insertText', false, "\t");
   event.preventDefault();
   return false;
}
}}
 id="textbox" value={code} onChange={(e)=>{
      setCode(e.target.value);
    }}>
    </textarea>

    <br>
    </br>

    <button className="code-submit" onClick={async()=>{

      const data = {
        source: code,
        language:language
      }

      const formatData = new URLSearchParams(data).toString()

      //Node.js REST API for code execution in my local computer
      //const output = await axios.post("http://localhost:5000/run",formatData)


      //however, for hosting, it is very difficult to containerize 
      //so used piston API
      //https://github.com/engineer-man/piston#Public-API
      //used the piston API for hosting time

      const output = await axios.post("https://emkc.org/api/v1/piston/execute",formatData)
      console.log(output.data.output);
      setDisplay(output.data.output);

    }}>Run Code</button>

    <h2>Output:</h2>

    <div className="output-box">
    <code style={{whiteSpace:"pre-line"}}>{display}</code>
    </div>
    <br></br>


    <h2>Stuck?</h2>

    <h3>Search Question In:</h3>

    <a class="yt" target="_blank" href={yt}><button className="help-yt"> <i class="fa-brands fa-youtube"></i></button></a>

    <a class="google" target="_blank" href={google} ><button className="help-google"><i class="fa-brands fa-google"></i></button></a>

  
    </div>

  );
}

export default App;
