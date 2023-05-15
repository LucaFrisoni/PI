import React from "react";
import "./About.css";
import img_instagram from "../../Assets/icons8-instagram-64.png"
import img_face from "../../Assets/icons8-facebook-64 (1).png"
import img_linkedin from "../../Assets/icons8-linkedin-64 (1).png"
import img_whatsapp from "../../Assets/icons8-whatsapp-64.png"
import img_twitter from "../../Assets/icons8-twitter-64.png"
import img_home from "../../Assets/icons8-home-64.png"

import {Link} from "react-router-dom"


export default function About() {
  return (
    <section className="jejee">
      <div className="colorr"></div>
      <div className="colorr"></div>
      <div className="colorr"></div>
      <ul className="jojo">
        <li>
          <a href="https://www.facebook.com/luca.frisoni.984" target="_blank">
          <img className="img-face" src={img_face}></img>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/lodum2509" target="_blank">
          <img className="img-twitter" src={img_twitter}></img>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/luccafrisoni____/" target="_blank">
            <img className="img-inst" src={img_instagram}></img>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/luca-frisoni-58ba67238/" target="_blank">
          <img className="img-linkedin" src={img_linkedin}></img>
          </a>
        </li>
        <li>
          <a href="https://api.whatsapp.com/send?phone=1176048078" target="_blank">
          <img className="img-wpp" src={img_whatsapp}></img>
          </a>
        </li>
        <Link to="/home" className="homeLink">
        <li>
          <a href="" >
            <img className="img-home" src={img_home}></img>
          </a>
        </li>
        </Link>
      </ul>
    </section>
  );
}
