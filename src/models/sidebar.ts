import { getFollowings } from "../store";

const sidebarModel = {
  namespace: 'sidebar',
  state: {
    users: [] as Kge.User[],
    currentUser: undefined as Kge.User | undefined
  },
  actions: {
    fetchUsers: async function () {
      try {
        const followings = await getFollowings()
        this.users = followings
      } catch (e) {
        console.error(e)
      } finally {

      }
    },
    selectItem(user: Kge.User) {
      this.currentUser = user
    }
  }
}

export default sidebarModel
