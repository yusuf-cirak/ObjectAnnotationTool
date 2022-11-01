import { AddObjectClassState } from './../dialog/add-object-class-dialog/add-object-class-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { AddObjectClassComponent } from '../dialog/add-object-class-dialog/add-object-class-dialog.component';
import { AddDialogState as AddTagDialogState, AddTagDialogComponent } from '../dialog/add-tag-dialog/add-tag-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog:MatDialog) { }


  addTag() {
    const dialogRef = this.dialog.open(AddTagDialogComponent, {
      data: {name:"",state:AddTagDialogState.No},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data!==AddTagDialogState.No) {
        // db insert
      }
    });
  }

  addObjectClass() {
    const dialogRef = this.dialog.open(AddObjectClassComponent, {
      data: {name:"",state:AddObjectClassState.No},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data!==AddObjectClassState.No) {
        // db insert
      }
    });
  }
}
