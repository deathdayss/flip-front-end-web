import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMultiZoneService } from '../../../../service/displayBoard'
import './CategoryButtons.scss'

const categoryLabels = [
    {
        key: "rpg",
        label: "Rpg"
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
    const [category, setCategory] = useState('rpg')
    const { history } = props

    const changeCategory = (key) => {
        setCategory(key)
        // getMultiZone(key)
        history.push('./category')
    }

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
            onClick={() => changeCategory(key)} style={{ backgroundColor: (category == key) ? '#DACEFF' : 'rgba(0, 0, 0, 0.05)' }}>
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