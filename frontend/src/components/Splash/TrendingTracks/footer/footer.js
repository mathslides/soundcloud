import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                    {/* Your App Logo */}
                    <div className="mb-4">
                        <a href="#" className="my-4 mx-auto">
                            <img src="./calisomniaLogo.png" alt="" className="h-11" style={{ width: "165px" }} />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="text-sm">
                        <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                        <li><a href="/aboutUs" className="text-gray-300 hover:text-white">About</a></li>
                        {/* <li><a href="/services" className="text-gray-300 hover:text-white">Services</a></li>
                        <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li> */}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                    <ul className="text-sm">
                        <li>Email: info@calisomnia.com</li>
                        <li>Phone: +1 (123) 456 78</li>
                        <li>Address: Los Angeles, California(CA), 90011</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex items-center space-x-4">
                        <a href="https://www.facebook.com/calisomnia" className="text-gray-300 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-20 text-center">
                <p>&copy; {new Date().getFullYear()} calisomnia. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
