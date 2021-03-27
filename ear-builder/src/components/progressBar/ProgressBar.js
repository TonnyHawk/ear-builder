import './ProgressBar.css';

export default function ProgressBar({loaderState}){
   let {all, passed} = loaderState
   return (
      <div className='loader-wrap'>
         <progress id="file" value={passed} max={all}> {passed}% </progress>
      </div>
      )
}