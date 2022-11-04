import { AddTagDialogData } from './../dialog/add-tag-dialog/add-tag-dialog.component';
import { HttpClientService } from './http-client.service';
import {
  AddObjectClassComponent,
  AddObjectClassDialogState,
} from '../dialog/add-object-class-dialog/add-object-class-dialog.component';
import {
  AddTagDialogComponent,
  AddTagDialogState,
} from '../dialog/add-tag-dialog/add-tag-dialog.component';
import { DialogService } from './dialog.service';
import { ObjectClass } from '../contracts/objectClass';
import { Tag } from '../contracts/tag';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './custom-toastr.service';
import { Injectable } from '@angular/core';
import { Annotation } from '../models/Annotation';
import { Point } from '../models/Point';

@Injectable({
  providedIn: 'root',
})
export class AnnotationService {
  constructor(
    private toastrService: CustomToastrService,
    private dialogService: DialogService,
    private httpClientService:HttpClientService
  ) {}

  addTag(tags:Tag[],objectClasses: ObjectClass[]) {
    this.dialogService.openDialog({
      componentType: AddTagDialogComponent,

      data:{objectClasses,name: '',selectedObjectClassId:undefined, state: AddTagDialogState.No},
      afterClosed: (data) => {
        if (data.name!=="" && data.selectedObjectClassId!==undefined ) {
          this.httpClientService.post<Tag>({fullEndPoint:"https://localhost:7107/api/tags"},{"objectClassId":parseInt(data.selectedObjectClassId),"name":data.name}).subscribe(e=>{
            if (e.name==data.name) {
              tags.push(e);
              this.toastrService.message(
                'New tag successfully added!',
                'Tag Add',
                {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight,
                }
              );
            }
            else{
              this.toastrService.message(
                'Something went wrong!',
                'Error',
                {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopRight,
                }
              );
            }
          })
        }
      },
    });
  }

  addObjectClass(objectClasses: ObjectClass[]) {
    this.dialogService.openDialog({
      componentType: AddObjectClassComponent,
      data: { name: '', state: AddObjectClassDialogState.No },
      afterClosed: (data) => {
        if (data !== AddObjectClassDialogState.No && data !==undefined) {
          this.httpClientService.post<ObjectClass>({fullEndPoint:"https://localhost:7107/api/objectClasses"},{"name":data}).subscribe(e=>{
            if (e.name==data) {
              objectClasses.push(e);
              this.toastrService.message(
                'New object class successfully added!',
                'Object Class Add',
                {
                  messageType: ToastrMessageType.Success,
                  position: ToastrPosition.TopRight,
                }
              );
            }
            else{
              this.toastrService.message(
                'Something went wrong!',
                'Error',
                {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight,
                }
              );
            }
          })
        }
      },
    });
  }

  onFileChanged(
    $event: any,
    annotationParameters: Partial<AnnotationParameters>
  ): boolean {

    const file = $event.target.files[0];

    if ($event.target.files && file) {

      var reader = new FileReader();

      annotationParameters.fileName = file.name;

      var type=$event.target.files[0].type.split('/')[0];

      if (type!=="image") {
        annotationParameters.imageUploaded=false;
          this.toastrService.message(
            'Please upload an image!',
            'File Upload Error',
            {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight,
            }
          );
        return false;
      }

      reader.onload = (e: any) => {
        var imageSrc = e.target.result;
        annotationParameters.imageUploaded=true;

          annotationParameters.image.src = imageSrc;

          annotationParameters.image.onload = () => {
            var width = annotationParameters.image.width;
            var height = annotationParameters.image.height;
            annotationParameters.canvas.width = width >= 1024 ? 1024 : width;
            annotationParameters.canvas.height = height >= 768 ? 768 : height;
            annotationParameters.context.drawImage(
              annotationParameters.image,
              0,
              0
            );
          };
      };

      reader.readAsDataURL(file);

      return true
    }

    return false
  }

  public newImage(annotationParams: Partial<AnnotationParameters>) {
    var canvasDraw = document.getElementById(
      'canvas-draw'
    ) as HTMLCanvasElement;
    canvasDraw.addEventListener('mousedown', mouseDown, false);
    canvasDraw.addEventListener('mouseup', mouseUp, false);

    var that = this;

    function mouseUp($event: any) {
      that.handleMouseUp($event, annotationParams);
    }

    function mouseDown($event: any) {
      that.handleMouseDown($event, annotationParams);
    }

    document.getElementById('inputFile')?.click();
  }

  public handleMouseDown(
    $event: any,
    annotationParams: Partial<AnnotationParameters>
  ) {
    // window.scrollTo(0,0);
    annotationParams.boundingBox.clickOnCanvas = true;

    // Establish upper left point
    var upperLeftPoint: Point = { x: 0, y: 0 };

    upperLeftPoint.x = $event.x - annotationParams.canvas.offsetLeft;
    upperLeftPoint.y = $event.y - annotationParams.canvas.offsetTop;
    annotationParams.boundingBox.startPoint = upperLeftPoint;
  }

  public handleMouseUp(
    $event: any,
    annotationParams: Partial<AnnotationParameters>
  ): void {
    if (annotationParams.boundingBox.clickOnCanvas) {
      annotationParams.annotationCounter++;

      // Establish lower right point
      var lowerRightPoint: Point = { x: 0, y: 0 };
      lowerRightPoint.x = $event.x - annotationParams.canvas.offsetLeft;
      lowerRightPoint.y = $event.y - annotationParams.canvas.offsetTop;

      var width = lowerRightPoint.x - annotationParams.boundingBox.startPoint.x;
      var height =
        lowerRightPoint.y - annotationParams.boundingBox.startPoint.y;

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

      annotationParams.anyAnnotationDrawed = true;
    }
  }

