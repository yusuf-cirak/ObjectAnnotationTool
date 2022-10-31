import { MatDialogRef } from "@angular/material/dialog";

 class BaseDialog<DialogComponent> {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {

  }

  close():void{
    this.dialogRef.close();
  }
}

export default BaseDialog;
