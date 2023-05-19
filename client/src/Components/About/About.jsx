import img_instagram from "../../Assets/icons8-instagram-64.png"
import img_face from "../../Assets/icons8-facebook-64 (1).png"
import img_linkedin from "../../Assets/icons8-linkedin-64 (1).png"
import img_whatsapp from "../../Assets/icons8-whatsapp-64.png"
import img_twitter from "../../Assets/icons8-twitter-64.png"
import img_home from "../../Assets/icons8-home-64.png"
import React from "react";
import "./About.css";




export default function About() {
  
  return (
    <section className="jejee">
      <div className="colorr"></div>
      <div className="colorr"></div>
      <div className="colorr"></div>
      <ul className="jojo">
        <li>
          <a href="https://www.facebook.com/luca.frisoni.984" rel="noreferrer" target="_blank">
          <img className="img-face" alt="imagen" src={img_face}></img>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/lodum2509" rel="noreferrer" target="_blank">
          <img className="img-twitter" alt="imagen" src={img_twitter}></img>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/luccafrisoni____/" rel="noreferrer" target="_blank">
            <img className="img-inst" alt="imagen" src={img_instagram}></img>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/luca-frisoni-58ba67238/" rel="noreferrer" target="_blank">
          <img className="img-linkedin" alt="imagen" src={img_linkedin}></img>
          </a>
        </li>
        <li>
          <a href="https://api.whatsapp.com/send?phone=1176048078" rel="noreferrer" target="_blank">
          <img className="img-wpp" alt="imagen" src={img_whatsapp}></img>
          </a>
        </li>
    
        <li>
          <a href="http://localhost:3000/home" >
            <img className="img-home" alt="imagen" src={img_home}></img>
          </a>
        </li>
      
      </ul>
    </section>
  );
}
