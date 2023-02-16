import { useState, useEffect } from "react";

const useSlider = () => {
  const [IsDragging, setIsDragging] = useState(false);
  const [StartPosition, setStartPosition] = useState(0);
  const [PositionX, setPositionX] = useState(0);
  const [CurrentTranslate, setCurrentTranslate] = useState(0);
  const [PrevTranslate, setPrevTranslate] = useState(0);
  const [AnimationID, setAnimationID] = useState(0);
  const [CurrentIndex, setCurrentIndex] = useState(0);

  const TouchStart = (
    e: // | React.TouchEvent<HTMLDivElement>
    React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setIsDragging(true);
    setCurrentIndex(index);
    getPositionX(e);

    setAnimationID(requestAnimationFrame(animation));
  };

  const setSliderPosition = () => {
    document.getElementById(
      "Slider"
    )!.style.transform = `translateX(${CurrentTranslate}px)`;
  };

  const animation = () => {
    setSliderPosition();
    if (IsDragging) requestAnimationFrame(animation);
  };

  const getPositionX = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPositionX(e.pageX);
    return PositionX;
  };

  const TouchEnd = () => {
    if (IsDragging) {
      console.log("end");
      setIsDragging(false);
    }
  };

  const TouchMove = (
    e: // | React.TouchEvent<HTMLDivElement>
    React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (IsDragging) {
      const currentPosition = getPositionX(e);
      setCurrentTranslate(PrevTranslate + PositionX - StartPosition);
      console.log(PrevTranslate, PositionX, StartPosition);

      // console.log(CurrentTranslate);
    }
  };
  return { TouchStart, TouchEnd, TouchMove };
};

export default useSlider;
