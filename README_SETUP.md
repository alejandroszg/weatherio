# Guía de Configuración - Weatherio

## Configuración de la API Key

### 1. Obtener tu API Key de WeatherStack

1. Ve a [WeatherStack](https://weatherstack.com/)
2. Regístrate para obtener una API key gratuita
3. Copia tu API key del dashboard

### 2. Configurar los Archivos de Environment

Los archivos de configuración ya fueron creados automáticamente:
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

**Edita ambos archivos** y reemplaza `'YOUR_API_KEY_HERE'` con tu API key real:

```typescript
export const environment = {
  production: false,
  weatherApiKey: 'TU_API_KEY_AQUI',  // <- Reemplaza esto
  weatherApiUrl: 'http://api.weatherstack.com/current',
};
```

### 3. Verificar que los archivos están ignorados por Git

Los archivos con tu API key **NO deben ser commiteados**. Verifica que tu `.gitignore` contiene:

```
# Angular environment files
/src/environments/environment.ts
/src/environments/environment.development.ts
```

### 4. Instalar dependencias y ejecutar

```bash
npm install
npm start
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── weather-header/      # Header con búsqueda
│   │   ├── weather-hero/        # Tarjeta principal del clima
│   │   └── weather-list/        # Lista de pronóstico
│   ├── models/
│   │   └── weather.interface.ts # Interfaces de TypeScript
│   ├── services/
│   │   └── weather.service.ts   # Servicio con API calls
│   └── app.config.ts            # Configuración de providers
└── environments/
    ├── environment.example.ts    # Plantilla (commiteada)
    ├── environment.ts           # Tu config local (NO commitear)
    └── environment.development.ts # Tu config dev (NO commitear)
```

## Características del Servicio de Weather

### Estados de Loading

El servicio proporciona dos formas de acceder al estado de carga:

```typescript
// Opción 1: Observable (RxJS)
weatherService.loading$.subscribe(isLoading => {
  console.log('Loading:', isLoading);
});

// Opción 2: Signal (Angular moderno)
const loading = weatherService.isLoading();
```

### Manejo de Errores

El servicio maneja automáticamente:
- Errores de conexión
- API key inválida
- Ciudad no encontrada
- Límite de solicitudes alcanzado
- Errores del servidor de WeatherStack

```typescript
weatherService.error$.subscribe(error => {
  if (error) {
    console.log('Error:', error.message);
    console.log('Tipo:', error.type);
    console.log('Código:', error.code);
  }
});
```

### Uso del Servicio

```typescript
import { WeatherService } from './services/weather.service';

constructor(private weatherService: WeatherService) {}

searchCity(city: string) {
  this.weatherService.getCurrentWeather(city).subscribe({
    next: (weather) => {
      console.log('Datos del clima:', weather);
    },
    error: (error) => {
      console.error('Error:', error.message);
    }
  });
}
```

## Seguridad y Consideraciones

### ⚠️ Importante: API Keys en Frontend

Las aplicaciones Angular (o cualquier SPA) se ejecutan en el navegador del usuario, por lo que:

1. **Tu API key será visible** en el código JavaScript compilado
2. Cualquier persona puede abrir DevTools y ver las llamadas al API
3. Los archivos `environment.ts` **NO están protegidos** en producción

### Recomendaciones de Seguridad

**Para desarrollo:**
- Usa una API key con cuota limitada
- Configura restricciones de dominio en WeatherStack (si disponible)
- NO commitees tus archivos de environment

**Para producción:**
- Implementa un backend proxy que:
  - Almacene la API key de forma segura
  - Reciba requests de tu frontend
  - Haga las llamadas al API de WeatherStack
  - Retorne los datos al frontend

```
Frontend → Tu Backend → WeatherStack API
            (API key segura aquí)
```

### Arquitectura Recomendada para Producción

```typescript
// Backend (Node.js/Express ejemplo)
app.get('/api/weather/:city', async (req, res) => {
  const apiKey = process.env.WEATHERSTACK_API_KEY; // Segura
  const city = req.params.city;

  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
  );

  res.json(await response.json());
});

// Frontend
getCurrentWeather(city: string) {
  return this.http.get(`/api/weather/${city}`); // Sin API key
}
```

## Limitaciones del Plan Gratuito

- **250 requests/mes**
- Solo HTTP (HTTPS en planes pagos)
- Datos de clima actuales (no históricos ni pronósticos extendidos)
- Sin soporte comercial

## Recursos Adicionales

- [Documentación de WeatherStack](https://weatherstack.com/documentation)
- [Angular HttpClient](https://angular.dev/guide/http)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- [Angular Signals](https://angular.dev/guide/signals)

## Solución de Problemas

### Error: "API key no proporcionada o inválida"
- Verifica que reemplazaste `YOUR_API_KEY_HERE` en los archivos de environment
- Asegúrate de que tu API key es válida en WeatherStack

### Error: "No se pudo conectar con el servidor"
- Verifica tu conexión a internet
- El plan gratuito usa HTTP (no HTTPS)

### Error: "Ciudad no encontrada"
- Verifica la ortografía de la ciudad
- Intenta con el nombre en inglés
- Usa formato: "Ciudad, País" (ej: "Santiago, Chile")

### El servicio no hace llamadas HTTP
- Verifica que `provideHttpClient()` está en `app.config.ts`
- Revisa la consola del navegador para errores

## Comandos Útiles

```bash
# Desarrollo
npm start                    # Inicia servidor de desarrollo

# Producción
npm run build               # Compila para producción
npm run build -- --configuration production

# Testing
npm test                    # Ejecuta tests

# Linting
ng lint                     # (si está configurado)
```

## Próximos Pasos

1. Conectar el servicio con los componentes
2. Implementar la búsqueda en el header
3. Mostrar datos reales en weather-hero
4. Agregar caché para reducir llamadas al API
5. Implementar manejo visual de estados de loading y error
6. Considerar backend proxy para producción
