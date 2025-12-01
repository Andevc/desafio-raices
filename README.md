# 🧮 Métodos Numéricos para Determinación de Raíces

## 📋 Descripción del Proyecto

Este proyecto implementa y compara tres métodos numéricos clásicos para encontrar raíces de ecuaciones no lineales:

- **Método de Bisección**
- **Método de Newton-Raphson**
- **Método de la Secante**

El proyecto incluye implementaciones en **Excel** (paso a paso) y una **aplicación web interactiva** que permite visualizar el proceso completo de cada método, incluyendo tablas de iteraciones y gráficos de las funciones.

---

## 📐 Ecuaciones Resueltas

### Ecuación 1
```
x³ - e^(0.8x) = 20
Dominio: [0, 8]
```

### Ecuación 2
```
3sin(0.5x) - 0.5x + 2 = 0
Dominio: [-2, 10]
```

### Ecuación 3
```
x³ - x²e^(-0.5x) - 3x = -1
Dominio: [-2, 5]
Tiene 3 raíces reales
```

### Ecuación 4
```
cos²(x) - 0.5xe^(0.3x) + 5 = 0
Dominio: [-5, 0]
```

---

## 📊 Archivos de Excel

### ✅ Características de los archivos Excel:

Cada archivo de Excel contiene:

- **Parámetros de entrada** claramente definidos (intervalos, tolerancia, valores iniciales)
- **Tabla de iteraciones completa** con todas las columnas relevantes:
  - Bisección: `a`, `b`, `c (punto medio)`, `f(a)`, `f(b)`, `f(c)`, `Error`
  - Newton-Raphson: `xₙ`, `f(xₙ)`, `f'(xₙ)`, `xₙ₊₁`, `Error`
  - Secante: `x₀`, `x₁`, `f(x₀)`, `f(x₁)`, `x₂`, `Error`

---

## 🌐 Aplicación Web Interactiva

### 🔗 Acceso a la Aplicación

**[👉 Abrir Calculadora de Métodos Numéricos](https://andevc.github.io/desafio-raices/)**

> **Nota:** Reemplaza `andevc.github.io/desafio-raices/` con el enlace de tu aplicación desplegada (GitHub Pages, Netlify, Vercel, etc.)

### Características de la Aplicación Web:

#### Funcionalidades Principales:

1. **Selección de Ecuaciones**
   - 4 ecuaciones predefinidas listas para resolver
   - Visualización clara de cada ecuación

2. **Tres Métodos Implementados**
   - Bisección (requiere intervalo [a, b])
   - Newton-Raphson (requiere valor inicial x₀)
   - Secante (requiere dos valores iniciales x₀, x₁)

3. **Configuración Personalizable**
   - Ajusta la tolerancia del error
   - Define el número máximo de iteraciones
   - Modifica los valores iniciales según tus necesidades

4. **Visualización Completa**
   - **Gráfico interactivo** de la función con línea y = 0
   - **Tabla de iteraciones** detallada mostrando cada paso del proceso
   - **Resultado final** con la raíz encontrada y error
   - **Análisis de convergencia** (número de iteraciones)

5. **Resultados en Tiempo Real**
   - Cálculo instantáneo al presionar "Calcular Raíz"
   - Visualización de todas las iteraciones
   - Indicador de convergencia exitosa o fallida

#### 💻 Tecnologías Utilizadas:

- **HTML5** - Estructura de la aplicación
- **CSS3** - Diseño moderno y responsivo
- **JavaScript Vanilla** - Lógica de los algoritmos
- **Plotly.js** - Gráficos interactivos de alta calidad


### 📈 Gráficos de Funciones

Archivo: `graficos.html` (abrirlo de forma local)

Contiene:
- ✅ Gráficos de alta calidad de las 4 ecuaciones
- ✅ Visualización de todas las raíces encontradas
- ✅ Controles interactivos para ajustar el dominio
- ✅ Análisis visual de cada función
- ✅ Exportable a PDF para reportes

---

## 🎓 Resultados y Análisis

### Comparación de Métodos

| Ecuación | Bisección | Newton-Raphson | Secante | Ganador |
|----------|-----------|----------------|---------|---------|
| **Ec. 1** | 13 iter. | 4 iter. | 4 iter. | 🏆 Newton/Secante |
| **Ec. 2** | ~15 iter. | ~5 iter. | ~5 iter. | 🏆 Newton/Secante |
| **Ec. 3** | Variable | ~4-5 iter. | ~5-6 iter. | 🏆 Newton |
| **Ec. 4** | ~12 iter. | ~5 iter. | ~6 iter. | 🏆 Newton |

### Conclusiones Generales

#### ✅ Método de Bisección
- **Ventajas:** Siempre converge, muy robusto
- **Desventajas:** Convergencia lenta (lineal)
- **Uso recomendado:** Cuando se necesita garantía absoluta de convergencia

#### ✅ Método de Newton-Raphson
- **Ventajas:** Convergencia muy rápida (cuadrática), pocas iteraciones
- **Desventajas:** Requiere calcular la derivada, puede diverger
- **Uso recomendado:** Cuando se tiene buena aproximación inicial y derivada fácil

#### ✅ Método de la Secante
- **Ventajas:** No requiere derivada, convergencia rápida (superlineal)
- **Desventajas:** Requiere dos valores iniciales, menos robusto que bisección
- **Uso recomendado:** Buen balance entre velocidad y practicidad

---

## Autor

Cristhian Andres Escobar Herrera
- Curso: Métodos Numéricos
- Institución: Universidad Mayor de San Andres
- Fecha: Noviembre 2025



## Objetivos Cumplidos

- [x] Implementación de los 3 métodos numéricos
- [x] Resolución de las 4 ecuaciones propuestas
- [x] Tablas de iteraciones completas
- [x] Gráficos de las funciones
- [x] Análisis comparativo
- [x] Documentación profesional
- [x] Aplicación web interactiva
- [x] Archivos Excel con paso a paso

