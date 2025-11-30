// Definición de ecuaciones
const equations = {
    1: {
        name: "x³ - e^(0.8x) = 20",
        f: (x) => Math.pow(x, 3) - Math.exp(0.8 * x) - 20,
        df: (x) => 3 * Math.pow(x, 2) - 0.8 * Math.exp(0.8 * x),
        domain: [0, 8]
    },
    2: {
        name: "3sin(0.5x) - 0.5x + 2 = 0",
        f: (x) => 3 * Math.sin(0.5 * x) - 0.5 * x + 2,
        df: (x) => 1.5 * Math.cos(0.5 * x) - 0.5,
        domain: [-2, 10]
    },
    3: {
        name: "x³ - x²e^(-0.5x) - 3x = -1",
        f: (x) => Math.pow(x, 3) - Math.pow(x, 2) * Math.exp(-0.5 * x) - 3 * x + 1,
        df: (x) => 3 * Math.pow(x, 2) - 2 * x * Math.exp(-0.5 * x) + 0.5 * Math.pow(x, 2) * Math.exp(-0.5 * x) - 3,
        domain: [-2, 5]
    },
    4: {
        name: "cos²(x) - 0.5xe^(0.3x) + 5 = 0",
        f: (x) => Math.pow(Math.cos(x), 2) - 0.5 * x * Math.exp(0.3 * x) + 5,
        df: (x) => -2 * Math.cos(x) * Math.sin(x) - 0.5 * Math.exp(0.3 * x) - 0.15 * x * Math.exp(0.3 * x),
        domain: [-5, 0]
    }
};

// Variables globales
let selectedEquation = 1;
let selectedMethod = 'bisection';

// Elementos del DOM
const equationSelect = document.getElementById('equationSelect');
const methodSelect = document.getElementById('methodSelect');
const equationDisplay = document.getElementById('equationDisplay');
const intervalGroup = document.getElementById('intervalGroup');
const initialGuessGroup = document.getElementById('initialGuessGroup');
const initialGuessLabel = document.getElementById('initialGuessLabel');
const x1Input = document.getElementById('x1');
const solveButton = document.getElementById('solveButton');
const resultDisplay = document.getElementById('resultDisplay');
const iterationsPanel = document.getElementById('iterationsPanel');

// Event Listeners
equationSelect.addEventListener('change', (e) => {
    selectedEquation = parseInt(e.target.value);
    updateEquationDisplay();
    generateGraph();
});

methodSelect.addEventListener('change', (e) => {
    selectedMethod = e.target.value;
    updateMethodInputs();
});

solveButton.addEventListener('click', solve);

// Inicialización
updateEquationDisplay();
updateMethodInputs();
generateGraph();

// Funciones de UI
function updateEquationDisplay() {
    equationDisplay.textContent = equations[selectedEquation].name;
}

function updateMethodInputs() {
    if (selectedMethod === 'bisection') {
        intervalGroup.style.display = 'block';
        initialGuessGroup.style.display = 'none';
    } else if (selectedMethod === 'newton') {
        intervalGroup.style.display = 'none';
        initialGuessGroup.style.display = 'block';
        initialGuessLabel.textContent = 'Valor Inicial (x₀)';
        x1Input.style.display = 'none';
    } else if (selectedMethod === 'secant') {
        intervalGroup.style.display = 'none';
        initialGuessGroup.style.display = 'block';
        initialGuessLabel.textContent = 'Valores Iniciales (x₀, x₁)';
        x1Input.style.display = 'block';
    }
}

function generateGraph() {
    const eq = equations[selectedEquation];
    const [start, end] = eq.domain;
    const points = 200;
    const step = (end - start) / points;
    
    const xValues = [];
    const yValues = [];
    
    for (let x = start; x <= end; x += step) {
        xValues.push(x);
        yValues.push(eq.f(x));
    }
    
    const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: 'f(x)',
        line: { color: '#667eea', width: 2 }
    };
    
    const trace2 = {
        x: [start, end],
        y: [0, 0],
        type: 'scatter',
        mode: 'lines',
        name: 'y = 0',
        line: { color: '#ef4444', width: 2, dash: 'dash' }
    };
    
    const layout = {
        title: equations[selectedEquation].name,
        xaxis: { title: 'x' },
        yaxis: { title: 'f(x)' },
        showlegend: true,
        margin: { t: 50, b: 50, l: 60, r: 30 }
    };
    
    Plotly.newPlot('graph', [trace1, trace2], layout, { responsive: true });
}

