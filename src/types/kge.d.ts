declare var global: any

declare module Kge {
  export interface User {
    age: number,
    follower: number,
    head_img_url: string,
    level: number,
    nickname: string,
    kge_uid: string,
    ugc_total_count: number
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

  export interface Song {
    avatar: string,
    ksong_mid: string,
    title: string,
    play_count: number,
    time: number,
    shareid: string
  }

}
