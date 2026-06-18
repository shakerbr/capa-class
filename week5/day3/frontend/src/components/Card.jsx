import React from 'react'

function Card({children, name, age, department, city }) {
    const initials = name 
        .split(" ") 
        .map((n) => n[0]) 
        .join("") 
        .slice(0, 2) 
        .toUpperCase()
    ;

    const capName = name
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    ;

    return (
        <div className="font-medium text-white min-w-90 min-h-50 p-6 rounded-2xl bg-[#007fffcc] shadow-md shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-row">
                <div className="flex flex-col justify-center w-18 h-18 bg-white rounded-2xl">
                    <p className='text-center text-[#007fff] font-black text-2xl'>{initials}</p>
                </div>
                <div className="flex flex-col mx-4">
                    <h3 className='font-black text-xl'>{capName}</h3>
                    <p>{department}</p>
                </div>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col">
                <div className="flex justify-between">
                    <p className="text-left ml-4">Age:</p>
                    <p className="font-bold mr-4">{age}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-left ml-4">City:</p>
                    <p className="font-bold mr-4">{city}</p>
                </div>
            </div>
        </div>
    )
}

export default Card