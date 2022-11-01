import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import BaseDialog from 'src/app/base/base.dialog';

@Component({
  selector: 'app-add-object-class-dialog',
  templateUrl: './add-object-class-dialog.component.html',
  styleUrls: ['./add-object-class-dialog.component.css']
})
export class AddObjectClassComponent extends BaseDialog<AddObjectClassComponent> {
  tag:string;
  constructor(
    dialogRef: MatDialogRef<AddObjectClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{name:string,state:AddObjectClassDialogState.No},
  ) {
    super(dialogRef);
  }
}

export enum AddObjectClassDialogState{
  No,
  Yes
}

