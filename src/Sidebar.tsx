import * as React from 'react'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { playListStore } from './PlayList'

const users: User[] = [
  {
    age: 2,
    follower: 99,
    head_img_url: 'http://shp.qlogo.cn/ttsing/118871758/118871758/100?ts=1462079745',
    level: 0,
    nickname: 'Randy',
    ugc_total_count: 75,
    kge_uid: '639c958d222c308e3c'
  }
]

export interface User {
  age: number,
  follower: number,
  head_img_url: string,
  level: number,
  nickname: string,
  kge_uid: string,
  ugc_total_count: number
}

export class SidebarStore {
  @observable users: User[] = []

  @action fetchUsers = () => {
    this.users = users
  }
}

export const sidebarStore = new SidebarStore()

const UserItem = ({ user }: { user: User }) => {

  const clickItem = () => {
    playListStore.fetchSongsFromSidebar(user.kge_uid)
  }

  return (
    <article onClick={clickItem} className='media'>
      <figure className='media-left'>
        <p className='image is-48x48'>
          <img src={user.head_img_url}></img>
        </p>
      </figure>
      <div className='media-content'>
        <div className='content'>
          <div>
            <strong>{user.nickname}</strong>
          </div>
          <div>
            <small>作品：{user.ugc_total_count}</small>
          </div>
        </div>
      </div>
    </article>
  )
}


const UserList = observer(({ users }: { users: User[] }) => {
  return (
    <div className='user-list' style={{ padding: '.5em' }}>
      {users.map(user => <UserItem key={user.kge_uid} user={user} />)}
    </div>
  )
})

const Sidebar = observer(() => {
  return (
    <div id='sidebar'>
      <UserList users={sidebarStore.users}/>
    </div>
  )
})


export default Sidebar
