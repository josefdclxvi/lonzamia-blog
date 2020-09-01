import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
    getPageCount,
    isNull,
} from '../../utils/func'
import BlogItem from '../module/BlogItem'
import Modal from '../module/Modal'

const Home = () => {
    const data = JSON.parse(localStorage.getItem('obj'))

    const initPage = {
        itemCount: 10,
        startPage: 1,
        currentPage: null,
        pageCount: null
    }
    const remObj = { id: '', isRemove: false }
    const [ post, setPost ] = useState(data)
    const [ pagination, setPagination ] = useState(initPage)
    const [ sort, setSort ] = useState(0)
    const [ sortNameActive, setSortNameActive ] = useState(false)
    const [ sortDateActive, setSortDateActive ] = useState(false)
    const [ remove, setRemove ] = useState(remObj)
    const [ searchResMsg, setSearchResMsg ] = useState(false)

    useEffect(() => {
        const currentPage = 1
        const pageCount = getPageCount(data, initPage.itemCount)
        
        setPagination({
            ...initPage,
            currentPage: currentPage,
            pageCount: pageCount
        })
        // eslint-disable-next-line
    }, [])

    const searchPost = e => {
        const v = e.target.value.toLowerCase()
        const matches = data.filter(x => x.title.toLowerCase().includes(v))
        const res = v !== '' ? matches : data
        const resPageCount = getPageCount(matches, initPage.itemCount)

        setPost(res)
        setPagination({...pagination, pageCount: resPageCount})
        setSearchResMsg(matches.length < 1)
    }
    
    const willRemovePost = t => setRemove({id: t, isRemove: true})
    
    const removePost = t => {
        const objRemove = post.filter(x => x.title !== t)
        localStorage.setItem('obj', JSON.stringify(objRemove))
        const resPageCount = getPageCount(objRemove, initPage.itemCount)
        
        setPost(objRemove)
        setPagination({...pagination, pageCount: resPageCount})
        setRemove(remObj)
    }

    const sortName = x => {
        const s = !x ? 3 : 2
        setSort(s)
        setSortNameActive(!x)
    }

    const sortDate = x => {
        const s = !x ? 1 : 0
        setSort(s)
        setSortDateActive(!x)
    }
    
    const createPageNavigation = () => {
        let pageNav = []
        const curPage = pagination.currentPage
        if(pagination.pageCount > 0) {
            for (let x = 1; x <= pagination.pageCount; x++) {
                const activeClass = x === curPage ? 'active' : ''
                pageNav.push(
                    <button key={x}
                        className={activeClass}
                        onClick={() => setPagination({...pagination, currentPage: x})}
                    >{x}</button>
                )
            }
        }
        return pageNav
    }

    const maxPageItem = pagination.currentPage * initPage.itemCount
    const minPageItem = maxPageItem - pagination.itemCount

    return (
        <>
            <div className='__option'>
                <div className='search-container'>
                    <input type='text' name='search' placeholder='Search blog post ...'
                        onKeyUp={e => searchPost(e)}
                    />
                    <figure>
                        <img src='/img/search.png' alt='/img/search.png' />
                    </figure>
                </div>
                <div className='kemerot'>
                    <Link
                        to={{pathname: `/post/create-new-post`, action: 'add'}}
                        className='__add-post'
                    >New Post</Link>
                    <div className='btn-grp'>
                        <label>Sort :</label>
                        <button className='__sort-name'
                            onClick={() => sortName(sortNameActive)}
                        >
                            Name
                            <div className={`__caret ${
                                sortNameActive ? '_carret-toggle' : ''
                            }`} />
                        </button>
                        <button className='__sort-date'
                            onClick={() => sortDate(sortDateActive)}
                        >
                            Date
                            <div className={`__caret ${
                                sortDateActive ? '_carret-toggle' : ''
                            }`} />
                        </button>
                    </div>
                </div>
            </div>
            {!searchResMsg &&
                <div className='page-nav'>
                    {createPageNavigation()}
                </div>
            }
            <div className='blog-container'>
                {searchResMsg ?
                    <div className='__message-block'>
                        <header><strong>No results found</strong></header>
                        <p>
                            please dont give up, try it again or
                            <Link to={{pathname: `/post/create-new-post`, action: 'add'}}> create new post</Link>
                        </p>
                    </div> :
                    data < 1  &&
                    <div className='__message-block'>
                        <header><strong>Your blog is empty</strong></header>
                        <p>
                            Start your first post now, create
                            <Link to={{pathname: `/post/create-new-post`, action: 'add'}}> here </Link>
                        </p>
                    </div>
                }
                {isNull(post) &&
                    post
                    .sort((x, y) => {
                        const r = sort === 0 ? y.id - x.id : (
                            sort === 1 ? x.id - y.id : (
                            sort === 2 ? y.title.localeCompare(x.title) : (
                            sort === 3 ? x.title.localeCompare(y.title) : y.id - x.id
                        )))

                        return r
                    })
                    .slice(minPageItem, maxPageItem)
                    .map((x, idx) =>
                        <BlogItem key={idx} {...x} willRemovePost={willRemovePost} preview={true} />
                    )
                }
            </div>
            {!searchResMsg &&
                <div className='page-nav'>
                    {createPageNavigation()}
                </div>
            }
            {remove.isRemove &&
                <Modal
                    id={remove.id}
                    setRemove={setRemove}
                    removePost={removePost}
                    remObj={remObj}
                    modalTitle='Remove Post'
                    modalDesc='Are you sure, you want to remove this post?'
                    primBtn='Remove'
                    icon='/img/warning.png'
                />
            }
        </>
    )
}


export default Home