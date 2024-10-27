export interface Weather {
  mediaTemperatura: number;
  unidadTemperatura: string;
  probPrecipitacion: Precipitation[];
}

export interface Precipitation {
  probabilidad: number;
  periodo: string;
}
