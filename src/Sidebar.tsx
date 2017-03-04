import * as React from 'react'

export interface User {
  age: number,
  follower: number,
  head_img_url: string,
  level: number,
  nickname: string,
  ugc_total_count: number
}

const UserItem = ({ user }: { user: User }) => {
  return (
    <article className='media'>
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

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className='user-list' style={{ padding: '.5em' }}>
      {users.map(user => <UserItem user={user} />)}
    </div>
  )
}

const users: User[] = [
  {
    age: 2,
    follower: 99,
    head_img_url: 'http://shp.qlogo.cn/ttsing/118871758/118871758/100?ts=1462079745',
    level: 0,
    nickname: 'Randy',
    ugc_total_count: 75
  }
]

const Sidebar = () => {
  return (
    <div id='sidebar'>
      <UserList users={users}/>
    </div>
  )
}


export default Sidebar
