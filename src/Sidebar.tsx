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
    <li onClick={clickItem} className='sidebar-item' >
      {user.nickname}
    </li>
  )
}

const UserList = observer(({ users }: { users: User[] }) => {
  return (
    <div>
      <section id='following-section'>
        <h3>following</h3>
        <ul>
          {users.map(user => <UserItem key={user.kge_uid} user={user} />)}
        </ul>
      </section>
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
