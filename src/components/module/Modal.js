import React from 'react'

const Modal = props => {
    const {
        id,
        setRemove,
        removePost,
        remObj,
        modalTitle,
        modalDesc,
        primBtn,
        secBtn = 'Cancel',
        icon,
    } = props

    return (
        <div className='modal'>
            <div className='modal-overlay' onClick={() => setRemove(remObj)}/>
            <div className='modal-container'>
                <img src={icon} alt={icon} />
                <h2>{modalTitle}</h2>
                <p>{modalDesc}</p>

                <div className='btn-grp'>
                    <button className='__remove' onClick={() => removePost(id)}>{primBtn}</button>
                    <button className='__cancel' onClick={() => setRemove(remObj)}>{secBtn}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal