import * as React from 'react'
import * as classnames from 'classnames'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'

import { playListStore } from './PlayList'
import AddFollowingModal, { addFollowingModalStore } from './components/AddFollowingModal'
import { getFollowings, removeFollowing } from './store'


export class SidebarStore {
  @observable users: Kge.User[] = []
  @observable currentUser?: Kge.User

  @action fetchUsers = async () => {
    try {
      const followings = await getFollowings()
      this.users = followings
    } catch (e) {
      console.error(e)
    } finally {

    }
  }

  @action selectItem = (user: Kge.User) => {
    this.currentUser = user
  }
}

export const sidebarStore = new SidebarStore()

const UserItem = observer(({ user }: { user: Kge.User }) => {

  const clickItem = () => {
    playListStore.fetchSongsFromSidebar(user)
    sidebarStore.selectItem(user)
  }

  const doubleClickItem = async () => {
    await removeFollowing(toJS(user))
    await sidebarStore.fetchUsers()
  }

  return (
    <li onClick={clickItem} onDoubleClick={doubleClickItem} className={classnames('sidebar-item', {'current-user': sidebarStore.currentUser && sidebarStore.currentUser.kge_uid === user.kge_uid})} >
      {user.nickname}
    </li>
  )
})

const UserList = observer(({ users }: { users: Kge.User[] }) => {
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
