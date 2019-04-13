import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportacionesService {
  /*
  * Service para la exportacion de datos en XLSX,PDF y mas...
  */

  constructor() { }

  public exportarJsonAExcel(json: any[], excelFileName: string): void {
    /*
    * Crea un XLSX desde un JSON obtenido por parametros y con nombre de archivo excelFileName.
    */
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public exportarArregloAExcel(datos: any[], excelFileName: string): void {
    /*
    * Crea un XLSX desde un arreglo de arreglos obtenido por parametros y con nombre de archivo excelFileName.
    * Cada linea del XLSX es un arreglo donde las cada elemento del arreglo es una columna del XLSX
    */
    let wb = XLSX.utils.book_new();
    let ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb,ws,'Reporte');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
