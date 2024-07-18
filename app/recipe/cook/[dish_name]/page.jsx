"use client"
import React, { useState, useEffect } from 'react';
import { Circle, Line } from 'rc-progress';
import Navbar from '@/app/components/Navbar';
import CookingSteps from '@/app/components/CookingSteps';

const CookDish = ({ params }) => {
  const { dish_name } = params;
  const [timer, setTimer] = useState(120);
  const [dishName, setDishName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    const removeSpaces = (dishName) => {
      return dishName.replace(/%20/g, ' ');
    };
    setDishName(removeSpaces(dish_name));
  }, [dish_name]);




  useEffect(() => {
    let countdown;

    if (isRunning) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(countdown);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimer(120);
  };

  const calculatePercentage = () => {
    return ((120 - timer) / 120) * 100;
  };

  return (
    <>
      <Navbar />
      <div className='bg-banana '>
      <div className='bg-[#ffffffcc] flex py-2'>
        <div className=" flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold mb-4">{dishName}</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-2">Steps to cook {dishName}</h2>
            <ol className="list-decimal list-inside">
              <li>Step 1: Prepare all the ingredients.</li>
              <li>Step 2: Preheat your cooking appliance.</li>
              <li>Step 3: Start cooking according to the recipe.</li>
              <li>Step 4: Monitor the dish as it cooks.</li>
              <li>Step 5: Serve and enjoy your meal.</li>
            </ol>
            <div className="my-4">
              <p>Time remaining: {formatTime(timer)}</p>
            </div>
            <div>
              <Line percent={calculatePercentage()} strokeWidth={2} strokeColor="#3B82F6" />
            </div>
            <div className='flex justify-between mt-4'>
              {!isRunning && !isPaused && (
                <button onClick={handleStart} className='bg-blue-500 text-white rounded-md shadow-md w-28 px-5 py-2'>Start</button>
              )}
              {isRunning && (
                <button onClick={handlePause} className='bg-blue-500 text-white rounded-md shadow-md w-28 px-5 py-2'>Pause</button>
              )}
              {isPaused && (
                <button onClick={handleResume} className='bg-blue-500 text-white rounded-md shadow-md w-28 px-5 py-2'>Resume</button>
              )}
              <button onClick={handleStop} className='bg-blue-500 text-white rounded-md shadow-md w-28 px-5 py-2'>Stop</button>
            </div>
          </div>
        </div>
        <CookingSteps />
      </div>
      </div>
      

    </>
  );
};


export default CookDish;