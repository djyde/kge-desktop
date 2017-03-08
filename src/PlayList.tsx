import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

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
  @observable currentShareUid?

  @action fetchSongsFromSidebar = (share_uid) => {
    if (this.currentShareUid && (this.currentShareUid === share_uid)) {
      return
    }

    this.fetchSongs(share_uid)
  }

  @action fetchSongs = async (share_uid, page = 1, pageSize = 10) => {
    const data = (await getPlayList(share_uid, page, pageSize)).data.data
    this.currentShareUid = share_uid
    const playList = data.ugclist
    this.songs = playList
  }
}

export const playListStore = new PlayListStore()

const PlayItem = ({ song }: { song: Song }) => {

  const play = () => {
    playerStore.play(song)
  }

  return (
    <div>
      <div className='cover'>
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
      {playListStore.songs.map(song => (
        <div className='playlist-item' key={ song.ksong_mid }>
          <PlayItem song={song} />
        </div>
      ))}
    </div>
  )
})

export default PlayList
