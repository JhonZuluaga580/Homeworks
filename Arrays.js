// ================================
//   MÉTODOS ESTÁTICOS DE ARRAY
// ================================

console.log("=== Métodos Estáticos ===");

console.log("Array.from:", Array.from("UAO"));
console.log("Array.isArray:", Array.isArray([10, 20]));
console.log("Array.of:", Array.of(5, 10, 15));

(async () => {
  console.log("Array.fromAsync:", await Array.fromAsync([1, 2, 3]));
})();


// ================================
//   AGREGAR / ELIMINAR ELEMENTOS
// ================================

console.log("\n=== Agregar / Eliminar ===");
let numeros = [2, 4, 6];

console.log("push:", numeros.push(8), numeros);
console.log("pop:", numeros.pop(), numeros);
console.log("unshift:", numeros.unshift(0), numeros);
console.log("shift:", numeros.shift(), numeros);

numeros.splice(1, 1, 99);
console.log("splice:", numeros);

let numerosEditados = numeros.with(0, 42);
console.log("with:", numerosEditados);

let nuevaLista = numeros.toSpliced(0, 1);
console.log("toSpliced:", nuevaLista, "Original:", numeros);


// ================================
//   ACCESO / BÚSQUEDA
// ================================

console.log("\n=== Acceso / Búsqueda ===");
let datos = [10, 20, 30, 40, 50];

console.log("at:", datos.at(-1));
console.log("includes:", datos.includes(20));
console.log("indexOf:", datos.indexOf(30));
console.log("lastIndexOf:", [1, 2, 3, 2].lastIndexOf(2));

console.log("find:", datos.find(x => x > 25));
console.log("findIndex:", datos.findIndex(x => x > 25));
console.log("findLast:", datos.findLast(x => x > 25));
console.log("findLastIndex:", datos.findLastIndex(x => x > 25));

console.log("concat:", datos.concat([60, 70]));
console.log("slice:", datos.slice(1, 4));


// ================================
//   ITERACIÓN / TRANSFORMACIÓN
// ================================

console.log("\n=== Iteración / Transformación ===");
let base = [1, 2, 3, 4];

base.forEach(num => console.log("forEach:", num * 2));
console.log("map:", base.map(num => num ** 2));
console.log("filter:", base.filter(num => num % 2 === 0));
console.log("reduce:", base.reduce((acum, num) => acum + num, 0));
console.log("reduceRight:", base.reduceRight((acum, num) => acum - num, 0));
console.log("every:", base.every(num => num > 0));
console.log("some:", base.some(num => num > 3));
console.log("flat:", [1, [2, [3]]].flat(2));
console.log("flatMap:", base.flatMap(num => [num, num * 10]));
console.log("keys:", [...base.keys()]);
console.log("values:", [...base.values()]);
console.log("entries:", [...base.entries()]);


// ================================
//   ORDEN / COPIA
// ================================

console.log("\n=== Orden / Copia ===");
let letras = ["c", "a", "b"];
letras.sort();
console.log("sort:", letras);

letras.reverse();
console.log("reverse:", letras);

let copiaOrdenada = letras.toSorted();
console.log("toSorted:", copiaOrdenada, "Original:", letras);

let copiaInvertida = letras.toReversed();
console.log("toReversed:", copiaInvertida, "Original:", letras);

let numeros2 = [1, 2, 3, 4];
numeros2.fill(0, 1, 3);
console.log("fill:", numeros2);

let copiaDentro = [10, 20, 30, 40, 50];
copiaDentro.copyWithin(0, 3);
console.log("copyWithin:", copiaDentro);


// ================================
//   CONVERSIÓN A STRING
// ================================

console.log("\n=== Conversión a String ===");
let palabras = ["Hola", "mundo"];
console.log("join:", palabras.join(" "));
console.log("toString:", palabras.toString());
console.log("toLocaleString:", palabras.toLocaleString());
