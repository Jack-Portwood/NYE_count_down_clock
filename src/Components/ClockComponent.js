import React, { Fragment, useEffect, useRef, useState } from "react";

const countDownText = "2020 Countdown";

const newYearText = "Happy Hogmanay!" ;

const newYearGelic = "Bliadhna Mhath Ùr!"

const ClockComponent = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [isBackground1, setBackground] = useState(true);
  const [timerText, setNewYearText] = useState(countDownText);
  const [noText, setGaelicText] = useState()

  let interval = useRef();

  const startTimer = () => {
    const countDownDate = new Date("January 1 2021 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
        setBackground(false)
        setNewYearText(newYearText)
        setGaelicText(newYearGelic)
      } else {
        //update
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <Fragment>
      <div className="container">
        <section className={isBackground1 ? "background1" : "background2"}>
          <section className="timer">
            <div className="timerText">
              <h1>{timerText}</h1>
            </div>
            <br />
            <div className="Gaelic">
              <h1>{noText}</h1>
            </div>
            <div className="timerBox">
              <section>
                <p>{timerDays}</p>
                <p>
                  <small>Days</small>
                </p>
              </section>
              <span>|</span>
              <section>
                <p>{timerHours}</p>
                <p>
                  <small>Hours</small>
                </p>
              </section>
              <span>|</span>
              <section>
                <p>{timerMinutes}</p>
                <p>
                  <small>Minutes</small>
                </p>
              </section>
              <span>|</span>
              <section>
                <p>{timerSeconds}</p>
                <p>
                  <small>Seconds</small>
                </p>
              </section>
            </div>
          </section>
        </section>
      </div>
    </Fragment>
  );
};

export default ClockComponent;
