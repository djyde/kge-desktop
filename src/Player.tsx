import * as React from 'react'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { Song } from './PlayList'

export enum PlayerStatus {
  PLAYING,
  STOPPED,
  PAUSED
}

export interface SongInfo {
  content: string,
  nick: string,
  singer_name: string,
  song_name: string,
  tail_name: string,
  ctime: number
}

declare var global
const { getSongInfo } = global.require('kge')

export class PlayerStore {
  @observable song?: Song
  @observable status: PlayerStatus = PlayerStatus.STOPPED
  @observable songInfo?: SongInfo

  @action play = async (song: Song) => {
    this.status = PlayerStatus.PLAYING
    this.song = song
    this.songInfo = undefined
    const songInfo = (await getSongInfo(song.shareid)).detail
    this.songInfo = songInfo
  }
}

export const playerStore = new PlayerStore()

const Player = observer(() => {
  const song = playerStore.song
  const songInfo = playerStore.songInfo

  if(!song) {
    return (
      <div>
        Do have faith with what you are doing.
      </div>
    )
  }

  return (
    <div id='player'>
      <div id='cover'>
        <article className='media'>
          <figure className='media-left'>
            <p className='image is-48x48'>
              <img src={song ? song.avatar : ''} alt="" />
            </p>
          </figure>

          <div className='media-content'>
            <div className='content'>
              <p style={{ marginBottom: '0' }}>{song.title}</p>
              { songInfo && <small>{`${songInfo.nick} Cover: ${songInfo.singer_name}`}</small> }
            </div>
          </div>
        </article>
      </div>
      <div id='controls'>
        <div id='tools'>
          <span>prev</span>
          <span>play</span>
          <span>next</span>          
        </div>

        <div id='progress'>
        </div>
      </div>
    </div>
  )
})

export default Player