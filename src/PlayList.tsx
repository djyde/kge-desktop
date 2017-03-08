import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

import { playerStore } from './Player'

export interface Song {
  avatar: string,
  ksong_mid: string,
  title: string,
  play_count: number,
  time: number,
  shareid: string
}

declare var global

const { getPlayList } = global.require('kge')

export class PlayListStore {
  @observable songs: Song[] = []
  @observable hasMore: boolean = false
  @observable currentShareUid?: string
  @observable currentPage: number = 1
  @observable isFetching = false

  @action fetchSongsFromSidebar = (share_uid: string) => {
    if (this.currentShareUid && (this.currentShareUid === share_uid)) {
      return
    }

    this.fetchSongs(share_uid, 1)
  }

  @action fetchNextPage = () => {
    if (this.currentShareUid) {
      const nextPageCount = this.currentPage + 1
      this.fetchSongs(this.currentShareUid, nextPageCount)
    }
  }

  @action fetchSongs = async (share_uid: string, page = this.currentPage, pageSize = 12) => {
    this.isFetching = true
    try {
      const data = (await getPlayList(share_uid, page, pageSize)).data.data
      this.currentShareUid = share_uid
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

const PlayItem = ({ song }: { song: Song }) => {

  const play = () => {
    playerStore.play(song)
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

  return (
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
  )
})

export default PlayList
