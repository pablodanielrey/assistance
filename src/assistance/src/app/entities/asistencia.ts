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

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}

export class Justificacion {
  id: string;
  tipo: string;
  codigo: string;
  descripcion: string;
  nombre: string;
  general: boolean;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}

export class FechaJustificada {
  fecha: Date;
  usuario: Usuario;
  justificacion: Justificacion;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}

export class Marcacion {
  marcacion: Date;
  tipo: number;
  reloj: Reloj;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.marcacion = (this.marcacion == null ? null : new Date(this.marcacion));
    } catch(e) {
      console.log(e);
    }
  }
}

export class Horario {
  fecha_valido: Date = null;
  dia_semanal: number;
  hora_entrada: number;
  hora_salida: number;
  eliminado: Date = null;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.fecha_valido = (this.fecha_valido == null ? null : new Date(this.fecha_valido));
    } catch(e) {
      console.log(e);
    }
  }
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

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      if (this.fecha != null) {
        // "fecha" = 'yyyy-mm-dd'
        // el mes del Date empieza desde 0 (0-11)
        let f = o["fecha"].split("-");
        this.fecha = new Date(f[0], f[1] - 1, f[2]);
      }
      this.horario = (this.horario == null) ? null : new Horario(this.horario);
      this.marcaciones = (this.marcaciones == null) ? [] : this.marcaciones.map(m => new Marcacion(m));
      this.entrada = (this.entrada == null) ? null : new Marcacion(this.entrada);
      this.salida = (this.salida == null) ? null : new Marcacion(this.salida);
    } catch(e) {
      console.log(e);
    }
  }
}

export class Reporte {

  usuario: Usuario;
  fecha_inicial: Date;
  fecha_final: Date;
  reportes: Array<RenglonReporte>;
  detalle: Detalle;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
      this.fecha_inicial = (this.fecha_inicial == null ? null : new Date(this.fecha_inicial));
      this.fecha_final = (this.fecha_final == null ? null : new Date(this.fecha_final));
      this.reportes = (this.reportes == null) ? [] : this.reportes.map(r => new RenglonReporte(r));
    } catch(e) {
      console.log(e);
    }
  }
}

export class Asistencia {
  actualizado: string;
  creado: string;
  id: string;
}

export class DatosAsistencia {
  agregado: boolean;
  asistencia: Asistencia;
  usuario: Usuario;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}



export class DatosHorario {
  horarios:  Array<Horario>;
  usuario: Usuario;

  constructor(o:Object) {
    try {
      Object.assign(this, o);
    } catch(e) {
      console.log(e);
    }
  }
}
