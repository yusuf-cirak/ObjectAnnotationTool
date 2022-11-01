export class Tag{
  id:number;
  objectClassId:number;
  name:string;

  constructor(id:number,objectClassId:number,name:string) {
    this.id=id;
    this.objectClassId=objectClassId;
    this.name=name;
  }

}
