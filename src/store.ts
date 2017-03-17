import * as PouchDB from 'pouchdb'

const db = new PouchDB('followings')

export const getFollowings = async () => {
  return (await db.allDocs({ include_docs: true, descending: 'createdAt' })).rows.map(row => row.doc)
}

export const addFollowing = (user: Kge.User) => {
  return db.put({
    createdAt: Date.now(),
    _id: user.kge_uid,
    ...user
  })
}

export const removeFollowing = (shareUid: Kge.User) => {
  return db.remove(shareUid)
}