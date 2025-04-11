import { useState, useCallback } from "react";
import arrows from "/src/assets/double_arrow_right.svg";
import GameMap from "/src/assets/background_clouds.png";
import Coin from "/src/assets/Coin.png";
import QuestionBlock from "/src/assets/question_block.png";
import UsedBlock from "/src/assets/used_block.png";
import WhiteArrow from "/src/assets/double_white_arrow.svg";
import "./Window.css";

const Coins = ({ top, left }) => (
  <div
    className="absolute coinAnimation"
    style={{ top: `${top - 45}px`, left: `${left + 13}px` }}
  >
    <img src={Coin.src} alt="Coin" className="w-[45px] h-[46px]" />
  </div>
);

const Blocks = ({ top, left, id, isUsed, onClick, showCoin, description }) => (
  <>
    <div
      className={`absolute w-[70px] h-[70px]`}
      style={{ top: `${top}px`, left: `${left}px` }}
      onClick={() => onClick(id)}
    >
      {isUsed ? (
        <img src={UsedBlock.src} alt="Used Block" className="w-full h-full" />
      ) : (
        <img
          src={QuestionBlock.src}
          alt="Block"
          className="w-full h-full cursor-pointer block-hover question-block-idle"
        />
      )}
    </div>
    {isUsed && (
      <div
        className="absolute text-white text-center text-[14px] w-[80px] fade-in"
        style={{ top: `${top + 75}px`, left: `${left - 5}px` }}
      >
        {description}
      </div>
    )}

    {showCoin && <Coins top={top} left={left} />}
  </>
);

const BlocksPositions = [
  { id: 1, top: 190, left: 40 },
  { id: 2, top: 190, left: 160 },
  { id: 3, top: 190, left: 280 },
  { id: 4, top: 190, left: 400 },
];

const BlockDescriptions = [
  { id: 1, desc: "2017 - 2022" },
  { id: 2, desc: "2022 - 2024" },
  { id: 3, desc: "2023 - today" },
  { id: 4, desc: "2024 - today" },
];

const BlockContents = [
  {
    id: 1,
    title: "High School",
    content:
      "Technical diploma in Computer Science with focus on software development and programming fundamentals.",
  },
  {
    id: 2,
    title: "University of Genoa",
    content:
      "Computer Engineering studies with focus on algorithms and data structures.",
  },
  {
    id: 3,
    title: "Freelance Tester",
    content:
      "Gold-rated software tester on uTest platform, identifying bugs and ensuring high-quality user experiences.",
  },
  {
    id: 4,
    title: "Game Dev AR/VR Academy & Front-end developer",
    content:
      "Specializing in Unity game development while mastering interactive web design with React",
  },
];

export default function Window() {
  const [isClicked, setIsClicked] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [blockStates, setBlockStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [coinStates, setCoinStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const handleClick = () => setIsClicked(true);

  const handleBlockClick = useCallback(
    (id) => {
      if (!blockStates[id]) {
        setBlockStates((prev) => ({ ...prev, [id]: true }));
        setCoinStates((prev) => ({ ...prev, [id]: true }));
        setActiveContent(BlockContents.find((content) => content.id === id));

        setTimeout(() => {
          setCoinStates((prev) => ({ ...prev, [id]: false }));
        }, 500);
      } else {
        setActiveContent(BlockContents.find((content) => content.id === id));
      }
    },
    [blockStates]
  );

  const handleBackClick = () => {
    setIsClicked(false);
    setActiveContent(null);
    setBlockStates({
      1: false,
      2: false,
      3: false,
      4: false,
    });
    setCoinStates({
      1: false,
      2: false,
      3: false,
      4: false,
    });
  };
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
        <p className={`text-white text-[22px]  ${isClicked ? "fade-out" : ""}`}>
          Click here!
        </p>
        <img
          className={`mt-[10px] slide-right-arrow  ${
            isClicked ? "fade-out" : ""
          }`}
          src={arrows.src}
          loading="lazy"
          alt="arrows"
        />
      </div>

      {isClicked && (
        <div className="absolute top-0 left-0 flex justify-around items-center w-full h-full">
          <div className="relative w-[520px] h-[310px] fade-in-05">
            <img
              className="size-full object-cover rounded-xl"
              src={GameMap.src}
              loading="lazy"
            />
            <div className="absolute inset-0 z-10 fade-in-1">
              {BlocksPositions.map((block) => {
                const desc = BlockDescriptions.find(
                  (d) => d.id === block.id
                )?.desc;
                return (
                  <Blocks
                    key={block.id}
                    id={block.id}
                    top={block.top}
                    left={block.left}
                    isUsed={blockStates[block.id]}
                    showCoin={coinStates[block.id]}
                    onClick={handleBlockClick}
                    description={desc}
                  />
                );
              })}
            </div>
          </div>
          <div className="border-3 border-[#AEAEAE] bg-[#1E1E1E] w-[350px] h-[350px] text-white fade-in-05 p-4 overflow-auto relative">
            {activeContent ? (
              <div className="fade-in">
                <h2 className="text-[#8bb4ed] text-2xl font-semibold mb-2">
                  {activeContent.title}
                </h2>
                <p className="text-gray-300">{activeContent.content}</p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>Click on a block to find out more !</p>
              </div>
            )}
            {activeContent && (
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center">
                <p className="text-gray-400 mb-1 text-sm">
                  Click here to go back
                </p>
                <img
                  src={WhiteArrow.src}
                  alt="Back"
                  className="w-8 h-8 cursor-pointer slide-left-arrow"
                  onClick={handleBackClick}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
