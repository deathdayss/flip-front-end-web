import React, { useState, useCallback } from "react";
import './RadioButtons.scss'

const RadioButtons = ({
    keys,
    keyLabelMap,
    keyValuePairs,
    initialKey,
    checkedValue,
    onCheck,
    containerClass = 'radio-button-container',
    ordinaryClass = 'ordinary-radio-button',
    checkedClass = 'checked-radio-button',
    uncheckedClass = 'unchecked-radio-button' }) => {
    const [selectedKey, setSelectedKey] = useState(initialKey === undefined ? '' : initialKey);
    const trueSelectedValue = checkedValue === undefined ? selectedKey : checkedValue;

    const handleCheck = (key) => {
        if (onCheck) {
            onCheck(key);
        }
        if (checkedValue === undefined) {
            setSelectedKey(key)
        }
    }

    const keyLabelToButton = (key, label) => <div key={key}
        onClick={() => handleCheck(key)}
        className={`${ordinaryClass} ${key === trueSelectedValue ? checkedClass : uncheckedClass}`}>
        {label}
    </div>

    return <div className={containerClass}>
        {keyValuePairs ? keyValuePairs.map(pair => keyLabelToButton(pair.key, pair.value)) :
            keys.map(key => keyLabelToButton(key, keyLabelMap[key]))}
    </div>
}

export default RadioButtons;