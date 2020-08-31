import React from 'react'

const InputWrapper = props => {
    const {
        textarea,
        label,
        type,
        required,
        warning,
        warningMsg,
        className='',
        inputClassName='',
        name,
        value,
        onChange,
        onFocus,
        placeholder,
        rows,
    } = props

    const warn = warning ? '__warning' : ''

    return (
        <div className={`input-wrapper ${className}`}>
            <label>
                {label}
                {required && <span className='__required'> *</span>}
            </label>
            {textarea ?
                <textarea
                    className={`${inputClassName} ${warn}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    rows={rows}
                /> :
                <input
                    type={type}
                    className={`${inputClassName} ${warn}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder={placeholder}
                />
            }
            {warning &&
                <div className={`${warn} __warning-sign`}>
                    <span>{warningMsg}</span>
                </div>
            }
        </div>
    )
}

export default InputWrapper