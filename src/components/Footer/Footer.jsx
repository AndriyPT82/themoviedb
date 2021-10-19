import React from "react";
import './Footer.scss';

export const Footer = () => {

  return (
    <div className="footer">
      <div className="footer__about-author">
        <span>Andriy Ivanyk</span>

        <div className="footer__social-media">
          <a
            href="https://www.facebook.com/andriy.ivanyk.3"
            className="footer__icon"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="" />
          </a>
          <a
            href="https://github.com/AndriyPT82?tab=repositories"
            className="footer__icon"
          >
            <img src="https://cdn4.iconfinder.com/data/icons/socialcones/508/Github-512.png" alt="" />
          </a>
          <a
            href="https://www.linkedin.com/in/andriy-ivanyk-06057a1b8/"
            className="footer__icon"
          >
            <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}
