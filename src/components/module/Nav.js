import React from 'react'
import { Link } from 'react-router-dom'
import { urls } from '../../utils/urls'

const Nav = () => {
    return (
        <nav>
            <Link to={urls.index}><h1>Blog</h1></Link>
        </nav>
    )
}
export default Nav