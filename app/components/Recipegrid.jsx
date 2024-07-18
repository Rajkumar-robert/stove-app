import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useEffect, useState } from 'react';

const Recipegrid = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/recipes');
                const data = await response.json();
                console.log(data);
                setRecipes(data);
            } catch (error) {
          
                console.error('Error fetching recipes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 px-10">
            {recipes &&recipes.map((item, index) => (
                <div className="rounded-lg shadow-lg" key={index}>
                    <div className="h-60">
                        <Image
                            src={item.image}
                            width={600}
                            height={600}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between items-center p-2">
                        <div className="">
                            <p className="text-ellipsis font-semibold w-48">{item.name}</p>
                            <p>{item.price}</p>
                        </div>

                        <Link
                            href={`/recipe/${item.name}`}
                            className="font-semibold text-sm bg-blue-500 text-white py-2 px-3 rounded-lg w-48 flex items-center justify-center"
                        >
                            <p>Order now</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Recipegrid;
