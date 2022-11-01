import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { AddObjectClassComponent } from '../dialog/add-object-class-dialog/add-object-class-dialog.component';
import { AddTagDialogComponent } from '../dialog/add-tag-dialog/add-tag-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog:MatDialog) { }


  addTag() {
    const dialogRef = this.dialog.open(AddTagDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((e) => {
      alert(e);
    });
  }

  addObjectClass() {
    const dialogRef = this.dialog.open(AddObjectClassComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((e) => {
      alert(e);
    });
  }
}
