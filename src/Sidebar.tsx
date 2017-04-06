import * as React from 'react'
import * as classnames from 'classnames'
import { toJS } from 'mobx'
import { inject } from 'cans'

import AddFollowingModal, { addFollowingModalStore } from './components/AddFollowingModal'
import { getFollowings, removeFollowing } from './store'

const UserItem = inject(({ models, user }: { models: any, user: Kge.User }) => {

  const clickItem = () => {
    models.playlist.fetchSongsFromSidebar(user)
    models.sidebar.selectItem(user)
  }

  const doubleClickItem = async () => {
    await removeFollowing(toJS(user))
    await models.sidebarStore.fetchUsers()
  }

  return (
    <li onClick={clickItem} onDoubleClick={doubleClickItem} className={classnames('sidebar-item', {'current-user': models.sidebar.currentUser && models.sidebar.currentUser.kge_uid === user.kge_uid})} >
      {user.nickname}
    </li>
  )
})

const UserList = inject(({ models, users }: { models: any, users: Kge.User[] }) => {
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

const Sidebar = inject(({ models }) => {
  return (
    <div id='sidebar'>
      <UserList users={models.sidebar.users}/>
    </div>
  )
})


export default Sidebar
