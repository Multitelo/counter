import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);
  const [buttonStyle, setButtonStyle] = useState({});
  const [tapStyle, setTapStyle] = useState({});

  const handleHoursChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setHr(value >= 0 && value <= 23 ? value : 0);
  };

  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMin(value >= 0 && value <= 59 ? value : 0);
  };

  const handleSecondsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSec(value >= 0 && value <= 59 ? value : 0);
  };
  // Generate options for hours (0-23)
  const hoursOptions = Array.from({ length: 24 }, (_, i) => i);

  // Generate options for minutes and seconds (0-59)
  const minutesSecondsOptions = Array.from({ length: 60 }, (_, i) => i);

  useEffect(() => {
    let interval;

    if (isRunning && !countdown) {
      interval = setInterval(() => {
        setSec((prevSec) => {
          if (prevSec === 59) {
            setMin((prevMin) => {
              if (prevMin === 59) {
                setHr((prevHr) => prevHr + 1);
                return 0; // Reset minutes to 0
              } else {
                return prevMin + 1;
              }
            });
            return 0; // Reset seconds to 0
          } else {
            return prevSec + 1;
          }
        });
      }, 1000);
    }
    // Cleanup function to clear the interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, countdown]);

  useEffect(() => {
    let interval;

    if (countdown && !isRunning) {
      interval = setInterval(() => {
        setSec((prevSec) => {
          if (prevSec === 0) {
            if (min === 0 && hr === 0) {
              clearInterval(interval);
              setCountdown(false);
              return 0;
            } else {
              setMin((prevMin) => {
                if (prevMin === 0) {
                  setHr((prevHr) => prevHr - 1);
                  return 59;
                } else {
                  return prevMin - 1;
                }
              });
              return 59;
            }
          } else {
            return prevSec - 1;
          }
        });
      }, 1000);
    }
    // Cleanup function to clear the interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, isRunning, hr, min]);

  const handleTap = () => {
    setIsRunning((prev) => !prev);
    setCountdown(false);
  };
  const handleTapb = () => {
    setCount(count + 1);

    // Apply styles on Tap click
    setTapStyle({
      backgroundColor: "green",
      color: "white",
      border: "2px solid darkgreen",
    });

    // Reset De-Tap button styles
    setButtonStyle({});
  };
  const handleDeTap = () => {
    if (count > 0) {
      setCount(count - 1);

      // Apply styles on click
      setButtonStyle({
        backgroundColor: "red",
        color: "white",
        border: "2px solid darkred",
      });

      setTapStyle({});
    }
  };
  const countdownbtn = () => {
    setCountdown((prev) => !prev);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCount(0);
    setTapStyle({});
    setButtonStyle({});
  };
  return (
    <>
      <h1>Tap Counter</h1>
      <div className="count">
        <h3>Your tap count is {count}</h3>

        <div className="tapb">
          <button onClick={handleTapb} className="tap" style={tapStyle}>
            Tap
          </button>
          <button onClick={handleDeTap} className="detap" style={buttonStyle}>
            De-Tap
          </button>
          <button onClick={handleReset} className="reset">
            Reset
          </button>
        </div>
      </div>
      <h1>Timer</h1>
      <div className="time">
        <h3>
          The time is {hr < 10 ? `0${hr}` : hr}:{min < 10 ? `0${min}` : min}:
          {sec < 10 ? `0${sec}` : sec} seconds
        </h3>
        <div>
          <button onClick={handleTap} className="tap">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => (
              setHr(0), setMin(0), setSec(0), setIsRunning(false)
            )}
            className="reset"
          >
            Reset
          </button>
          <button onClick={countdownbtn} className="tap">
            {countdown ? "Stop" : "Count Down"}
          </button>
        </div>
      </div>
      <div className="cdown">
        <p>Countdown timer input</p>
        <div>
          <div className="tinput">
            <label>Hours</label>
            <select value={hr} onChange={handleHoursChange}>
              {hoursOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {String(hour).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="tinput">
            <label>Minutes</label>
            <select value={min} onChange={handleMinutesChange}>
              {minutesSecondsOptions.map((minute) => (
                <option key={minute} value={minute}>
                  {String(minute).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="tinput">
            <label>Seconds</label>
            <select value={sec} onChange={handleSecondsChange}>
              {minutesSecondsOptions.map((second) => (
                <option key={second} value={second}>
                  {String(second).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <h5 style={{ marginTop: "30%" }}>
        <i>Made by Multitelo</i>
      </h5>
    </>
  );
}

export default App;
