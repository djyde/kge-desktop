import * as React from 'react'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { playListStore } from './PlayList'
import AddFollowingModal, { addFollowingModalStore } from './components/AddFollowingModal'
import { getFollowings } from './store'

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

  @action fetchUsers = async () => {
    try {
      const followings = await getFollowings()
      console.log(followings)
      this.users = followings
    } catch (e) {
      console.error(e)
    } finally {

    }
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
        <AddFollowingModal />
        <h3>following <span className='add-following-btn' onClick={addFollowingModalStore.show}>add</span></h3>
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