// Métodos numéricos
function bisectionMethod(f, a, b, tol, maxIter) {
    const iterations = [];
    let fa = f(a);
    let fb = f(b);

    if (fa * fb > 0) {
        return { error: "La función debe tener signos opuestos en los extremos del intervalo" };
    }

    for (let i = 0; i < maxIter; i++) {
        const c = (a + b) / 2;
        const fc = f(c);
        const error = Math.abs(b - a) / 2;

        iterations.push({
            iteration: i + 1,
            a: a.toFixed(6),
            b: b.toFixed(6),
            c: c.toFixed(6),
            fc: fc.toFixed(6),
            error: error.toFixed(6)
        });

        if (Math.abs(fc) < tol || error < tol) {
            return { root: c, iterations, converged: true };
        }

        if (f(a) * fc < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    return { root: (a + b) / 2, iterations, converged: false };
}

function newtonRaphsonMethod(f, df, x0, tol, maxIter) {
    const iterations = [];
    let x = x0;

    for (let i = 0; i < maxIter; i++) {
        const fx = f(x);
        const dfx = df(x);

        if (Math.abs(dfx) < 1e-10) {
            return { error: "Derivada muy cercana a cero" };
        }

        const xNew = x - fx / dfx;
        const error = Math.abs(xNew - x);

        iterations.push({
            iteration: i + 1,
            x: x.toFixed(6),
            fx: fx.toFixed(6),
            dfx: dfx.toFixed(6),
            xNew: xNew.toFixed(6),
            error: error.toFixed(6)
        });

        if (error < tol || Math.abs(fx) < tol) {
            return { root: xNew, iterations, converged: true };
        }

        x = xNew;
    }

    return { root: x, iterations, converged: false };
}

function secantMethod(f, x0, x1, tol, maxIter) {
    const iterations = [];

    for (let i = 0; i < maxIter; i++) {
        const fx0 = f(x0);
        const fx1 = f(x1);

        if (Math.abs(fx1 - fx0) < 1e-10) {
            return { error: "División por cero en el método de la secante" };
        }

        const x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);
        const error = Math.abs(x2 - x1);

        iterations.push({
            iteration: i + 1,
            x0: x0.toFixed(6),
            x1: x1.toFixed(6),
            fx0: fx0.toFixed(6),
            fx1: fx1.toFixed(6),
            x2: x2.toFixed(6),
            error: error.toFixed(6)
        });

        if (error < tol || Math.abs(f(x2)) < tol) {
            return { root: x2, iterations, converged: true };
        }

        x0 = x1;
        x1 = x2;
    }

    return { root: x1, iterations, converged: false };
}

// Función principal de resolución
function solve() {
    const eq = equations[selectedEquation];
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    const maxIterations = parseInt(document.getElementById('maxIterations').value);
    
    let result;
    
    if (selectedMethod === 'bisection') {
        const a = parseFloat(document.getElementById('intervalA').value);
        const b = parseFloat(document.getElementById('intervalB').value);
        result = bisectionMethod(eq.f, a, b, tolerance, maxIterations);
    } else if (selectedMethod === 'newton') {
        const x0 = parseFloat(document.getElementById('x0').value);
        result = newtonRaphsonMethod(eq.f, eq.df, x0, tolerance, maxIterations);
    } else if (selectedMethod === 'secant') {
        const x0 = parseFloat(document.getElementById('x0').value);
        const x1 = parseFloat(document.getElementById('x1').value);
        result = secantMethod(eq.f, x0, x1, tolerance, maxIterations);
    }
    
    displayResults(result);
}

function displayResults(result) {
    if (result.error) {
        resultDisplay.innerHTML = `
            <div class="result-box result-error">
                <p class="result-title">Error:</p>
                <p class="result-detail">${result.error}</p>
            </div>
        `;
        iterationsPanel.style.display = 'none';
        return;
    }
    
    const eq = equations[selectedEquation];
    const convergenceWarning = !result.converged ? 
        '<p class="result-detail warning">⚠️ No convergió dentro del número máximo de iteraciones</p>' : '';
    
    resultDisplay.innerHTML = `
        <div class="result-box result-success">
            <p class="result-title">Raíz encontrada: x ≈ ${result.root.toFixed(6)}</p>
            <p class="result-detail">f(x) ≈ ${eq.f(result.root).toFixed(8)}</p>
            <p class="result-detail">Iteraciones: ${result.iterations.length}</p>
            ${convergenceWarning}
        </div>
    `;
    
    displayIterationsTable(result.iterations);
}

function displayIterationsTable(iterations) {
    const table = document.getElementById('iterationsTable');
    let headers = '<thead><tr><th>Iteración</th>';
    
    if (selectedMethod === 'bisection') {
        headers += '<th>a</th><th>b</th><th>c</th><th>f(c)</th><th>Error</th>';
    } else if (selectedMethod === 'newton') {
        headers += '<th>xₙ</th><th>f(xₙ)</th><th>f\'(xₙ)</th><th>xₙ₊₁</th><th>Error</th>';
    } else if (selectedMethod === 'secant') {
        headers += '<th>x₀</th><th>x₁</th><th>f(x₀)</th><th>f(x₁)</th><th>x₂</th><th>Error</th>';
    }
    
    headers += '</tr></thead>';
    
    let rows = '<tbody>';
    iterations.forEach(iter => {
        rows += `<tr><td>${iter.iteration}</td>`;
        
        if (selectedMethod === 'bisection') {
            rows += `<td>${iter.a}</td><td>${iter.b}</td><td>${iter.c}</td><td>${iter.fc}</td><td>${iter.error}</td>`;
        } else if (selectedMethod === 'newton') {
            rows += `<td>${iter.x}</td><td>${iter.fx}</td><td>${iter.dfx}</td><td>${iter.xNew}</td><td>${iter.error}</td>`;
        } else if (selectedMethod === 'secant') {
            rows += `<td>${iter.x0}</td><td>${iter.x1}</td><td>${iter.fx0}</td><td>${iter.fx1}</td><td>${iter.x2}</td><td>${iter.error}</td>`;
        }
        
        rows += '</tr>';
    });
    rows += '</tbody>';
    
    table.innerHTML = headers + rows;
    iterationsPanel.style.display = 'block';
}
