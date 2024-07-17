"use client"
import React, { useEffect, useState } from 'react'
import dish from '@/public/dish'
import Image from 'next/image'
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export async function generateStaticParams(){}


const RecipePage = ({params}) => {

    const { id } = params

    const [toppings, setToppings] = useState([])
    const [recipeData, setRecipeData] = useState([])

    console.log(id);
    const handleToppingSelection = (selectedTopping) => () => {
        if (toppings.includes(selectedTopping)) {
            setToppings(toppings.filter((topping) => topping !== selectedTopping)); 
        }
        else {
            setToppings([...toppings, selectedTopping]); 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const formattedId = id.replace(/%20/g, ' ');
            const dishData = await dish.find((recipe) => recipe.dishName === formattedId);
            console.log(dishData);
            setRecipeData(dishData);
        }
        fetchData()
    }, [dish, id])

    const toppingData = ['Cheese', 'Tomatoes', 'Onions', 'Mushrooms', 'Peppers'];

    return (
        <>
     <Navbar/>
        <div className='flex justify-around my-10'>
            <div className=''>
                {recipeData && (
                    <div className='flex flex-col justify-around items-center rounded-lg shadow-md px-10 py-8 h-fit'>
                        <div className='rounded-lg shadow-lg '>
                        
                            <Image src={recipeData.image} alt={recipeData.dishName} width={400} height={300} className='rounded-lg' />
                        </div>

                        <div className=''>
                            <h1 className='font-bold text-3xl my-4'>{recipeData.dishName}</h1>
                            <h2 className='font-semibold text-2xl'>{recipeData.price}</h2>
                            <p className=''>{recipeData.description}</p>
                            <div className='flex gap-4'>
                                {
                                    recipeData.ingredients && recipeData.ingredients.map((ingredient, id) => (
                                        <div key={id} className="flex gap-4 shadow-md p-2 rounded-lg">
                                            <p key={id}>{ingredient}</p>
                                        </div>
                                    ))
                                }
                            </div>
                           
                        </div>
                    </div>
                )}
            </div>
         
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold my-4'> Choose your toppings</h1>

                    <div className='grid grid-cols-3 gap-5'>
                        {
                            toppingData && toppingData.map((topping, id) => (
                                <div
                                    key={id}
                                    onClick={handleToppingSelection(topping)}
                                    className={`flex justify-center items-center w-28 h-28 shadow-md p-2 rounded-lg border-2 cursor-pointer ${toppings.includes(topping) ? 'border-blue-400' : ''}`}
                                >
                                    <div key={id}>{topping}</div>
                                </div>
                            ))
                        }
                    </div>
                    <Link href={`/recipe/cook/${id}`} className='bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                               Start Cooking
                            </Link>
                </div>
                
                {/* <div>
                    {
                        toppings.length > 0 && (
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='text-3xl font-bold'>Selected Toppings</h1>
                                <div className='flex gap-4'>
                                    {
                                        toppings.map((topping, id) => (
                                            <div key={id} className="flex gap-4 shadow-md p-2 rounded-lg">
                                                <p key={id}>{topping}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div> */}
            

        </div>
        </>
    )
}

export default RecipePage
