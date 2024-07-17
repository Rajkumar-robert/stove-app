import React, { useState } from 'react';

const Filter = () => {
    const cuisines = ['Italian', 'Mexican', 'Chinese', 'Indian'];
    const ingredients = ['Tomatoes', 'Cheese', 'Rice', 'Chicken'];
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');

    const handleCuisineChange = (event) => {
        setSelectedCuisine(event.target.value);
    };

    const handleIngredientChange = (event) => {
        setSelectedIngredient(event.target.value);
    };

    return (
        <div className="p-4 flex items-center gap-10">
            <div className="w-fit">
                {/* <label className="block mb-2 text-gray-700 font-bold" htmlFor="cuisine-select">
                    Select Cuisine
                </label> */}
                <select
                    id="cuisine-select"
                    value={selectedCuisine}
                    onChange={handleCuisineChange}
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Cuisine</option>
                    {cuisines.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>
                {/* {selectedCuisine && <div className="mt-2 text-blue-600">Selected Cuisine: {selectedCuisine}</div>} */}
            </div>

            <div>
                {/* <label className="block mb-2 text-gray-700 font-bold" htmlFor="ingredient-select">
                    Select Ingredient
                </label> */}
                <select
                    id="ingredient-select"
                    value={selectedIngredient}
                    onChange={handleIngredientChange}
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Select Ingredient</option>
                    {ingredients.map((ingredient) => (
                        <option key={ingredient} value={ingredient}>
                            {ingredient}
                        </option>
                    ))}
                </select>
                {/* {selectedIngredient && <div className="mt-2 text-blue-600">Selected Ingredient: {selectedIngredient}</div>} */}
            </div>
        </div>
    );
};

export default Filter;
