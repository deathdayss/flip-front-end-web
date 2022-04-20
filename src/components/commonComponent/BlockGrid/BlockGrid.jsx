import React from "react";

const BlockGrid = ({ colNum, data, dataToItem, itemClass, rowClass, gridClass, idProperty }) => {
    if (!data || data.length === 0) {
        return null;
    }
    let rowArray = []
    let gridArray = []
    let nextRowKey = idProperty ? data[0].GID : 0
    for (let i = 0; i < data.length; ++i) {
        rowArray.push(
            <div key={idProperty ? data[i][idProperty] : i} className={itemClass}>
                {dataToItem(data[i])}
            </div>)
        if (rowArray.length === colNum) {
            gridArray.push(
                <div key={nextRowKey} className={rowClass}>
                    {rowArray}
                </div>
            )
            rowArray = []
            if (i + 1 < data.length) {
                nextRowKey = idProperty ? data[i + 1][idProperty] : i + 1
            }
        }
    }
    if (rowArray.length > 0 && rowArray.length < colNum) {
        for (let i = rowArray.length; i < colNum; ++i) {
            rowArray.push(
                <div key={i} className={itemClass}></div>
            )
        }
        gridArray.push(
            <div key={nextRowKey} className={rowClass}>
                {rowArray}
            </div>
        )
    }
    return <div className={gridClass}>
        {gridArray}
    </div>
}

export default BlockGrid;