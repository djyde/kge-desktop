import * as React from 'react'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { Song } from './PlayList'

export enum PlayerStatus {
  PLAYING,
  STOPPED,
  PAUSED,
  LOADING
}

export interface SongInfo {
  content: string,
  nick: string,
  singer_name: string,
  song_name: string,
  tail_name: string,
  ctime: number,
  playurl: string
}

declare var global
const { getSongInfo } = global.require('kge')

export class PlayerStore {
  audioPlayerRef?: HTMLAudioElement
  @observable song?: Song
  @observable status: PlayerStatus = PlayerStatus.STOPPED
  @observable songInfo?: SongInfo
  @observable playingPosition: number = 0
  @observable songDuration: number = 0

  @action saveAudioPlayerRef = (ref: HTMLAudioElement) => {
    this.audioPlayerRef = ref

    ref.addEventListener('play', () => {
      this.status = PlayerStatus.PLAYING

      if (this.audioPlayerRef) {
        this.songDuration = this.audioPlayerRef.duration
      }
    })

    ref.addEventListener('pause', () => {
      this.status = PlayerStatus.PAUSED
    })

    ref.addEventListener('playing', () => {
      this.status = PlayerStatus.PLAYING
    })

    ref.addEventListener('timeupdate', e => {
      this.playingPosition = ref.currentTime
    })
  }

  @action changePosition = (e) => {
    if(this.audioPlayerRef) {
      this.audioPlayerRef.currentTime = e.target.value
    }
  }

  @action play = async (song: Song) => {
    this.status = PlayerStatus.PLAYING
    this.song = song
    this.songInfo = undefined
    const songInfo = (await getSongInfo(song.shareid)).detail
    this.songInfo = songInfo
  }

  @action audioPlay = () => {
    if (!this.audioPlayerRef) {
      return
    }

    this.audioPlayerRef.play()
  }

  @action pause = () => {
    if (!this.audioPlayerRef) {
      return
    }

    this.audioPlayerRef.pause()
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

      <audio autoPlay src={songInfo && songInfo.playurl} ref={playerStore.saveAudioPlayerRef} ></audio>

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
          <span onClick={playerStore.pause}>play</span>
          <span>next</span>
        </div>

        <div id='progress'>
          <input
            type="range"
            max={playerStore.songDuration}
            defaultValue='0'
            onChange={playerStore.changePosition}
            disabled={songInfo ? false : true}
            value={playerStore.playingPosition}
          />
        </div>
      </div>
    </div>
  )
})

export default Player