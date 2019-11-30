import React,{ Component } from 'react';
import './App.css';
import axios from 'axios';
import LeftSide from './leftSide';
import AudioList from './AudioList';

class App extends Component {
  state={
    playList:[],
    currentAudio:'',
    audio:this.audioRef,
    playhead:'',
    status:false,
    shuffle:false,
    repeat:false,
  }

  timeLine=(e)=>{
    var per=e.nativeEvent.offsetX/e.target.offsetWidth
    this.audioRef.currentTime = per * this.audioRef.duration
  }
  update=(e)=>{
    var playhead=e.target.currentTime/e.target.duration * 100 + '%'
    this.setState({playhead})
  }
  controlTrack=(str)=>{
    var playList=this.state.playList;
    var id=this.state.currentAudio.id;
    switch(str){
      case 'play':
        this.setState({status:true})
        this.audioRef.play()
        break;
      case 'pause':
        this.setState({status:false})
        this.audioRef.pause()
        break;
      case 'forward':
        if(parseInt(this.state.currentAudio.id)=== playList.length){
          id=0;
        }
        this.setState({currentAudio:playList[id],status:true})
        this.audioRef.autoplay=true;
        break;
      case 'backward':
        if(parseInt(this.state.currentAudio.id)===playList[0].id){
          id=id+8;
        }
        else
        {
          id=id-2;
        }
        this.setState({currentAudio:playList[id],status:true})
        this.audioRef.autoplay=true;
        break;
      case 'random':
        id=Math.floor(Math.random()*8)
        this.setState({currentAudio:playList[id],status:true})
        this.audioRef.autoplay=true;
        break;
      case 'repeat':
          this.audioRef.currentTime=0
          this.setState({status:true})
          this.audioRef.play();
          return
        break;
    }
  }

  trackEnd=()=>{
    var playList=this.state.playList;
    var id=this.state.currentAudio.id;
    if(parseInt(id)===playList.length)
    {
      id = 1;
    }
    this.setState({currentAudio:playList[id],status:true})
    this.audioRef.autoplay=true;
  }

  cardClick=(id)=>{
    this.setState({currentAudio:this.state.playList[id],status:true})
    this.audioRef.autoplay=true;
  }

  componentDidMount(){
    axios.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist")
    .then(response=>{
      console.log(response.data)
      this.setState({playList:response.data,coverImg:response.data[0].albumCover,artist:response.data[0].artist,track:response.data[0].track,currentAudio:response.data[0]})
      console.log(this.state)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render(){
    if(this.state.playList.length==null)
    {
      return null;
    }
    if(this.state.currentAudio==null)
    {
      return null;
    }
   
  return (
    <div className="main-container">
    <div className="App">
      <audio ref={(input)=>{this.audioRef=input}} src={this.state.currentAudio.file} autoPlay={false} onEnded={this.trackEnd} onTimeUpdate={this.update}/>
    
      <LeftSide 
      currentAudio={this.state.currentAudio}
      timeLine={this.timeLine}
      playhead={this.state.playhead}
      status={this.state.status}
      controlTrack={this.controlTrack}/>

      <hr></hr>

      <AudioList
      playlist={this.state.playList} 
      cardClick={this.cardClick}/>
    </div>
    </div>
  );
  }
}

export default App;
