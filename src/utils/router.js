import { urls } from './urls'

import DefaultPage from '../components/pages/Home'
import Post from '../components/pages/Post'

export const routerList = [
    { path: urls.index, component: DefaultPage,},
    { path: urls.post, component: Post,},
]
