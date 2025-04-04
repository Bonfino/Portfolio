import { useState, useEffect } from "react";
import arrows from "/src/assets/double_arrow_right.svg";
import gameMap from "/src/assets/game_map.jpg";
import Coin from "/src/assets/Coin.png";
import "./Window.css";

export default function Window() {
  const [isClicked, setIsClicked] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showCoins, setShowCoins] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const coinPositions = [
    { id: 1, top: "50px", left: "180px" },
    { id: 2, top: "48px", left: "373px" },
    { id: 3, top: "180px", left: "235px" },
    { id: 4, top: "252px", left: "328px" },
  ];

  const CoinMarker = ({ top, left }) => (
    <div
      className="absolute z-10 w-[25px] h-[25px] fade-in"
      style={{ top, left }}
    >
      <img src={Coin.src} alt="Coin" className="w-full h-full" />
    </div>
  );

  useEffect(() => {
    if (isClicked) {
      const timer1 = setTimeout(() => {
        setShowImage(true);

        const timer2 = setTimeout(() => {
          setShowCoins(true);
        }, 500);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }, 350);

      return () => clearTimeout(timer1);
    } else {
      setShowImage(false);
      setShowCoins(false);
    }
  }, [isClicked]);

  return (
    <div className="flex justify-around items-center mt-[40px] relative">
      <div className="relative min-w-[730px] h-[340px] overflow-hidden">
        <div
          className={`bg-[#1E1E1E] w-[730px] h-full border border-[#AEAEAE] border-5 flex items-center transition-all duration-500 ${
            isClicked ? "slide-closed" : ""
          }`}
        >
          <p className="text-[#E0E0E0] text-[22px] leading-[30px] ml-[10px] min-w-[710px]">
            Hi! I'm a 23-year-old Italian programmer focused on{" "}
            <span className="text-[#8bb4ed]">game development</span> and
            <span className="text-[#8bb4ed]"> front-end</span> skills.
            <br />
            <br />I have a technical diploma in{" "}
            <span className="text-[#8bb4ed]">computer science</span> and two
            years of university study in{" "}
            <span className="text-[#8bb4ed]">computer engineering</span>.
            <br />
            <br />
            Now, I'm blending my coding passion with game dev to craft
            interactive experiences. I'm also a{" "}
            <span className="text-[#8bb4ed]">Gold Tester</span> on uTest.
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center items-center click-container cursor-pointer ${
          isClicked
            ? "pointer-events-none cursor-default"
            : "pointer-events-auto cursor-pointer"
        }`}
        onClick={handleClick}
      >
        <p
          className={`text-white text-[22px] transition-opacity duration-500 ${
            isClicked ? "fade-out" : ""
          }`}
        >
          Click here!
        </p>
        <img
          className={`mt-[10px] slide-right-arrow transition-opacity duration-500 ${
            isClicked ? "fade-out" : ""
          }`}
          src={arrows.src}
          alt="arrows"
        />
      </div>

      {showImage && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-around">
          <div className="relative">
            <img
              className="transition-opacity duration-500 fade-in rounded-xl max-h-full max-w-full"
              src={gameMap.src}
              alt="gameMap"
            />
            {showCoins &&
              coinPositions.map((coin) => (
                <CoinMarker key={coin.id} top={coin.top} left={coin.left} />
              ))}
          </div>
          <div className="transition-opacity duration-500 fade-in border-3 border-[#AEAEAE] bg-[#1E1E1E] w-[350px] text-white">
            test
          </div>
        </div>
      )}
    </div>
  );
}
