import React from 'react'

function Card({children, name, age, dept, city }) {
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
        <div className="text-center p-6 font-medium bg-[#007fffcc] rounded-2xl text-white shadow-md shadow-blue-500/50 w-120 h-50">
            <div className="upper flex flex-row">
                <div className="profile-image bg-white rounded-2xl w-18 h-18 flex flex-col item-center justify-center">
                    <p className='text-[#007fff] font-black text-2xl'>{initials}</p>
                </div>
                <div className="info px-4 text-left">
                    <h3 className='font-black text-xl'>{capName}</h3>
                    <p>{dept}</p>
                </div>
            </div>
            <hr className="my-4" />
            <div className="lower flex flex-col">
                <div className="detail flex justify-between">
                    <div className="title text-left pl-4">
                        <p>Age:</p>
                    </div>
                    <div className="value text-right pr-4">
                        <p>{age}</p>
                    </div>
                </div>
                <div className="detail flex justify-between">
                    <div className="title text-left pl-4">
                        <p>City:</p>
                    </div>
                    <div className="value text-right pr-4">
                        <p>{city}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card