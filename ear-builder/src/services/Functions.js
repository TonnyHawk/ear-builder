export default class Functions{

   randNum(elem) {// for arrays
      let min = Math.ceil(0);
      let max = Math.floor(elem.length - 1); // cause array length is bigger then last item index
      let res = Math.floor(Math.random() * (max - min + 1)) + min;
      return res; 
   }

}