import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'ObjectAnnotationTool';

  public canvas:HTMLCanvasElement;
  public context:CanvasRenderingContext2D;
  public image: HTMLImageElement = new Image();

  public fileName:string="";

  ngAfterViewInit(): void {
    this.canvas=<HTMLCanvasElement>document.getElementById("canvas-draw");
    this.context=this.canvas.getContext("2d");
  }



  onFileChanged($event:any){

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
        }
      };
      reader.readAsDataURL($event.target.files[0]);
    }

  }

  newImage() {
    var canvasDraw = document.getElementById("canvas-draw") as HTMLCanvasElement;
    canvasDraw.addEventListener("mousedown", mouseUp, false);
    canvasDraw.addEventListener("mousemove", mouseDown, false);
    var that = this;

    /**
     * Handling function when mouse is clicked
     * @param mouse Mouse event details
     */
    function mouseUp(event) {
      that.handleMouseUp(event);
    }

    /**
     * Handling function when mouse moves
     * @param mouse Mouse event details
     */
    function mouseDown(event) {
      that.handleMouseDown(event);
    }

    document.getElementById('inputFile')?.click();
  }









  // Bounding Boxes

public toolSelected:string = null;
public pointCounter:number = 0
public annotationCounter:number = 0
public startPoint = null
public clickOnCanvas:boolean = false
public output = { imageName: this.image.src.replace(/^.*[\\\/]/, ''), annotations: [], }

handleMouseDown(event){

    this.context.strokeStyle = "red"

if (this.toolSelected != null) {
    this.clickOnCanvas = true
    this.pointCounter+=1;
    let point = String(this.pointCounter)

    // Establish upper left point
    var upperLeftPoint = { pointID: point, x: 0, y: 0, }
    upperLeftPoint.x = event.x - this.canvas.offsetLeft;
    upperLeftPoint.y = event.y - this.canvas.offsetTop;
    this.startPoint = upperLeftPoint

}
}

handleMouseUp(event){
  if (this.toolSelected != null && this.clickOnCanvas) {
    // Increase point counter
    this.pointCounter+=1;
    let point = String(this.pointCounter)

    // Establish lower right point
    var lowerRightPoint = { pointID: point, x: 0, y: 0, }
    lowerRightPoint.x = event.x - this.canvas.offsetLeft;
    lowerRightPoint.y = event.y - this.canvas.offsetTop;

    this.context.strokeRect(this.startPoint.x, this.startPoint.y, lowerRightPoint.x - this.startPoint.x, lowerRightPoint.y - this.startPoint.y); // Draw rectangle
    this.annotationCounter+=1;
    let annotation = String(this.annotationCounter)

    // Create new box object
    var box = { annotationID: annotation, upperLeft: this.startPoint, lowerRight: lowerRightPoint, type: null, }

    // Push box object to annotations list
    this.output.annotations.push(box)
    console.log(this.output)
    this.clickOnCanvas = false
}
}
  }


