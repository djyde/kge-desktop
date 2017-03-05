import * as React from 'react'

export interface Song {
  avatar: string,
  ksong_mid: string,
  title: string,
  play_count: number,
  time: number,
  shareid: string
}

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
            <strong>{song.time}</strong>
          </div>
          <div>
            <small>播放次数：{song.play_count}</small>
          </div>
        </div>
      </div>
    </article>
  )
}

const PlayList = ({ songs }: { songs: Song[] }) => {
  return (
    <div className='columns'>
      {songs.map(song => (
        <div className='column is-2'>
          <PlayItem song={song} />
        </div>

      ))}
    </div>
  )
}

export default PlayList
