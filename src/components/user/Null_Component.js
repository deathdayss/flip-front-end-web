import React from 'react'

function Null_Component() {
    console.log('entered page holder for', this.props.txt)
    return (
        <div>
            this.props.txt
        </div>
    )
}

export default Null_Component
