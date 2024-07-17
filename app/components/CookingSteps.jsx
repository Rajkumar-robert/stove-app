import Image from 'next/image';
import React from 'react'

const CookingSteps = () => {
    const steps = [
        { image: '/cooking.jpg'},
        { image: '/cooking.jpg'},
        { image: '/cooking.jpg'},
        { image: '/cooking.jpg'},
        { image: '/cooking.jpg'},
        { image: '/cooking.jpg'},
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {steps.map((step, index) => (
                <div key={index} className="p-2 shadow-md rounded-lg">
                    <Image width={300} height={300} src={step.image} alt={`Step ${step.count}`} className='rounded-md' />
                    <p>Step {index +1}</p>
                </div>
            ))}
        </div>
    );
}

export default CookingSteps;
