import { useState } from 'react';
import React from 'react';
import './Text.css'
import PropTypes from 'prop-types';

function Text(props) {
  const handleUpClick = () =>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("converted to UpperCase","success");
  };
  const handleLoClick = () =>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("converted to LowerCase","success");
  };
  const handleClearClick = () =>{
    let newText =("");
    setText(newText);
    props.showAlert("cleaned" , "success");
  };
  const handelCopy = ()=>{
    var text = document.getElementById("myBox");
    text.select();
    text.setSelectionRange(0,99999999);
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text Copied to Clipboard","success");

  };

  const handleExtraSpaces = () =>{
    let newText = text.split(/\s+/);
    setText(newText.join(" "));
    props.showAlert("Extra space removed","success");

  };
  const handleReverse = () => {
    setText(text.split('').reverse().join(''));
    props.showAlert("Text Reversed","success");
  };
  
  const handleOnChange = (event) =>{
    setText(event.target.value);
  };
  const[text, setText] = useState('');
  return (
    <>
    <div className="container" style={{color: props.mode === 'dark' ? 'white':'black'}}>
    <h1>{props.heading}</h1>
<div className="mb-3">
<textarea className="form-control" id="myBox" rows="9" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark' ? '#13466e':'white',color: props.mode === 'dark' ? 'white':'#042743', borderColor:'blue',border:'1px solid',fontWeight:'bolder', fontFamily:'Arial'}}></textarea>
</div>
<button disabled={text.length===0} className="btn btn-primary mx-2" onClick={handleUpClick}>Convert To UpperCase</button>
<button disabled={text.length===0} className="btn btn-primary mx-1 my-2" onClick={handleLoClick}>Convert To LowerCase</button>
<button disabled={text.length===0} className="btn btn-primary mx-1 my-2" onClick={handleClearClick}>Clear Text</button>
<button disabled={text.length===0} className="btn btn-primary mx-1" onClick={handelCopy} id='myBox'>Copy text</button>
<button disabled={text.length===0} className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
<button disabled={text.length===0} className="btn btn-primary mx-1 my-2" onClick={handleReverse}>Revers Text</button>
</div>
{/* Todays Update in Apps */}
<div className="contrainer my-4" style={{color: props.mode === 'dark' ? 'white':'black'}}>
  <h2>Your text Summary</h2>
  <p>{text.split(" ").filter((element) =>{return element.length!==0}).length} words and {text.length} characters</p>
  <p>{0.08 * text.split(" ").filter((element) =>{return element.length!==0}).length} minutes read</p>
  <h2>Preview</h2>
  <p>{text.length>0?text:"Nothing To Preview"}</p>
</div>
    </>
  )
}

export default Text
