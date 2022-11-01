import { Injectable } from '@angular/core';
import { Annotation } from '../models/annotation';
import { Point } from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

   onFileChanged($event: any,annotationParameters:Partial<AnnotationParameters>) {
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();
      var that = this;
      annotationParameters.fileName=$event.target.files[0].name;
      // this.fileName = $event.target.files[0].name;
      reader.onload = function (e: any) {
        annotationParameters.image.src=e.target.result;
        // that.image.src = e.target.result;

        annotationParameters.image.onload=()=>{
          annotationParameters.canvas.width = annotationParameters.image.width;
          annotationParameters.canvas.height = annotationParameters.image.height;
          annotationParameters.context.drawImage(annotationParameters.image, 0, 0);
        }
        // that.image.onload = function () {
        //   that.canvas.width = that.image.width;
        //   that.canvas.height = that.image.height;
        //   that.context.drawImage(that.image, 0, 0);
        // };
      };
      reader.readAsDataURL($event.target.files[0]);
      annotationParameters.imageUploaded=true;
    }
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


  // Bounding Boxes
  // public pointCounter: number = 0;
  // public annotationCounter: number = 0;
  // public startPoint = null;
  // public clickOnCanvas: boolean = false;
  // public output = {
  //   imageName: this.image.src.replace(/^.*[\\\/]/, ''),
  //   annotations: [],
  // };

  public handleMouseDown($event: any,annotationParams:Partial<AnnotationParameters>) {
    annotationParams.boundingBox.clickOnCanvas = true;

    // Establish upper left point
    var upperLeftPoint: Point = { x: 0, y: 0 };
    upperLeftPoint.x = $event.x - annotationParams.canvas.offsetLeft;
    upperLeftPoint.y = $event.y - annotationParams.canvas.offsetTop;
    annotationParams.boundingBox.startPoint = upperLeftPoint;
  }

  public handleMouseUp($event: any,annotationParams:Partial<AnnotationParameters>, callback?: (annotation:Annotation) => void) {
    if (annotationParams.boundingBox.clickOnCanvas) {
      // Establish lower right point
      var lowerRightPoint: Point = { x: 0, y: 0 };
      lowerRightPoint.x = $event.x - annotationParams.canvas.offsetLeft;
      lowerRightPoint.y = $event.y - annotationParams.canvas.offsetTop;

      var width = lowerRightPoint.x - annotationParams.boundingBox.startPoint.x;
      var height = lowerRightPoint.y - annotationParams.boundingBox.startPoint.y;

      var annotation = new Annotation(
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
      console.log(annotationParams.boundingBox.output);
      annotationParams.boundingBox.clickOnCanvas = false;
      callback(annotation);
    }
  }
}


export class AnnotationParameters{
  public imageUploaded: boolean = false;

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public image: HTMLImageElement = new Image();

  public fileName: string = '';

  public tags;

  public objectClasses;

  public boundingBox:BoundingBox;

}

 export class BoundingBox{

  public output:any;
  public pointCounter: number = 0;
  public annotationCounter: number = 0;
  public startPoint = null;
  public clickOnCanvas: boolean = false;

  /**
   *
   */
  constructor(output:any,pointCounter:number,annotationCounter:number,startPoint:any,clickOnCanvas:boolean) {

    this.pointCounter=pointCounter;
    this.annotationCounter=annotationCounter;
    this.startPoint=null;
    this.clickOnCanvas=clickOnCanvas;
    this.output = output;
  }
  /**
   *
   */



}
