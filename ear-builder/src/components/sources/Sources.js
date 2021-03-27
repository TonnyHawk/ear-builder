import React from 'react';

export default class Sources extends React.Component{
   constructor(props){
      super(props);
      this.props.isLoading(true)
      this.content = null
      this.myRefs = []
      this.addRef = (elem)=>{
         this.myRefs.push(elem)
      }

      this.stillLoading = this.props.trackPaths.length;
      this.allTracks = this.props.trackPaths.length;
      this.passed = null
   }


   addAudioSrcs = ()=>{
      return this.props.trackPaths.map(src=>{
         return(
            <audio controls key={src} src={src} className='track' ref={elem=>this.addRef(elem)} onLoadedData={this.fileIsLoaded}></audio>
         )
      })
   }

   fileIsLoaded = ()=>{
      this.passed = this.allTracks - this.stillLoading;
      this.props.setLoaderData(this.allTracks, this.passed)
      this.stillLoading = --this.stillLoading;

      if(this.stillLoading === 0){
         this.props.isLoading(false)
         console.log('audio files have been loaded');
      }
   }

   componentDidMount(){
      this.props.refreshTracks(this.myRefs)
   }

   render(){

      return(
         <div className='sources'>
            {this.addAudioSrcs()}
         </div>
      )
   }
}