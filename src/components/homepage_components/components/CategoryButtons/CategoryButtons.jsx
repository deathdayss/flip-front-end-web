import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMultiZoneService } from '../../../../service/displayBoard'
import './CategoryButtons.scss'

const categoryLabels = [
    {
        key: "rpg",
        label: "RPG"
    }
    , {
        key: "action",
        label: "Action"
    },
    {
        key: "threeDimension",
        label: "3D"
    }]

const CategoryButtons = (props) => {

    const getMultiZone = async (key) => {
        const result = await getMultiZoneService({
            zone: key,
            num: 5,
        });
        console.log(result.List)
        // setCarouselList(result.List)
        // setDownloadList(result.List)
    }

    const Buttons = categoryLabels.map(({ key, label }) => <Link to={`/category?category=${key}`}>
        <button key={key} id='' className='category-btn'
        >
            {label}
        </button>
    </Link>)

    return (<div className="category-wrapper">
        {Buttons.map((button, index) =>
            <div key={index} className="category-btn-wrapper">
                {button}
            </div>)}
    </div>)
}

export default CategoryButtons