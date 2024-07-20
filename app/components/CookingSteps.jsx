import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import io from 'socket.io-client';

const socket = io('ws://localhost:5000');

function CookingSteps() {
  const recipe_process_dict = {
    "Fried Rice": [
      'home-1',
      'P0',
      'PP25-10',
      'PS1-100',
      'm-10000-1|r-3-0-1|w-1|1-1-4-1|w-5|r-3-1-1|w-5|r-4-0-1|w-5|r-4-1-1|w-5|r-4-0-1|w-5|0-0-0-1|r-3-0-1|m-1500-1|r-0-0-1',
      'PL12-25',
      'm-10000-1|r-3-0-1|w-1|1-1-4-1|w-15|0-0-0-1|r-3-0-1|m-1500-1|r-0-0-1',
      'PP27-10',
      'PS5-100',
      'm-10000-1|r-4-0-1|w-1|1-1-4-1|w-15|0-0-0-1|r-3-0-1|m-1500-1|r-0-0-1',
      'PP29-10',
      'm-10000-1|w-5|r-4-0-1|w-1|1-1-4-1|w-6|0-0-0-1|r-3-0-1|home-1|r-0-0-1'
    ]
  };

  const [message, setMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const totalSteps = recipe_process_dict["Fried Rice"].length - 1;

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('message', (data) => {
      setMessage(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    socket.emit('currentStep', { step: recipe_process_dict["Fried Rice"][currentStep] });
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      socket.emit('currentStep', { step: recipe_process_dict["Fried Rice"][newStep] });

      if (recipe_process_dict["Fried Rice"][newStep].startsWith("m")) {
        console.log("starts with M ", recipe_process_dict["Fried Rice"][newStep].startsWith("m"), recipe_process_dict["Fried Rice"][newStep]);
        setIsPrevDisabled(true);
      } else {
        setIsPrevDisabled(false);
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center rounded-md shadow-md p-4 bg-white'>
      <h1 className='text-3xl font-bold'>Cooking Steps</h1>
      <p>{message}</p>
      <p>{recipe_process_dict["Fried Rice"][currentStep]}</p>
      <div>
        <Image width={700} height={700} src='/steps/cooking.jpg' alt='' className='rounded-md' />
      </div>
      {!isStarted ? (
        <button onClick={handleStart} className='py-2 px-3 text-white rounded-md bg-blue-500'>Start</button>
      ) : (
        <div className='flex justify-between px-5 pt-4 w-full'>
          <button onClick={handlePrev} className={`py-2 px-3 text-white rounded-md ${currentStep === 0 || isPrevDisabled ? "bg-gray-400" : "bg-blue-500"}`} disabled={currentStep === 0 || isPrevDisabled}>Prev</button>
          <button onClick={handleNext} className={`py-2 px-3 text-white rounded-md ${currentStep === totalSteps ? "bg-gray-400" : "bg-blue-500"}`} disabled={currentStep === totalSteps}>Next</button>
        </div>
      )}
    </div>
  );
}

export default CookingSteps;
