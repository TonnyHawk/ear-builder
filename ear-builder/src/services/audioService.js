export default class audioService{
   constructor(){
      this.pth = {
         audioFolder: 'audio',
         interval: ['3','6', '2', '7', '4', '5', '8', '1'],
         bassNote: [
            'c',
            'cis',
            'd',
            'dis',
            'e',
            'f',
            'fis',
            'g',
            'gis',
            'a',
            'b',
            'h',
         ],
         octave: [1],
         ext: '.mp3'
      }

      this.typesOf = {
         3: ['maj', 'min'],
         6: ['maj', 'min'],
         2: ['maj', 'min'],
         7: ['maj', 'min'],
         4: ['p'],
         5: ['p'],
         8: ['p'],
         1: ['p']
      }

      this.generatePath = (param=null) => {
         if(param === 'rand'){
            // let path;
            // path = pth.audioFolder + '/';
            // path += pth.pth.section[randNum(pth.section)] + '/';
            // path += pth.interval[randNum(pth.interval)] + '/';
            // path += pth.type[randNum(pth.type)];
            // path += '/octaves/';
            // path += pth.octave[randNum(pth.octave)] + '/';
            // path += pth.bassNote[randNum(pth.bassNote)];
            // path += pth.ext;

            // return path;
         }
         else{
            let paths = [];
            let it = 0;

            let intervals=(path)=>{// should recieve audio/
               let str, i;
               for(i = 0; i < this.pth.interval.length; i++){
                  str = path;
                  str += this.pth.interval[i];
                  str += '/';
                  types(str);
               }
            }

            let types=(path)=>{// should recieve audio/3/
               let str, i;
               str = path.split('/')
               let interval = str[str.length - 2]

               for(i = 0; i < this.typesOf[interval].length; i++){
                  str = path;
                  str += this.typesOf[interval][i];
                  str += '/';
                  octaves(str)
               }
            }
            

            let octaves=(path)=>{// should recieve audio/3/maj/
               path = path+'octaves/';
               let str, i;
               for(i = 0; i < this.pth.octave.length; i++){
                  str = path;
                  str += this.pth.octave[i];
                  str += '/';
                  notes(str);
               }
            }

            let notes=(path)=>{// should recieve audio/3/maj/octaves/1/
               let str, i;
               for(i = 0; i < this.pth.bassNote.length; i++){
                  str = path;
                  str += this.pth.bassNote[i];
                  str += this.pth.ext;

                  paths[it] = str;
                  it = it + 1;
               }  
            }

            intervals(this.pth.audioFolder + '/');

            return paths;
         }
      }
   }//constructor
}//class
