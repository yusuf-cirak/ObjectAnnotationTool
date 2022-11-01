export class Annotation  {
  id:number;
  x:number
  y:number
  width:number
  height:number

  selectedObjectClass=null;
  selectedTags=null;

  constructor(id:number,x:number,y:number,width:number,height:number) {
    this.id=id;
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
  }
};
