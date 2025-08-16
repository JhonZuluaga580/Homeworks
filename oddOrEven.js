function verificarParidadRegular(numero) {
  if (numero % 2 === 0) {
    console.log(`${numero} es par`);
  } else {
    console.log(`${numero} es impar`);
  }
}

verificarParidadRegular(4); // 4 es par
verificarParidadRegular(7); // 7 es impar


const verificarParidadFlecha = numero => console.log(numero % 2 === 0 ? `${numero} es par` : `${numero} es impar`);

verificarParidadFlecha(8); // 8 es par
verificarParidadFlecha(5); // 5 es impar