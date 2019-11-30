import React from 'react';
import './leftSide.css';

const leftSide = (props)=> {

  return(
    <div className="playing-card">
        {props.currentAudio.albumCover!==undefined&&props.currentAudio.albumCover!==null&&props.currentAudio.albumCover!==""?<div><img className="playing-img" src={props.currentAudio.albumCover} alt="playing"/></div>:<h1 className="loader">Loading....</h1>}
        <div className="progress-bar" onClick={props.timeLine}>
        <div className="progress"  onClick={props.playhead} style={{width:`${props.playhead}`}}></div></div>
          <div>
          <i onClick={()=>props.controlTrack('random')} className="random fas fa-random"></i>
          <i onClick={()=>props.controlTrack('backward')} className="backward fas fa-step-backward"></i>
          {props.status?
          <i onClick={()=>props.controlTrack('pause')} className="play far fa-pause-circle"></i>:
          <i onClick={()=>props.controlTrack('play')} className="play far fa-play-circle"></i>}
          <i onClick={()=>props.controlTrack('forward')} className="forward fas fa-step-forward"></i>
          <i onClick={()=>props.controlTrack('repeat')} className="undo fas fa-undo"></i>
          </div>
        <div><h3 className="playing-track">{props.currentAudio.track}</h3></div>
        <div className="playing-artist">{props.currentAudio.artist}</div>
    </div>
  )
}

export default leftSide;