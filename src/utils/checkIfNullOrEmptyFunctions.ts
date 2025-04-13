export const elementsInArrayAllEpmty = (array: string[]|null|undefined): boolean => {
  if(!array) return true
  for(let i=0; i<array.length-1; i++){
    if(array[i] !== ""){
      return false
    }
  }
  return true
}