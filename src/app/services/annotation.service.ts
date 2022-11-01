import { AddObjectClassComponent, AddObjectClassDialogState } from './../dialog/add-object-class-dialog/add-object-class-dialog.component';
import { AddTagDialogComponent, AddTagDialogState } from './../dialog/add-tag-dialog/add-tag-dialog.component';
import { DialogService } from './dialog.service';
import { ObjectClass } from './../contracts/objectClass';
import { Tag } from './../contracts/tag';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';
import { Injectable } from '@angular/core';
import { Annotation } from '../models/annotation';
import { Point } from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private toastrService:CustomToastrService,private dialogService:DialogService) {
  }

  addTag(tags:Tag[]){

    this.dialogService.openDialog({componentType:AddTagDialogComponent,data:{name:"",state:AddTagDialogState.No},
    afterClosed:(data)=>{
      tags.push(new Tag(3,3,data));
    }})
  }

  addObjectClass(objectClasses:ObjectClass[]){

    this.dialogService.openDialog({componentType:AddObjectClassComponent,data:{name:"",state:AddObjectClassDialogState.No},
    afterClosed:(data)=>{
      objectClasses.push(new ObjectClass(3,data));
    }})
  }

   onFileChanged($event: any,annotationParameters:Partial<AnnotationParameters>): boolean {
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();
      annotationParameters.fileName=$event.target.files[0].name;
      reader.onload = function (e: any) {
        annotationParameters.image.src=e.target.result;
        annotationParameters.image.onload=()=>{
          var width=annotationParameters.image.width;
          var height=annotationParameters.image.height;
          annotationParameters.canvas.width = width>=1024?1024:width;
          annotationParameters.canvas.height = height>=768?768:height;
          annotationParameters.context.drawImage(annotationParameters.image, 0, 0);
        }
      };
      reader.readAsDataURL($event.target.files[0]);

      return true;
    }

    return false;
  }

  public newImage(annotationParams:Partial<AnnotationParameters>) {
    var canvasDraw = document.getElementById(
      'canvas-draw'
    ) as HTMLCanvasElement;
    canvasDraw.addEventListener('mousedown', mouseDown, false);
    canvasDraw.addEventListener('mouseup', mouseUp, false);

    var that = this;

    function mouseUp($event: any) {
      that.handleMouseUp($event,annotationParams);
    }

    function mouseDown($event: any) {
      that.handleMouseDown($event,annotationParams);
    }

    document.getElementById('inputFile')?.click();
  }

  public handleMouseDown($event: any,annotationParams:Partial<AnnotationParameters>) {
    // window.scrollTo(0,0);
    annotationParams.boundingBox.clickOnCanvas = true;

    // Establish upper left point
    var upperLeftPoint: Point = { x: 0, y: 0 };
    // upperLeftPoint.x = $event.x - annotationParams.canvas.offsetLeft;
    // upperLeftPoint.y = $event.y - annotationParams.canvas.offsetTop;

    upperLeftPoint.x = $event.x - annotationParams.canvas.offsetLeft;
    upperLeftPoint.y = $event.y - annotationParams.canvas.offsetTop;
    annotationParams.boundingBox.startPoint = upperLeftPoint;
  }

  public handleMouseUp($event: any,annotationParams:Partial<AnnotationParameters>):void {
    if (annotationParams.boundingBox.clickOnCanvas) {

      annotationParams.annotationCounter++;

      // Establish lower right point
      var lowerRightPoint: Point = { x: 0, y: 0 };
      lowerRightPoint.x = $event.x - annotationParams.canvas.offsetLeft;
      lowerRightPoint.y = $event.y - annotationParams.canvas.offsetTop;

      var width = lowerRightPoint.x - annotationParams.boundingBox.startPoint.x;
      var height = lowerRightPoint.y - annotationParams.boundingBox.startPoint.y;

      var annotation = new Annotation(
        annotationParams.annotationCounter,
        annotationParams.boundingBox.startPoint.x,
        annotationParams.boundingBox.startPoint.y,
        width,
        height
      );

      annotationParams.context.strokeRect(
        annotationParams.boundingBox.startPoint.x,
        annotationParams.boundingBox.startPoint.y,
        lowerRightPoint.x - annotationParams.boundingBox.startPoint.x,
        lowerRightPoint.y - annotationParams.boundingBox.startPoint.y
      ); // Draw rectangle

      // Push box object to annotations list
      annotationParams.boundingBox.output.annotations.push(annotation);

      annotationParams.boundingBox.clickOnCanvas = false;

      annotationParams.anyAnnotationDrawed=true;

    }
  }


 public removeSelectedValue(annotationArray:Annotation[],annotation:Annotation){
  annotationArray.splice(annotationArray.indexOf(annotation),1);
  }

  public saveAnnotations(annotationParams:Partial<AnnotationParameters>){
    var selectedObjectClasses=[];

    var annotations=annotationParams.boundingBox.output.annotations;

    for (const annotation of annotations) {
      if (annotation.selectedObjectClass===null) {
        this.toastrService.message(`You haven't select object class for annotation that numbered as ${annotation.id}.\nSelect object classes for your annotations`,"Object Class Error",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
        return;
      }
      selectedObjectClasses.push(annotation.selectedObjectClass);
    }

    if (selectedObjectClasses.length===0) {
      this.toastrService.message("You haven't select object class for your annotations.\nSelect object classes for your annotations","Object Class Error",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
      return;

    }
    var duplicateArr=this.findDuplicatesInArray(selectedObjectClasses);

    if (duplicateArr.length>0) {
      this.toastrService.message("You selected same object classes for different annotations.\nCheck your object classes for annotations","Duplicate Object Classes for annotations",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
      return;
    }

    // api post request

    this.toastrService.message("Annotations successfully saved to database!","Saved",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
  }

  findDuplicatesInArray(arr:any[]){
    return arr.filter((item,index)=>arr.indexOf(item)!==index);
  }


  removeAnnotation(index:number,annotationParams:Partial<AnnotationParameters>){
    if (index>=0) {
      var annotations=annotationParams.boundingBox.output.annotations;
      annotations.splice(index, 1);
      }
      annotationParams.context.clearRect(0, 0, annotationParams.canvas.width, annotationParams.canvas.height);

      annotationParams.context.drawImage(annotationParams.image, 0, 0);

      annotations.forEach(annotation => {
        annotationParams.context.strokeRect(annotation.x,annotation.y,annotation.width,annotation.height);
      });
  }
}







export class AnnotationParameters{
  public annotationCounter:number=0;
  public imageUploaded: boolean;

  public canvas?: HTMLCanvasElement;
  public context?: CanvasRenderingContext2D;
  public image: HTMLImageElement;

  public fileName: string = '';

  public tags:Tag[];

  public objectClasses:ObjectClass[];

  public anyAnnotationDrawed:boolean=false;

  public boundingBox:BoundingBox;

  /**
   *
   */
  constructor(annotationCounter:number,imageUploaded:boolean,canvas:HTMLCanvasElement,context:CanvasRenderingContext2D,image:HTMLImageElement,fileName:any,tags:Tag[],objectClasses:ObjectClass[],anyAnnotationDrawed:boolean,boundingBox:BoundingBox) {
    this.annotationCounter=annotationCounter;
    this.imageUploaded=imageUploaded;
    this.canvas=canvas;
    this.context=context;
    this.image=image;
    this.fileName=fileName;
    this.tags=tags;
    this.objectClasses=objectClasses;
    this.anyAnnotationDrawed=anyAnnotationDrawed;
    this.boundingBox=boundingBox;
  }


}

 export class BoundingBox{

  public output:any;
  public annotationCounter: number;
  public startPoint:any;
  public clickOnCanvas: boolean;

  constructor(output:any,annotationCounter:number,startPoint:any,clickOnCanvas:boolean) {

    this.annotationCounter=annotationCounter;
    this.startPoint=startPoint
    this.clickOnCanvas=clickOnCanvas;
    this.output = output;
  }

}
