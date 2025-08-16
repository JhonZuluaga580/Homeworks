function verificarParidadRegular(x) {
  if (x % 2 === 0) {
    console.log(`${x} es par`);
  } else {
    console.log(`${x} es impar`);
  }
}

verificarParidadRegular(4); // 4 es par
verificarParidadRegular(7); // 7 es impar


const verificarParidadFlecha = (x) => {console.log(x % 2 === 0 ? `${x} es par` : `${x} es impar`)}

verificarParidadFlecha(8); // 8 es par
verificarParidadFlecha(5); // 5 es impar