import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

import { playerStore } from './Player'

const { getPlayList, getUserInfo } = global.require('kge')

export class PlayListStore {
  @observable songs: Kge.Song[] = []
  @observable hasMore: boolean = false
  @observable currentShareUid?: string
  @observable currentPage: number = 1
  @observable currentUser?: Kge.User
  @observable isFetching = false
  @observable currentSongIndex?: number

  @action fetchSongsFromSidebar = (user: Kge.User) => {
    if (this.currentUser && (this.currentUser.kge_uid === user.kge_uid)) {
      return
    }
    this.clear()
    this.fetchSongs(user, 1)
  }

  @action clear = () => {
    this.songs = []
    this.currentPage = 1
  }

  @action play = async (song?: Kge.Song) => {
    if (song) {
      await playerStore.play(song)
      this.currentSongIndex = this.songs.indexOf(song)
    }
  }

  @action playPrev = () => {
    if ((this.currentSongIndex) && (this.currentSongIndex - 1 > 0)) {
      this.play(this.songs[this.currentSongIndex - 1])
    }
  }

  @action playNext = () => {
    if ((this.currentSongIndex !== undefined) && (this.currentSongIndex + 1) < this.songs.length) {
      this.play(this.songs[this.currentSongIndex + 1])
    }
  }

  @action fetchNextPage = () => {
    if (this.currentUser) {
      const nextPageCount = this.currentPage + 1
      this.fetchSongs(this.currentUser, nextPageCount)
    }
  }

  @action fetchSongs = async (user: Kge.User, page = this.currentPage, pageSize = 12) => {
    this.isFetching = true
    try {
      const data = (await getPlayList(user.kge_uid, page, pageSize)).data.data
      this.currentUser = user
      this.hasMore = data.has_more === 1
      const playList = data.ugclist
      this.songs = this.songs.concat(playList)
      this.currentPage++
    } catch (e) {
      console.error(e)
    } finally {
      this.isFetching = false
    }
    
  }
}

export const playListStore = new PlayListStore()

const PlayItem = ({ song }: { song: Kge.Song }) => {

  const play = () => {
    playListStore.play(song)
  }

  return (
    <div>
      <div onDoubleClick={play} className='cover'>
        <img src={song.avatar} alt=""/>
      </div>
      <div className='info'>
        <h1 className='song-title'>{song.title}</h1>
      </div>
    </div>
  )
}

const PlayList = observer(() => {

  if (!playListStore.currentUser) {
    return (
      <div style={{ flex: 12, overflow: 'scroll' }}>
        <div className='columns'>
          <div className='column'>
            
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flex: 12, overflow: 'scroll' }}>
      <div id='profile' style={{ padding: '1em 1em 0 1em' }}>
        <article className='media'>
          <figure className='media-left'>
            <p className='image is-96x96' style={{ padding: '.5em', paddingTop: '0' }}>
              <img style={{ borderRadius: '100%' }} src={playListStore.currentUser.head_img_url} alt=""/>
            </p>
          </figure>
          <div className='media-content'>
            <div className='content'>
              <h1 style={{ color: '#fff', marginBottom: '.2em', fontSize: '2.5em' }}>{playListStore.currentUser.nickname}</h1>
              <p>粉丝：{playListStore.currentUser.follower} 作品：{playListStore.currentUser.ugc_total_count}</p>
            </div>
          </div>
        </article>
      </div>
      <div id='playlist'>
        {playListStore.songs.map((song, i) => (
          <div className='playlist-item' key={i}>
            <PlayItem song={song} />
          </div>
        ))}
        <div style={{ textAlign: 'center' }}>
          {playListStore.hasMore ? <button className={classnames('button is-black is-small', { 'is-loading': playListStore.isFetching })} onClick={playListStore.fetchNextPage}>加载更多</button> : <span>没有更多</span>}
        </div>
      </div>
    </div>
  )
})

export default PlayList
