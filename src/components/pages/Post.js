import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { urls } from '../../utils/urls'
import { isNull } from '../../utils/func'
import BlogItem from '../module/BlogItem'
import Modal from '../module/Modal'

const view = (path, data) => {
    const arr = isNull(data) ? data : []

    const trimTitle = path.replace('/post/','')
    const id = arr.filter(x => x.title === trimTitle)

    return id
}

const Post = props => {
    const data = JSON.parse(localStorage.getItem('obj'))
    const loc = props.location

    const actionType = loc.action
    const path = loc.pathname
    
    const d = view(path, data)
    
    const init = { id: null, title: '', content: '' }
    const initCheck = { title: false, content: false }
    const remObj = { id: '', isRemove: false }

    const [ post, setPost ] = useState(actionType === 'add' ? init : d)
    const [ redirect, setRedirect ] = useState(false)
    const [ check, setCheck ] = useState(initCheck)
    const [ remove, setRemove ] = useState(remObj)

    const p = isNull(post) ? post : []
    const ep = !p.length < 1 ? post[0] : ''

    const handleInputChange = e => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
    }
    const handleOnFocus = e => {
        setCheck({...check, [e.target.name]: false})
    }
    
    const willRemovePost = t => {
        setRemove({id: t, isRemove: true})
    }
    const removePost = t => {
        const objRemove = data.filter(x => x.title !== t)
        setPost(objRemove)
        localStorage.setItem('obj', JSON.stringify(objRemove))
        setRemove(remObj)
        
        setRedirect(true)
    }

    if (redirect) return <Redirect to={urls.index} />

    return (
        <>
        {actionType === 'add' &&
            <form
                onSubmit={e => {
                    e.preventDefault()
                    setCheck({title: !post.title, content: !post.content})

                    if (!post.title || !post.content) return
                    
                    const arr = isNull(data) ? data : []

                    const num = localStorage.getItem('id')
                    const n = isNull(num) ? parseInt(num) + 1 : 1

                    const addObj = arr.concat({...post, id: n})
                    localStorage.setItem('obj', JSON.stringify(addObj))
                    localStorage.setItem('id', n)

                    setPost(init)
                    setRedirect(true)
                }}
            >
                <BlogItem
                    view={false}
                    tVal={p.title}
                    cVal={p.content}
                    tCheck={check.title}
                    cCheck={check.content}
                    actionType={actionType}
                    handleInputChange={handleInputChange}
                    handleOnFocus={handleOnFocus}
                    setRedirect={setRedirect}
                    primBtn='Publish'
                />
            </form>
        }
        {actionType === 'edit' &&
            <form
                onSubmit={e => {
                    e.preventDefault()
                    const title = post.title !== undefined
                    const content = post.content !== undefined

                    setCheck({title: post.title === '', content: post.content === ''})

                    if (post.title === '' || post.content === '') return

                    const arr = isNull(data) ? data : []

                    const newUpdate = {
                        title: title ? post.title : d[0].title,
                        content: content ? post.content : d[0].content
                    }

                    const removeOldPost = arr.filter(x => x.title !== d[0].title)
                    const updatePost = removeOldPost.concat({id: parseInt(post[0].id), ...newUpdate})

                    localStorage.setItem('obj', JSON.stringify(updatePost))

                    setRedirect(true)
                }}
            >
                <BlogItem
                    view={false}
                    tVal={ep.title}
                    cVal={ep.content}
                    tCheck={check.title}
                    cCheck={check.content}
                    actionType={actionType}
                    handleInputChange={handleInputChange}
                    handleOnFocus={handleOnFocus}
                    setRedirect={setRedirect}
                    primBtn='Update'
                />
            </form>
        }
        {actionType === 'openpost' &&
            p.map((x,idx) =>
                <BlogItem
                    {...x}
                    key={idx}
                    willRemovePost={willRemovePost}
                />
            )
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

export default Post