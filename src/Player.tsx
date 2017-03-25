import * as React from 'react'

import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'

import { playListStore } from './PlayList'

import Progressbar from './components/Progressbar'

export enum PlayerStatus {
  PLAYING,
  STOPPED,
  PAUSED,
  LOADING
}

const { getSongInfo } = global.require('kge')

export class PlayerStore {
  audioPlayerRef?: HTMLAudioElement
  song?: Kge.Song
  songs: Kge.Song[] = []
  @observable status: PlayerStatus = PlayerStatus.STOPPED
  @observable songInfo?: Kge.SongInfo
  @observable playingPosition: number = 0
  @observable songDuration: number = 0
  @observable currentSongIndex?: number

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

    ref.addEventListener('ended', () => {
      this.playNext()
    })
  }

  @action changePosition = (e) => {
    if(this.audioPlayerRef) {
      this.audioPlayerRef.currentTime = e.target.value
    }
  }

  @action play = async (song: Kge.Song, songs: Kge.Song[] = this.songs) => {
    this.status = PlayerStatus.PLAYING
    if (songs) {
      this.currentSongIndex = songs.map(song => song.ksong_mid).indexOf(song.ksong_mid)
    }
    this.song = song
    this.songs = songs || this.songs
    this.songInfo = undefined
    const songInfo = (await getSongInfo(song.shareid)).detail
    this.songInfo = songInfo
  }

  @action playPrev = () => {
    if (this.currentSongIndex === 0) {
      // play last songs
      this.play(this.songs[this.songs.length - 1])
      return
    }
    if ((this.currentSongIndex) && (this.currentSongIndex - 1 > 0)) {
      this.play(this.songs[this.currentSongIndex - 1])
    }
  }

  @action playNext = () => {
    if (this.currentSongIndex === this.songs.length - 1) {
      // play first song
      this.play(this.songs[0])
      return
    }
    if ((this.currentSongIndex !== undefined) && (this.currentSongIndex + 1) < this.songs.length) {
      this.play(this.songs[this.currentSongIndex + 1])
    }
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
      </div>
    )
  }

  return (
    <div id='player'>

      <audio autoPlay src={songInfo && songInfo.playurl} ref={playerStore.saveAudioPlayerRef} ></audio>

      <div id='cover'>
        <article className='media' style={{ paddingLeft: '.5em' }}>
          <figure className='media-left'>
            <p className='image is-48x48'>
              <img src={song ? song.avatar : ''} alt="" />
            </p>
          </figure>

          <div className='media-content'>
            <div className='content'>
              <p style={{ marginBottom: '0' }}>{song.title}</p>
              { songInfo && <small>{`${songInfo.nick}`}</small> }
            </div>
          </div>
        </article>
      </div>
      <div id='controls'>
        <div id='tools'>
          <div className='control-btn-wrapper'>
            <span className='control-btn' onClick={playerStore.playPrev}></span>            
          </div>
          <div className='control-btn-wrapper'>
            {playerStore.status === PlayerStatus.PLAYING ? <span className='control-btn' onClick={playerStore.pause}></span> : <span className='control-btn' onClick={playerStore.audioPlay}></span>}
          </div>            
          <div className='control-btn-wrapper'>
            <span className='control-btn' onClick={playerStore.playNext}></span>
          </div>          
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

        <div id='operations'>
          
        </div>
      </div>
    </div>
  )
})

export default Player