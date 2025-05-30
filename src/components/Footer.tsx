import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h5>COMPANY</h5>
          <ul>
            <li><a href="#">About Last.fm</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Jobs</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5>HELP</h5>
          <ul>
            <li><a href="#">Track My Music</a></li>
            <li><a href="#">Community Support</a></li>
            <li><a href="#">Community Guidelines</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5>GOODIES</h5>
          <ul>
            <li><a href="#">Download Scrobbler</a></li>
            <li><a href="#">Developer API</a></li>
            <li><a href="#">Free Music Downloads</a></li>
            <li><a href="#">Merchandies</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5>ACCOUNT</h5>
          <ul>
            <li><a href="#">Inbox</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Last.fm Pro</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h5>FOLLOW US</h5>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Youtube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="language-selector">
          <span>English</span>
          <span>Deutsch</span>
          <span>Español</span>
          <span>Italiano</span>
          <span>Polski</span>
          <span>Svenska</span>
          <span>Русский</span>
        </div>
        <div className="timezone-info">
          <span>Time zone:</span>
          <span>Europe/Moscow</span>
        </div>
        <div className="some-info">
          <span>CBS Interactive © 2025 Last.fm Ltd. All rights reserved Terms of Use Privacy Policy Legal Policies Cookie Details Jobs at Paramount Last.fm Music</span>
        </div>
        <img src="logo_red.png" alt="Logo" className="footer-logo"/>
      </div>
    </footer>
  );
};

export default Footer;