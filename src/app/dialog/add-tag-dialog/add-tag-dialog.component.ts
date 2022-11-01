import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import BaseDialog from 'src/app/base/base.dialog';

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.css']
})
export class AddTagDialogComponent extends BaseDialog<AddTagDialogComponent> {
  tag:string;
  constructor(
    dialogRef: MatDialogRef<AddTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name:string,state:AddDialogState.Yes},
  ) {
    super(dialogRef);
  }
}

export enum AddDialogState{
  No,
  Yes
}

