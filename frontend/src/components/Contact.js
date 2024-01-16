// ContactPage.js

import React from 'react';
import './Main';
import Navbar from './Navbar';

const ContactPage = () => {
    const img ="https://thumbs.dreamstime.com/b/website-internet-contact-us-page-concept-phone-chat-email-icons-icon-wood-cube-symbol-telephone-mail-mobile-wide-web-245407789.jpg"
  return (
    <div >
        <Navbar></Navbar>
        <div className="contact-container" style={{}}>
      <h2>Contact Us</h2>
      <p>
        Thank you for visiting our blog! If you have any questions, suggestions,
        or just want to say hello, feel free to reach out to us.
      </p>
      <div className="contact-details">
        <p>Email: Blog@gmail.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
