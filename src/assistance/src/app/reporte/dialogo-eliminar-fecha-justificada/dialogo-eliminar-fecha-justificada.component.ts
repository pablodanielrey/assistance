import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './dialogo-eliminar-fecha-justificada.component.html',
  styleUrls: ['./dialogo-eliminar-fecha-justificada.component.css']
})
export class DialogoEliminarFechaJustificadaComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarFechaJustificadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
