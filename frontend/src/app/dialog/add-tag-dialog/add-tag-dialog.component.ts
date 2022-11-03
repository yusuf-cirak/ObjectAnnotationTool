import { AppComponent } from './../../app.component';
import { ObjectClass } from './../../contracts/objectClass';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import BaseDialog from 'src/app/base/base.dialog';

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.css']
})
export class AddTagDialogComponent extends BaseDialog<AddTagDialogComponent> {


objectClasses:ObjectClass[]

  constructor(
    dialogRef: MatDialogRef<AddTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:AddTagDialogData,
  ) {
    super(dialogRef);
  }
}

export class AddTagDialogData{
  selectedObjectClassId:number
  name:string
  state:AddTagDialogState=AddTagDialogState.No

  constructor(selectedObjectClassId:number,name:string,state:AddTagDialogState) {
    this.selectedObjectClassId=selectedObjectClassId;
    this.name=name;
    this.state=state;
  }
}

export enum AddTagDialogState{
  No,
  Yes
}

