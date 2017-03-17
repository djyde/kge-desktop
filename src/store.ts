import * as PouchDB from 'pouchdb'

const db = new PouchDB('followings')

import { User } from './Sidebar'

export const getFollowings = async () => {
  return (await db.allDocs({ include_docs: true })).rows.map(row => row.doc)
}

export const addFollowing = (user: User) => {
  return db.put({
    _id: user.kge_uid,
    ...user
  })
}

export const removeFollowing = (shareUid: User) => {
  console.log(shareUid)
  return db.remove(shareUid)
}