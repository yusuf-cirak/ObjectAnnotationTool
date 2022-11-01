import { ObjectClass } from './contracts/objectClass';
import { Tag } from './contracts/tag';
import {
  AnnotationService,
  BoundingBox,
  AnnotationParameters,
} from './services/annotation.service';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ObjectAnnotationTool';

  public annotationCount: number = 0;

  public imageUploaded: boolean = false;

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public image: HTMLImageElement = new Image();

  public fileName: string = '';

  public tags?: Tag[];

  public objectClasses?: ObjectClass[];

  public anyAnnotationDrawed: boolean = false;

  public annotationParameters: AnnotationParameters;
  /**
   *
   */
  constructor(
    public dialog: MatDialog,
    public annotationService: AnnotationService  ) {}

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-draw');

    this.context = this.canvas.getContext('2d');

    this.tags = [new Tag(1, 1, 'asdasd'), new Tag(2, 2, 'ddddd')];

    this.objectClasses = [
      new ObjectClass(1, '212312312312'),
      new ObjectClass(2, '44444444444444'),
    ];

    this.annotationParameters = new AnnotationParameters(
      this.annotationCounter,
      this.imageUploaded,
      this.canvas,
      this.context,
      this.image,
      this.fileName,
      this.tags,
      this.objectClasses,
      this.anyAnnotationDrawed,
      this.boundingBox
    );
  }

  onFileChanged($event: any) {
    this.imageUploaded = this.annotationService.onFileChanged(
      $event,
      this.annotationParameters
    );
  }

  public pointCounter: number = 0;
  public annotationCounter: number = 0;
  public startPoint = null;
  public clickOnCanvas: boolean = false;
  public output = {
    imageName: this.image.src.replace(/^.*[\\\/]/, ''),
    annotations: [],
  };

  public boundingBox = new BoundingBox(
    this.output,
    this.annotationCounter,
    this.startPoint,
    this.clickOnCanvas
  );

  newImage() {
    this.annotationService.newImage(this.annotationParameters);
  }

  addTag() {
    this.annotationService.addTag(this.tags);
  }

  addObjectClass() {
    this.annotationService.addObjectClass(this.objectClasses);
  }

  saveAnnotations() {
    this.annotationService.saveAnnotations(this.annotationParameters);
  }

  removeAnnotation(index:number){
    this.annotationService.removeAnnotation(index,this.annotationParameters);
  }
}
