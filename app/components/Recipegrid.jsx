import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import dish from '@/public/dish';

const Recipegrid = () => {

  

    return (
        <div className="grid grid-cols-4 gap-4 mt-10 px-10">
            {dish.map((item, index) => (
                <div className="rounded-lg shadow-lg" key={index}>
                    <div className='h-60 '>
                   
                        <Image src={item.image} width={600} height={600} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className='flex justify-between items-center p-2'>
                        <div className=''>
                            <p className='text-ellipsis font-semibold w-48'>{item.dishName}</p>
                            <p>{item.price}</p>
                        </div>
                        <div>
                            <Link href={`/recipe/${item.dishName}`} className='font-semibold text-sm bg-blue-500 text-white py-2 px-3 rounded-lg'>Order Now</Link>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Recipegrid;
