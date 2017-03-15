import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

declare var global

const { getUserInfo } = global.require('kge')
import { User, sidebarStore } from '../Sidebar'
import { addFollowing } from '../store'

export class AddFollowingModalStore {
  @observable visible = false
  @observable isFetching = false
  @observable shareUid = ''

  @action show = () => {
    this.visible = true
  }

  @action hide = () => {
    this.visible = false
  }

  @action getUserInfo = async () => {
    if (this.shareUid) {
      this.isFetching = true
      try {
        const user = await getUserInfo(this.shareUid) as User
        await addFollowing(user)
        sidebarStore.fetchUsers()
        this.hide()
      } catch (e) {
        console.error(e)
      } finally {
        this.isFetching = false
      }
    }
  }

  @action onChangeShareUidInput = e => {
    this.shareUid = e.target.value
  }
}

export const addFollowingModalStore = new AddFollowingModalStore()

const AddFowllowingModal = observer(() => {
  return (
    <div className={classnames('modal', { 'is-active': addFollowingModalStore.visible })}>
      <div className="modal-background"></div>
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <p className="control has-addons" style={{ justifyContent: 'center' }}>
          <input className="input" type="text" placeholder="Search by share_uid" value={addFollowingModalStore.shareUid} onChange={addFollowingModalStore.onChangeShareUidInput} />
          <a className={classnames('button is-primary', { 'is-loading': addFollowingModalStore.isFetching })} onClick={addFollowingModalStore.getUserInfo}>Search</a>
        </p>
      </div>
      <button className="modal-close" onClick={addFollowingModalStore.hide}></button>
    </div>
  )
})

export default AddFowllowingModal
