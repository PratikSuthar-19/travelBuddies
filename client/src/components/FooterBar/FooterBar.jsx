import React from 'react'
import './FooterBar.css'
import { Link } from 'react-router-dom'

const FooterBar = () => {
  return (
    <>
    <div className="footer-outer">
        <div className="footer-left">
        <Link to={"/"}>
        <p> TravelBuddy </p>
        </Link>
        </div>
        <div className="footer-right">
            <div className="fr-top">

                <div className="link">
                <Link to={'#'}>
                  Twitter
                </Link>
                </div>
                <div className="link">
                <Link to={'#'}>
                  Instagram
                </Link>
                </div>
                <div className="link">
                <Link to={'#'}>
                 Facebook
                </Link>
                </div>

            </div>
            <div className="fr-bot">
                 <p> <b>©</b>TravelBuddy Private Limited </p>
            </div>
        </div>
    </div>
    </>
  )
}

export default FooterBar