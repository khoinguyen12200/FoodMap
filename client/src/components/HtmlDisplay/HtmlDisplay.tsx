import React from 'react'
import parse from 'html-react-parser'; 
import "./HtmlDisplay.scss";


type Props = {
    html:string;
}

function HtmlDisplay({html}: Props) {
  return (
    <div className="HTML_Display"> {parse(html)} </div>
  )
}

export default HtmlDisplay