  public removeSelectedValue(
    annotationArray: Annotation[],
    annotation: Annotation
  ) {
    annotationArray.splice(annotationArray.indexOf(annotation), 1);
  }

  public saveAnnotations(annotationParams: Partial<AnnotationParameters>) {
    var selectedObjectClassIds = [];
    var selectedTags=[];

    var annotations = annotationParams.boundingBox.output.annotations;

    for (const annotation of annotations) {
      if (annotation.objectClassId === null) {
        this.toastrService.message(
          `You haven't select object class for annotation that numbered as ${annotation.id}.\nSelect object classes for your annotations`,
          'Object Class Error',
          {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          }
        );
        return;
      }
      selectedObjectClassIds.push(annotation.selectedObjectClass);
      selectedTags.push(annotation.selectedTags);

    }

    if (selectedObjectClassIds.length === 0 || selectedTags.includes(null)) {
      this.toastrService.message(
        "You haven't select object classes or tags for your annotations.\nSelect object classes or tags for your annotations",
        'Error',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      return;
    }
    var duplicateObjectClassIdsArr:any[] = this.findDuplicatesInArray(selectedObjectClassIds);


    if (duplicateObjectClassIdsArr.length > 1) {
      console.log(duplicateObjectClassIdsArr);
      this.toastrService.message(
        'You selected same object classes for different annotations.\nCheck your object classes for annotations',
        'Duplicate Object Classes or Tags for annotations',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      return;
    }

    if (this.findWrongSelectionsForObjectClasses(annotations)===true) {
      this.toastrService.message(
        'You selected wrong same tags for your selected annotation.\nCheck your selected object classes and selected tags',
        'Duplicate Object Classes or Tags for annotations',
        {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        }
      );
      return;
    }
    // api post request

    var request={"annotations":annotations};

    this.httpClientService.post({fullEndPoint:"https://localhost:7107/api/annotations"},request).subscribe()


    this.toastrService.message(
      'Annotations writed to text file and saved to database successfully!',
      'Saved',
      {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      }
    );
  }

  findDuplicatesInArray(arr: any[]) {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
  }

  findWrongSelectionsForObjectClasses(annotations:any[]) {
    var wrongSelection=false;
    annotations.forEach(annotation => {
      annotation.selectedTags.forEach(tag => {
        if (annotation.id !=tag.objectClassId) {
          wrongSelection=true;
        }
      });
    });

    return wrongSelection;
  }

  removeAnnotation(
    index: number,
    annotationParams: Partial<AnnotationParameters>
  ) {
    if (index >= 0) {
      var annotations = annotationParams.boundingBox.output.annotations;
      annotations.splice(index, 1);
    }
    annotationParams.context.clearRect(
      0,
      0,
      annotationParams.canvas.width,
      annotationParams.canvas.height
    );

    annotationParams.context.drawImage(annotationParams.image, 0, 0);

    annotations.forEach((annotation) => {
      annotationParams.context.strokeRect(
        annotation.x,
        annotation.y,
        annotation.width,
        annotation.height
      );
    });
  }


   getObjectClasses(){
    return this.httpClientService.get<ObjectClass[]>({fullEndPoint:"https://localhost:7107/api/objectClasses"})
  }

   getTags(){
    return this.httpClientService.get<Tag[]>({fullEndPoint:"https://localhost:7107/api/tags"})
  }

  createTag(objectClassId:number,name:string){
    return this.httpClientService.post<Tag>({fullEndPoint:"https://localhost:7107/api/tags"},{objectClassId:objectClassId,name:name});
  }

  createObjectClass(name:string){
    return this.httpClientService.post<ObjectClass>({fullEndPoint:"https://localhost:7107/api/objectClasses"},{name:name});
  }
}

export class AnnotationParameters {
  public annotationCounter: number = 0;
  public imageUploaded: boolean;

  public canvas?: HTMLCanvasElement;
  public context?: CanvasRenderingContext2D;
  public image: HTMLImageElement;

  public fileName: string = '';

  public tags: Tag[];

  public objectClasses: ObjectClass[];

  public anyAnnotationDrawed: boolean = false;

  public boundingBox: BoundingBox;

  /**
   *
   */
  constructor(
    annotationCounter: number,
    imageUploaded: boolean,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    fileName: any,
    tags: Tag[],
    objectClasses: ObjectClass[],
    anyAnnotationDrawed: boolean,
    boundingBox: BoundingBox
  ) {
    this.annotationCounter = annotationCounter;
    this.imageUploaded = imageUploaded;
    this.canvas = canvas;
    this.context = context;
    this.image = image;
    this.fileName = fileName;
    this.tags = tags;
    this.objectClasses = objectClasses;
    this.anyAnnotationDrawed = anyAnnotationDrawed;
    this.boundingBox = boundingBox;
  }
}

export class BoundingBox {
  public output: any;
  public annotationCounter: number;
  public startPoint: any;
  public clickOnCanvas: boolean;

  constructor(
    output: any,
    annotationCounter: number,
    startPoint: any,
    clickOnCanvas: boolean
  ) {
    this.annotationCounter = annotationCounter;
    this.startPoint = startPoint;
    this.clickOnCanvas = clickOnCanvas;
    this.output = output;
  }
}
