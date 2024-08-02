import React from 'react';
import MainImage from "../assets/imagetwo.png"
import LockIcon from "../assets/Vector.png"

const MainPage = () => {
  return (
    <div className="w-3/4 h-screen p-4 flex flex-col items-center justify-center bg-blue-100 relative">
      <img src={MainImage} alt="Pocket Notes" className="mb-4" />
      <h1 className="text-3xl font-bold mb-2">Pocket Notes</h1>
      <p className="text-center text-lg w-2/3">Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
      <div className="absolute bottom-4 flex items-center">
        <img src={LockIcon} alt="Lock Icon" className="w-4 h-4 mr-2" />
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default MainPage;
