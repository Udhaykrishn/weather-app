export interface WeatherData {
    main: {
      temp: number
      humidity: number
    }
    name: string
    wind: {
      speed: number
    }
  }