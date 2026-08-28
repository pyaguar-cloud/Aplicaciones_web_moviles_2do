class Calculadora {
    // adentro va todo lo que tiene y hace

    constructor(operacionPreviaElemento, operacionActualElemento) {
        this.operacionActualElemento = operacionActualElemento
        this.operacionPreviaElemento = operacionPreviaElemento
        this.limpiar()
    }

    limpiar() {
        this.operacionActual = ''
        this.operacionPrevia = ''
        this.operador = undefined
    }

    borrar() {
        this.operacionActual = this.operacionActual.toString().slice(0, -1)
    }

    agregarNumero(numero) {
        if (numero === '.' && this.operacionActual.includes('.')) return;
        this.operacionActual = this.operacionActual.toString() + numero.toString();
    }

    elegirOperador(operador) {
        if (this.operacionActual === '') return;
        if (this.operacionPrevia !== '') {
            this.calcular();
        }
        this.operador = operador;
        this.operacionPrevia = this.operacionActual;
        this.operacionActual = '';
    }

    calcular() {
        let resultado;
        const previo = parseFloat(this.operacionPrevia)
        const actual = parseFloat(this.operacionActual)

        if (isNaN(previo) || isNaN(actual)) return;

        switch (this.operador) {
            case '+':
                resultado = previo + actual;
                break;
            case '-':
                resultado = previo - actual;
                break;
            case '×':
                resultado = previo * actual
                break;
            case '÷':
                if (actual === 0) {
                    alert("NO se puede dividir entre cero");
                    this.limpiar();
                    return;
                }
                resultado = previo / actual
                break;
            default:
                return;

        }
        this.operacionActual = resultado;
        this.operador = undefined;
        this.operacionPrevia = '';
    }

    obtenerNumeroFormato(numero) {
        const cadenaNumero = numero.toString();
        const numeroEntero = parseFloat(cadenaNumero.split('.')[0]);
        const numeroDecimal = cadenaNumero.split('.')[1];

        let mostrarEntero;
        if (isNaN(numeroEntero)) {
            mostrarEntero = '';
        } else {
            mostrarEntero = numeroEntero.toLocaleString('es', { maximumFractionDigits: 0 });
        }
        if (numeroDecimal != null) {
            return `${mostrarEntero}.${numeroDecimal}`
        } else {
            return mostrarEntero;
        }
    }

    actualizarPantalla() {
        this.operacionActualElemento.innerText = this.obtenerNumeroFormato(this.operacionActual)

        if (this.operador != null) {
            this.operacionPreviaElemento.innerText = `${this.obtenerNumeroFormato(this.operacionPrevia)} ${this.operador}`;
        } else {
            this.operacionPreviaElemento.innerText = ''
        }
    }


}

//conectar la clase calculadora con el html
//seleccionar los botones y elementos que necesitamos
const botonesNumero = document.querySelectorAll('[data-numero]')
const botonesOperador = document.querySelectorAll('[data-operacion]')
const botonIgual = document.querySelector('[data-igual]')
const botonBorrar = document.querySelector('[data-borrar]')
const botonTodo = document.querySelector('[data-todo]')
const operacionPreviaElemento = document.querySelector('[data-operacion-previa]')
const operacionActualElemento = document.querySelector('[data-operacion-actual]')

const calculadoraInstancia1 = new Calculadora(operacionActualElemento, operacionPreviaElemento);

// Cuando se hace clic en un numero, agregar y actualizar pantalla
botonesNumero.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadoraInstancia1.agregarNumero(boton.innerText);
        calculadoraInstancia1.actualizarPantalla();
    })
})

// Cuando se hace clic en un operador
botonesOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadoraInstancia1.elegirOperador(boton.innerText);
        calculadoraInstancia1.actualizarPantalla();
    })
})

// boton igual
botonIgual.addEventListener('click', () => {
    calculadoraInstancia1.calcular()
    calculadoraInstancia1.actualizarPantalla();

})

//boton AC (borra todo)
botonTodo.addEventListener('click', () => {
    calculadoraInstancia1.limpiar()
    calculadoraInstancia1.actualizarPantalla();
})
// boton DEL (borra un digito)
botonBorrar.addEventListener('click', () => {
    calculadoraInstancia1.borrar()
    calculadoraInstancia1.actualizarPantalla();
})