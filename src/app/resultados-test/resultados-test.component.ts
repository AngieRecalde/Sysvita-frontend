import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { TestService, ResultadoTest } from './../service/test.service';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { MapaUbigeoService } from '../service/mapaubigeo.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resultados-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './resultados-test.component.html',
  styleUrl: './resultados-test.component.css',
  host: { 'ngSkipHydration': '' }
})
export class ResultadosTestComponent implements OnInit, AfterViewInit {
  resultados: ResultadoTest[] = [];
  filteredResultados: ResultadoTest[] = [];
  private map: any;
  private heatLayer: any;
  private isBrowser: boolean;

  filterForm = new FormGroup({
    fecha: new FormControl(''),
    nombre_test: new FormControl(''),
    nombre_nivel: new FormControl('')
  });

  constructor(
    private testService: TestService,
    private router: Router,
    private mapaUbigeoService: MapaUbigeoService,
    private datePipe: DatePipe,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadResultados();
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMap();
      this.loadHeatmapData();
    }
  }
  nombre_test

  private async initMap(): Promise<void> {
    const heatmapDiv = document.getElementById('heatmap');
    console.log('Heatmap div:', heatmapDiv);
    if (heatmapDiv) {
      const L = await import('leaflet');
      await import('leaflet.heat');
      this.map = L.map('heatmap').setView([-9.189967, -75.015152], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    } else {
      console.error('Heatmap div no encontrado');
    }
  }

  private loadHeatmapData(): void {
    this.mapaUbigeoService.getHeatmapData().subscribe(async data => {
      console.log('Heatmap data:', data);
      const L = await import('leaflet');
      
      // Limpiar capas existentes
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.LayerGroup) {
          layer.clearLayers();
        }
      });

      // Filtrar los datos según los filtros actuales
      const filteredData = this.filterData(data);

      // Crear capas para cada color
      const redLayer = L.layerGroup();
      const yellowLayer = L.layerGroup();
      const greenLayer = L.layerGroup();

      filteredData.forEach((d: any) => {
        let radius: number;
        let fillColor: string;
        let fillOpacity: number;
        let layer: L.LayerGroup;

        switch (d.color) {
          case "#FF0000":
            fillColor = "red";
            radius = 20;
            fillOpacity = 0.5;
            layer = redLayer;
            break;
          case "#FFFF00":
            fillColor = "yellow";
            radius = 30;
            fillOpacity = 0.5;
            layer = yellowLayer;
            break;
          case "#00FF00":
            fillColor = "green";
            radius = 45;
            fillOpacity = 0.5;
            layer = greenLayer;
            break;
          default:
            fillColor = "blue";
            radius = 20;
            fillOpacity = 0.5;
            layer = L.layerGroup().addTo(this.map);
        }

        L.circleMarker([d.latitud, d.longitud], {
          radius: radius,
          fillColor: fillColor,
          color: fillColor,
          weight: 1,
          opacity: 1,
          fillOpacity: fillOpacity
        }).addTo(layer)
          .bindPopup(`Usuario: ${d.nombres} ${d.apellidos}<br>Nivel: ${d.nombre_nivel}`);
      });

      // Añadir todas las capas al mapa
      redLayer.addTo(this.map);
      yellowLayer.addTo(this.map);
      greenLayer.addTo(this.map);

      // Ajustar la vista del mapa para que se vean todos los puntos
      if (filteredData.length > 0) {
        const bounds = L.latLngBounds(filteredData.map((d: any) => [d.latitud, d.longitud]));
        this.map.fitBounds(bounds);
      }
    });
  }

  private filterData(data: any[]): any[] {
    const filters = this.filterForm.value;
    return data.filter(d => {
      let match = true;
      if (filters.fecha) {
        const filterDate = this.datePipe.transform(new Date(filters.fecha), 'yyyy-MM-dd');
        const itemDate = this.datePipe.transform(new Date(d.fecha_realizacion), 'yyyy-MM-dd');
        match = match && filterDate === itemDate;
      }
      if (filters.nombre_test) {
        match = match && d.nombre_test === filters.nombre_test;
      }
      if (filters.nombre_nivel) {
        match = match && d.nivel === filters.nombre_nivel;
      }
      return match;
    });
  }

  loadResultados() {
    this.testService.getResultadosEspecialista().subscribe(
      (data) => {
        this.resultados = data;
        this.applyFilters(); // Aplicar filtros iniciales
      },
      (error) => {
        console.error('Error fetching resultados:', error);
      }
    );
  }

  applyFilters() {
    this.filteredResultados = this.filterData(this.resultados);
    this.updateHeatmap();
  }

  updateHeatmap() {
    if (this.isBrowser) {
      this.loadHeatmapData();
    }
  }

  actualizarEvaluacion(id_resultado: number) {
    this.router.navigate(['/evaluacion-especialista', id_resultado]);
  }
}