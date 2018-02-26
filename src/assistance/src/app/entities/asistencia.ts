import { Usuario } from './usuario';


export class Reloj {
  id: string;
  nombre: string;
  descripcion: string;
  modelo: string;
  marca: string;
  ip: string;
  mascara: string;
  router: string;
  algoritmo: string;
  zona_horaria: string;
  activo: boolean = true;
  url_api: string;
}

export class Justificacion {
  id: string;
  tipo: string;
  codigo: string;
  descripcion: string;
  nombre: string;
  general: boolean;
}

export class FechaJustificada {
  fecha: Date;
  usuario: Usuario;
  justificacion: Justificacion;
}

export class Marcacion {
  marcacion: Date;
  tipo: number;
  reloj: Reloj;
}

export class Horario {
  fecha_valido: Date = null;
  dia_semanal: number;
  hora_entrada: number;
  hora_salida: number;
  eliminado: Date = null;
}

export class Detalle {

}

export class RenglonReporte {

  fecha: Date;
  horario: Horario;
  marcaciones: Marcacion[];
  entrada: Marcacion;
  salida: Marcacion;
  cantidad_horas_trabajadas: number;
  justifcacion: FechaJustificada;

}

export class Reporte {

  usuario: Usuario;
  fecha_inicial: Date;
  fecha_final: Date;
  reportes: RenglonReporte[] = [];
  detalle: Detalle;

}
