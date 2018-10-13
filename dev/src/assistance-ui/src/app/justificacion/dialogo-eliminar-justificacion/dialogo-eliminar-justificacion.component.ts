import { Component, Inject } from '@angular/core';

import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './dialogo-eliminar-justificacion.component.html',
  styleUrls: ['./dialogo-eliminar-justificacion.component.css']
})
export class DialogoEliminarJustificacionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoEliminarJustificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}
