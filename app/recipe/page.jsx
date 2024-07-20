"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { useSearchParams } from 'next/navigation';

const RecipePage = ({searchParams}) => {
    const { id } = searchParams;
    const [toppings, setToppings] = useState([]);
    const [recipeData, setRecipeData] = useState(null);

    // const handleToppingSelection = (selectedTopping) => () => {
    //     if (toppings.includes(selectedTopping)) {
    //         setToppings(toppings.filter((topping) => topping !== selectedTopping));
    //     } else {
    //         setToppings([...toppings, selectedTopping]);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedId = id.replace(/%20/g, ' ');
                
                    const response = await fetch(`http://127.0.0.1:5000/recipes/${formattedId}`);
                    const dishData = await response.json();
                setRecipeData(dishData);
            } catch (error) {
                console.error('Error fetching recipe data:', error);
            }
        };
        fetchData();
    }, [id]);

    const toppingData = ['Cheese', 'Tomatoes', 'Onions', 'Mushrooms', 'Peppers'];

    return (
        <>
            <Navbar />
            <div className='bg-banana w-full h-full'>
                <div className='bg-[#ffffffcc] flex justify-around'>
                    <div className='my-8 bg-white rounded-lg'>
                        {recipeData && (
                            <div className='flex flex-col justify-around items-center rounded-lg shadow-md px-10 py-8 h-fit'>
                                <div className='rounded-lg shadow-lg'>
                                    <Image src={recipeData.image} alt={recipeData.name} width={400} height={300} className='rounded-lg' />
                                </div>
                                <div className=''>
                                    <h1 className='font-bold text-3xl my-4'>{recipeData.name}</h1>
                                    <h2 className='font-semibold text-2xl'>{recipeData.price}</h2>
                                    <p className=''>{recipeData.description}</p>
                                    <div className='flex gap-4'>
                                        {recipeData.ingredients && recipeData.ingredients.map((ingredient, id) => (
                                            <div key={id} className="flex gap-4 shadow-md p-2 rounded-lg">
                                                <p>{ingredient}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Link href={{
                                    pathname:'recipe/cook',
                                    query:{
                                        recipe: recipeData.name,
                                        id: recipeData.id,
                                    }
                                }} className='bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Start Cooking
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecipePage;
