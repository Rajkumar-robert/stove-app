import Image from 'next/image';
import React, { useEffect } from 'react';
import axios from 'axios';

const CookingSteps = () => {
    const steps = [
        { image: '/steps/cooking.jpg', description: 'Step 1' },
        { image: '/steps/cooking.jpg', description: 'Step 2' },
        { image: '/steps/cooking.jpg', description: 'Step 3' },
        { image: '/steps/cooking.jpg', description: 'Step 4' },
        { image: '/steps/cooking.jpg', description: 'Step 5' },
        { image: '/steps/cooking.jpg', description: 'Step 6' },
    ];

    const [currentStep, setCurrentStep] = React.useState(0);
    const totalSteps = steps.length - 1;


    const handlePrev = () => { 
        if (currentStep > 0) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            sendCurrentStep(newStep);
        }
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            sendCurrentStep(newStep);
        }
    };

    const sendCurrentStep = async (step) => {
        try {
            await fetch(`http://127.0.0.1:5000/recipes/next_step/${step}`);
            console.log(`Step ${step} sent to server`);
        } catch (error) {
            console.error('Error sending current step:', error);
        }
    };

    useEffect(() => {
        sendCurrentStep(currentStep);
    });

    return (
        <div className='flex flex-col justify-center items-center rounded-md shadow-md p-4 bg-white'>
            <h1 className='text-3xl font-bold'>Cooking Steps</h1>
            <p>{steps[currentStep].description}</p>
            <div>
                <Image width={700} height={700} src={steps[currentStep].image} alt={`Step ${steps[currentStep].description}`} className='rounded-md' />
            </div>
            <div className='flex justify-between px-5 pt-4 w-full'>
                <button onClick={handlePrev} className={`py-2 px-3 text-white rounded-md ${currentStep === 0 ? "bg-gray-400" : "bg-blue-500"}`}>Prev</button>
                <button onClick={handleNext} className={`py-2 px-3 text-white rounded-md ${currentStep === totalSteps ? "bg-gray-400" : "bg-blue-500"}`}>Next</button>
            </div>
        </div>
    );
};

export default CookingSteps;
