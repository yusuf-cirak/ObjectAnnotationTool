import { DialogService } from './services/dialog.service';
import { AnnotationService, BoundingBox } from './services/annotation.service';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(public dialog: MatDialog,public annotationService:AnnotationService,private dialogService:DialogService) {}

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-draw');

    this.context = this.canvas.getContext('2d');

    this.tags = ['Tag1', 'Tag2', 'Tag3'];
    this.objectClasses = ['Araba', 'Ev'];
    this.context.strokeStyle = 'red';
  }

  onFileChanged($event:any){
    this.annotationService.onFileChanged($event,{image:this.image,fileName:this.fileName,canvas:this.canvas,context:this.context});
  }

  // onFileChanged($event: any) {
  //   if ($event.target.files && $event.target.files[0]) {
  //     var reader = new FileReader();
  //     var that = this;
  //     this.fileName = $event.target.files[0].name;
  //     reader.onload = function (e: any) {
  //       that.image.src = e.target.result;
  //       that.image.onload = function () {
  //         that.canvas.width = that.image.width;
  //         that.canvas.height = that.image.height;
  //         that.context.drawImage(that.image, 0, 0);
  //       };
  //     };
  //     reader.readAsDataURL($event.target.files[0]);
  //     this.imageUploaded = true;
  //   }
  // }

  public pointCounter: number = 0;
  public annotationCounter: number = 0;
  public startPoint = null;
  public clickOnCanvas: boolean = false;
  public output = {
    imageName: this.image.src.replace(/^.*[\\\/]/, ''),
    annotations: [],
  };

  public boundingBox=new BoundingBox(this.output,this.pointCounter,this.annotationCounter,this.startPoint,this.clickOnCanvas);

  newImage(){
    this.annotationService.newImage({canvas:this.canvas,
      boundingBox:this.boundingBox,context:this.context,
      });
  }

  // newImage() {
  //   var canvasDraw = document.getElementById(
  //     'canvas-draw'
  //   ) as HTMLCanvasElement;
  //   canvasDraw.addEventListener('mousedown', mouseDown, false);
  //   canvasDraw.addEventListener('mouseup', mouseUp, false);

  //   var that = this;

  //   function mouseUp($event: any) {
  //     that.handleMouseUp($event);
  //   }

  //   function mouseDown($event: any) {
  //     that.handleMouseDown($event);
  //   }

  //   document.getElementById('inputFile')?.click();
  // }

  // // Bounding Boxes
  // public pointCounter: number = 0;
  // public annotationCounter: number = 0;
  // public startPoint = null;
  // public clickOnCanvas: boolean = false;
  // public output = {
  //   imageName: this.image.src.replace(/^.*[\\\/]/, ''),
  //   annotations: [],
  // };

  // handleMouseDown($event: any) {
  //   this.clickOnCanvas = true;

  //   // Establish upper left point
  //   var upperLeftPoint: Point = { x: 0, y: 0 };
  //   upperLeftPoint.x = $event.x - this.canvas.offsetLeft;
  //   upperLeftPoint.y = $event.y - this.canvas.offsetTop;
  //   this.startPoint = upperLeftPoint;
  // }

  // handleMouseUp($event: any) {
  //   if (this.clickOnCanvas) {
  //     // Establish lower right point
  //     var lowerRightPoint: Point = { x: 0, y: 0 };
  //     lowerRightPoint.x = $event.x - this.canvas.offsetLeft;
  //     lowerRightPoint.y = $event.y - this.canvas.offsetTop;

  //     var width = lowerRightPoint.x - this.startPoint.x;
  //     var height = lowerRightPoint.y - this.startPoint.y;

  //     var annotation = new Annotation(
  //       this.startPoint.x,
  //       this.startPoint.y,
  //       width,
  //       height
  //     );

  //     this.context.strokeRect(
  //       this.startPoint.x,
  //       this.startPoint.y,
  //       lowerRightPoint.x - this.startPoint.x,
  //       lowerRightPoint.y - this.startPoint.y
  //     ); // Draw rectangle

  //     // Push box object to annotations list
  //     this.output.annotations.push(annotation);
  //     console.log(this.output);
  //     this.clickOnCanvas = false;
  //   }
  // }

  addTag(){
  this.dialogService.addTag();
  }

  addObjectClass(){
    this.dialogService.addObjectClass();
    }

  // addTag() {
  //   const dialogRef = this.dialog.open(AddTagDialogComponent, {
  //     data: {},
  //   });

  //   dialogRef.afterClosed().subscribe((e) => {
  //     alert(e);
  //   });
  // }

  // addObjectClass() {
  //   const dialogRef = this.dialog.open(AddObjectClassComponent, {
  //     data: {},
  //   });

  //   dialogRef.afterClosed().subscribe((e) => {
  //     alert(e);
  //   });
  // }
}
