import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

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

  @action fetchSongs = async (share_uid) => {
    const playList = (await getPlayList(share_uid, 1, 10)).data.data.ugclist
    this.songs = playList
  }
}

export const playListStore = new PlayListStore()

const PlayItem = ({ song }: { song: Song }) => {
  return (
    <article className='media'>
      <figure className='media-left'>
        <p className='image is-48x48'>
          <img src={song.avatar}></img>
        </p>
      </figure>
      <div className='media-content'>
        <div className='content'>
          <div>
            <strong>{song.title}</strong>
          </div>
          <div>
            <small>播放次数：{song.play_count}</small>
          </div>
        </div>
      </div>
    </article>
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
