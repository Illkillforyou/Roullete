import React, { useEffect, useState, useRef } from "react";
import useInterval from "./useInterval";

const App = (props) => {
  const [left, setLeft] = useState(-100);
  const [speed, setSpeed] = useState(props.speed);
  const [award, setAward] = useState(false);
  const [press, setPressed] = useState(false);
  const isInitialMount = useRef(true);
  const item = useRef(null);
  let spaceBetweenElements = props.index * 220;
  let elementPosition = left + spaceBetweenElements;

  let accelleration = 0.0009;

  useEffect(() => {
    if (elementPosition >= 27 && elementPosition <= 195 && award) {
      props.takeFromChildShow(props.price);
    }
  }, [award]);

  useEffect(() => {
    setLeft(-100);
    props.takeIntoInventory();
    setSpeed(props.speed);
    setAward(false);
  }, [props.reset]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setPressed(true);
    }
  }, [props.press]);

  useInterval(
    () => {
      if (item.current.offsetLeft < -150) {
        setLeft(950 - spaceBetweenElements);
      } else {
        setLeft(left - speed);
        if (speed > 0.01) {
          setSpeed(speed - (accelleration + 0.05));
        } else {
          setAward(true);
          setPressed(false);
        }
      }
    },
    10,
    !press
  );

  let checkTheWinningElement = () => {
    if (elementPosition >= 27 && elementPosition <= 195 && award) {
      return true;
    }

    return false;
  };

  return (
    <div
      className="item"
      ref={item}
      style={{
        position: "absolute",
        left: `${elementPosition}px`,
        top: checkTheWinningElement() ? `10px` : ``,
      }}
    >
      <span>{props.price}</span>
    </div>
  );
};

export default App;
