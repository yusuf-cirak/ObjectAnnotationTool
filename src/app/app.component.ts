import { AddObjectClassComponent } from './dialog/add-object-class-dialog/add-object-class-dialog.component';
import { AddTagDialogComponent } from './dialog/add-tag-dialog/add-tag-dialog.component';
import { Annotation } from './models/Annotation';
import { Point } from './models/Point';
import { AfterViewInit, Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ObjectAnnotationTool';

  public imageUploaded: boolean = false;

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public image: HTMLImageElement = new Image();

  public fileName: string = '';

  public tags;

  public objectClasses;
  /**
   *
   */
  constructor(public dialog:MatDialog) {
  }

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-draw');

    this.context = this.canvas.getContext('2d');

    this.tags = ['Tag1', 'Tag2', 'Tag3'];
    this.objectClasses = ['Araba', 'Ev'];
    this.context.strokeStyle = 'red';

  }

  onFileChanged($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();
      var that = this;
      this.fileName = $event.target.files[0].name;
      reader.onload = function (e: any) {
        that.image.src = e.target.result;
        that.image.onload = function () {
          that.canvas.width = that.image.width;
          that.canvas.height = that.image.height;
          that.context.drawImage(that.image, 0, 0);
          // that.allBoxes = [];
        };
      };
      reader.readAsDataURL($event.target.files[0]);
      this.imageUploaded = true;
    }
  }

  newImage() {
    var canvasDraw = document.getElementById(
      'canvas-draw'
    ) as HTMLCanvasElement;
    canvasDraw.addEventListener('mousedown', mouseDown, false);
    canvasDraw.addEventListener('mouseup', mouseUp, false);

    var that = this;

    function mouseUp($event: any) {
      that.handleMouseUp($event);
    }

    function mouseDown($event: any) {
      that.handleMouseDown($event);
    }

    document.getElementById('inputFile')?.click();
  }

  // Bounding Boxes

  // public toolSelected:string = null;
  public pointCounter: number = 0;
  public annotationCounter: number = 0;
  public startPoint = null;
  public clickOnCanvas: boolean = false;
  public output = {
    imageName: this.image.src.replace(/^.*[\\\/]/, ''),
    annotations: [],
  };

  handleMouseDown($event: any) {
    this.clickOnCanvas = true;

    // Establish upper left point
    var upperLeftPoint: Point = { x: 0, y: 0 };
    upperLeftPoint.x = $event.x - this.canvas.offsetLeft;
    upperLeftPoint.y = $event.y - this.canvas.offsetTop;
    this.startPoint = upperLeftPoint;
  }

  handleMouseUp($event: any) {
    if (this.clickOnCanvas) {
      // Establish lower right point
      var lowerRightPoint: Point = { x: 0, y: 0 };
      lowerRightPoint.x = $event.x - this.canvas.offsetLeft;
      lowerRightPoint.y = $event.y - this.canvas.offsetTop;

      var annotation = new Annotation(
        this.startPoint.x,
        this.startPoint.y,
        lowerRightPoint.x - this.startPoint.x,
        lowerRightPoint.y - this.startPoint.y
      );

      this.context.strokeRect(
        this.startPoint.x,
        this.startPoint.y,
        lowerRightPoint.x - this.startPoint.x,
        lowerRightPoint.y - this.startPoint.y
      ); // Draw rectangle

      // Push box object to annotations list
      this.output.annotations.push(annotation);
      console.log(this.output);
      this.clickOnCanvas = false;
    }
  }



  addTag(){
    const dialogRef=this.dialog.open(AddTagDialogComponent, {
      data:{}
  })


  dialogRef.afterClosed().subscribe(e=>{
    alert(e);
  })
}

addObjectClass(){
  const dialogRef=this.dialog.open(AddObjectClassComponent, {
    data:{}
})


dialogRef.afterClosed().subscribe(e=>{
  alert(e);
})
}

}
