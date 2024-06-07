// import React from 'react';
// import aboutImage from './images/about10.jpeg';
// import Navigation from '../Navigation';
// import Footer from '../Splash/TrendingTracks/footer/footer';

// const AboutUs = () => {
//     return (
//         <div className="flex flex-col min-h-screen">
//             <Navigation />
//             <div className="flex-grow flex flex-col lg:flex-row mb-20 mt-4">
//                 <div className="w-full lg:w-1/2 flex flex-col justify-center bg-black bg-opacity-75 p-10 text-white lg:max-w-lg">
//                     <h2 className="text-3xl lg:text-5xl font-bold mb-6">Fostering Creative Unity</h2>
//                     <h2 className="text-lg lg:text-2xl font-bold mb-6">Inspiring Artists, Building Community</h2>
//                     <p className="text-sm lg:text-base mb-4">
//                         Calisomnia is a platform dedicated to showcasing the talents of artists across Africa. Our mission is to provide a space where artists can express themselves, share their creativity, and connect with a broader audience.
//                     </p>
//                     <p className="text-sm lg:text-base mb-4">
//                         At Calisomnia, we believe that every artist deserves recognition and support. Whether you're a musician, painter, dancer, writer, or any other type of artist, we welcome you to join our community and share your passion with the world.
//                     </p>
//                 </div>
//                 <div className="pt-20 lg:w-2/3 relative overflow-hidden bg-black bg-opacity-75 flex justify-center items-center">
//                     <img src={aboutImage} alt="About" className="w-5/6 lg:w-2/3 h-auto object-cover rounded-lg hover:border-transparent hover:border-white transform scale-100 hover:scale-105 transition-transform duration-500 ease-in-out" />
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default AboutUs;

import React from 'react';
import aboutImage from './images/about10.jpeg';
import Navigation from '../Navigation';
import Footer from '../Splash/TrendingTracks/footer/footer';

const AboutUs = () => {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Navigation />
            <div className="flex-grow mb-20 mt-4">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 flex flex-col justify-center bg-black bg-opacity-75 p-10 text-white">
                        <h2 className="text-3xl lg:text-5xl lg:pt30 font-bold mb-6">Fostering Creative Unity</h2>
                        <h2 className="text-lg lg:text-2xl font-bold mb-6">Inspiring Artists, Building Community</h2>
                        <p className="text-sm lg:text-base mb-4">
                            Calisomnia is a platform dedicated to showcasing the talents of artists across Africa. Our mission is to provide a space where artists can express themselves, share their creativity, and connect with a broader audience.
                        </p>
                        <p className="text-sm lg:text-base mb-4">
                            At Calisomnia, we believe that every artist deserves recognition and support. Whether you're a musician, painter, dancer, writer, or any other type of artist, we welcome you to join our community and share your passion with the world.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/2 pt-10 relative overflow-hidden bg-black bg-opacity-75">
                        <img
                            src={aboutImage}
                            alt="About"
                            className="w-full h-auto object-cover rounded-2xl transition-all duration-300 ease-in-out hover:rounded-2xl"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;
