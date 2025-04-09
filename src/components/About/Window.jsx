import { useState, useEffect } from "react";
import arrows from "/src/assets/double_arrow_right.svg";
import GameMap from "/src/assets/background_clouds.png";
import Coin from "/src/assets/Coin.png";
import QuestionBlock from "/src/assets/question_block.png";
import UsedBlock from "/src/assets/used_block.png";
import "./Window.css";

export default function Window() {
  const [isClicked, setIsClicked] = useState(false);
  const [showCoin, setShowCoin] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setShowBlock(true);
  };

  const Coins = ({ top, left }) => (
    <div className="">
      <img className="" src={Coin.src} alt="Coin" />
    </div>
  );

  const Blocks = ({ top, left }) => (
    <div
      className="w-[70px] h-[70px]"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <img
        src={QuestionBlock.src}
        alt="Block"
        loading="lazy"
        className="w-full h-full"
      />
    </div>
  );

  const BlocksPositions = [
    { id: 1, top: 50, left: 50 },
    { id: 2, top: 100, left: 100 },
    { id: 3, top: 150, left: 150 },
    { id: 4, top: 200, left: 200 },
  ];

  return (
    <div className="flex justify-around items-center mt-[40px] relative">
      <div className="relative min-w-[730px] h-[340px] overflow-hidden">
        <div
          className={`bg-[#1E1E1E] w-[730px] h-full border border-[#AEAEAE] border-5 flex items-center ${
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
          loading="lazy"
          alt="arrows"
        />
      </div>

      {isClicked && (
        <div className="absolute top-0 left-0 flex justify-around items-center w-full h-full">
          <div className="relative w-[520px] h-[320px]">
            <img
              className="size-full object-contain fade-in"
              src={GameMap.src}
              loading="lazy"
            />
            <div className="absolute inset-0 z-10 fade-in">
              {showBlock &&
                BlocksPositions.map((block) => (
                  <Blocks key={block.id} top={block.top} left={block.left} />
                ))}
            </div>
          </div>
          <div className="fade-in border-3 border-[#AEAEAE] bg-[#1E1E1E] w-[350px] h-[350px] text-white">
            test
          </div>
        </div>
      )}
    </div>
  );
}
