import {React, Component} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Sources from '../sources/Sources'
import ProgressBar from '../progressBar/ProgressBar'
import audioService from '../../services/audioService'
import Functions from '../../services/Functions'

export default class App extends Component{
   constructor(props){
      super(props)

      this.audioService = new audioService();
      this.trackPaths = this.audioService.generatePath();
      this.funcs = new Functions();
      this.tracks = []
   }

   state = {
      loading: true,
      loader: {
         passed: null,
         all: null,
      },
      currentTrack: null
   }

   isLoading = (loadingState)=>{
      this.setState({loading: loadingState})
   }

   setLoaderData=(all, passed)=>{
      this.setState({loader:{all, passed}})
   }

   choseSound =()=>{
      let index = this.funcs.randNum(this.trackPaths)
      let newCurrentTrack = this.tracks[index]
      this.setState({currentTrack: newCurrentTrack})
   }

   refreshTrackElements=(tracks)=>{
      this.tracks = tracks
   }

   checkTheAnswer = (answer, mode='interval') =>{
      let src = this.state.currentTrack.getAttribute('src');
      src = src.split('/')
      answer = answer.split('/')
      let srcPos;
      if(mode === 'interval'){
         srcPos = 1;
         for(let i = 0; i < answer.length; i++){
            if(answer[i] === src[srcPos]){
               return true;
            }
         }
      }

      return false
   }

   gues = (answer)=>{
      let result = this.checkTheAnswer(answer)
      if(result){
         console.log('yea right!')
         this.choseSound()
      } else{
         console.log('ne');
      }

      this.playSound()

   }

   playSound=()=>{
      let player = this.state.currentTrack
      player.currentTime = 0;
      player.play()
   }

   componentDidMount(){
      this.choseSound()
   }

   render(){

      let {loading} = this.state
      let spinner = loading ? <ProgressBar loaderState={this.state.loader}/> : null

      return(
         <>
         {spinner}
         <div className='app'>
            <Container fluid>
               <Row>
                  <Col className='px-0'><Button className='my-btn' onClick={()=>this.gues('3/6')}>3 / 6</Button></Col>
                  <Col className='px-0'><Button className='my-btn' onClick={()=>this.gues('2/7')}>2 / 7</Button></Col>
               </Row>
               <Row>
                  <Col className='px-0'><Button className='my-btn' onClick={()=>this.gues('4/5')}>4 / 5</Button></Col>
                  <Col className='px-0'><Button className='my-btn' onClick={()=>this.gues('8/1')}>8 / 1</Button></Col>
               </Row>
               <Row className='mt-5'>
                  <Col><Button className='rect-btn'>menu</Button></Col>
                  <Col><Button className='rect-btn' onClick={()=>this.playSound()}>play</Button></Col>
               </Row>
            </Container>
         </div>

         <Sources 
            trackPaths={this.trackPaths} 
            refreshTracks={this.refreshTrackElements} 
            isLoading={this.isLoading}
            setLoaderData={this.setLoaderData}
         />
         </>
      )
   }
}