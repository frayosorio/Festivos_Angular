import { Component } from '@angular/core';
import { FestivosService } from './servicios/festivos.service';
import { FestivoDto } from './entidades/festivo-dto';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Festivos';

  public fechaSeleccionada: any;
  public ano: number = new Date().getFullYear();
  public columnas = [
    { name: 'Festivo', prop: 'festivo' },
    { name: 'Fecha', prop: 'fecha' },
  ];
  public festivos: FestivoDto[] = [];

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;
  public festivoSeleccion: FestivoDto | undefined;

  constructor(
    private festivosService: FestivosService,

  ) {
  }

  public validarFecha() {
    let fecha = new Date(this.fechaSeleccionada);
    this.festivosService.verificarFecha(fecha).subscribe(
      respuesta => {
        window.alert(respuesta);
      }
    );
  }

  public obtenerFestivos() {
    this.festivosService.obtenerFestivos(this.ano)
      .subscribe(data => {
        this.festivos = data;
        /*
        this.festivos = data.map(festivo => {
          window.alert(festivo.fecha);
          const [año, mes, dia] = festivo.fecha.toDateString().split('-').map(Number);
          return new FestivoDto(festivo.festivo, new Date(año, mes - 1, dia));
        });
        */
      },
        err => {
          window.alert(err.message)
        });
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.festivoSeleccion = event.row;
    }
  }

}
