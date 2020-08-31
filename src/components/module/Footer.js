import React from 'react'

const Footer = () => {
    const getDate = new Date()
    const yearNow = getDate.getFullYear()

    return (
        <footer>
            <label>&copy;{yearNow} <a href='https://josephlonzamia.com/'>josephlonzamia</a></label>
        </footer>
    )
}

export default Footer