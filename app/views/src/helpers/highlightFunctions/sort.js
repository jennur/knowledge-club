export default function highlightSort(a, b){
  if ( a.startloc > b.startloc ) return -1;
  else if ( a.startloc < b.startloc ) return 1;
  else return 0;
}