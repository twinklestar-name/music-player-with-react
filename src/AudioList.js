import React from 'react';
import './AudioList.css';

const AudioList=(props)=>{

  const playCards=props.playlist.map((item)=>{
    return(
      <div key={item.id}>
      <div className="cards" onClick={()=>props.cardClick(item.id-1)}>
        <div><img className="playlist-img" src={item.albumCover} alt="playlist"/></div>
        <div>
        <div><h4 className="track">{item.track}</h4></div>
        <div className="artist">{item.artist}</div>
        </div>
      </div>
      <div className="divider"></div>
      </div>
    )
  })

  return(
    <div className="playlist-wrapper">{playCards}</div>
  )
}

export default AudioList;