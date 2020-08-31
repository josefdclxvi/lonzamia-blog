import React from 'react'
import { Link } from 'react-router-dom'
import InputWrapper from './InputWrapper'

const BlogItem = props => {
    const {
        actionType,
        title,
        content,
        willRemovePost,
        setRedirect,
        preview = false,
        view = true,
        tVal,
        cVal,
        tCheck,
        cCheck,
        handleInputChange,
        handleOnFocus,
        primBtn,
        secBtn = 'Cancel',
    } = props

    return (
        <section className={`blog-item ${preview ? 'preview': 'view'}`}>
            {view &&
                <div className='__grp-btn'>
                    <Link to={{pathname: `/post/${title}`, action: 'edit'}} className='__edit'>Edit</Link>
                    <button className='__delete'
                        onClick={() => willRemovePost(title)}
                    >Delete</button>
                </div>
            }
            <figure>
                <img src='/img/josef.jpg' alt='josef.jpg' />
            </figure>
            
            <div className='content-wrapper'>
            {view ?
                <header title={title}><Link to={{pathname: `/post/${title}`, action: 'openpost'}}>{title}</Link></header> :
                <InputWrapper
                    label='Title'
                    type='text'
                    required={true}
                    warningMsg='Title is required'
                    warning={tCheck}
                    name='title'
                    value={tVal}
                    onChange={handleInputChange}
                    onFocus={handleOnFocus}
                    placeholder='Type your title here ..'
                />
            }
            {view ?
                <article dangerouslySetInnerHTML={{__html: content}} /> :
                <InputWrapper                    
                    textarea={true}
                    label='Content'
                    required={true}
                    warningMsg='Content is required'
                    warning={cCheck}
                    name='content'
                    value={cVal}
                    onChange={handleInputChange}
                    onFocus={handleOnFocus}
                    placeholder='Type your title here ..'
                    rows={5}
                />
            }
            {!view &&
                <div className='btn-grp'>
                    <button className={actionType === 'add' ? '__add' : '__update'} >{primBtn}</button>
                    <button className='__cancel' onClick={() => setRedirect(true)}>{secBtn}</button>
                </div>
            }
            {preview &&
                <div>
                    <Link to={{pathname: `/post/${title}`, action: 'openpost'}}>Read More</Link>
                </div>
            }
            </div>
        </section>
    )
}

export default BlogItem