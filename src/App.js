import "./Styles/MainBuild/Main.css";
import Item from "./Components/Item";
import { useState } from "react";

function App() {
  const [order] = useState(
    /*     Array.from({ length: 4 }, () => Math.floor(Math.random() * 1000)) */
    [...Array(6)].map(() => {
      return Math.floor(Math.random() * 1000);
    })
  );
  const [press, setPress] = useState(false);
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(true);
  const [item, setItem] = useState(null);
  const [resetBtn, SetresetBtn] = useState(true);

  let randomSpeed = Math.floor(Math.random() * 20 + 4);

  let setResetBtnfromChild = (bool) => {
    SetresetBtn(bool);
  };

  let spin = () => {
    setPress((press) => !press);
  };

  let takeFromChildShow = (winningItem) => {
    setTimeout(() => {
      setShow(true);
    }, 500);
    setItem(winningItem);
  };

  let takeIntoInventory = () => {
    SetresetBtn(true);
    setShow(false);
    setReset((reset) => !reset);
  };

  return (
    <div className="App">
      {show ? (
        <div className="WinningModal">
          <div className="WinningAnimation">
            <div className="WinningHead pt-3">
              <span className="WinningNumber">{item}</span>
            </div>
            <div className="WinningBody">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg WinningBtn mt-5"
                onClick={takeIntoInventory}
              >
                Take
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="Content">
        <button
          type="button"
          className="btn btn-primary SpinBtn"
          onClick={takeIntoInventory}
          disabled={resetBtn ? "true" : ""}
        >
          Reset
        </button>

        <div className="box">
          <div className="Line"></div>
          <div className="AwardModal"></div>
          <div className="VisibleBlock">
            {order.map((item, index) => {
              return (
                <Item
                  reset={reset}
                  price={item}
                  index={index}
                  order={order}
                  press={press}
                  speed={randomSpeed}
                  takeFromChildShow={takeFromChildShow.bind(this)}
                  takeIntoInventory={takeIntoInventory}
                  setResetBtnfromChild={setResetBtnfromChild}
                />
              );
            })}
          </div>
        </div>

        <div className="Block">
          <button
            type="button"
            className="btn btn-primary SpinBtn"
            onClick={spin}
          >
            Spin
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
