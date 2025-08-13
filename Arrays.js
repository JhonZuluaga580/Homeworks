// ================================
//   MÉTODOS ESTÁTICOS DE ARRAY
// ================================

console.log("=== Métodos Estáticos ===");

// Crea un array a partir de un iterable
console.log("Array.from:", Array.from("UAO"));

// Verifica si es un array
console.log("Array.isArray:", Array.isArray([10, 20]));

// Crea un array con los argumentos dados
console.log("Array.of:", Array.of(5, 10, 15));

// Convierte un iterable a array de forma asíncrona (ES2023)
(async () => {
  console.log("Array.fromAsync:", await Array.fromAsync([1, 2, 3]));
})();


// ================================
//   AGREGAR / ELIMINAR ELEMENTOS
// ================================

console.log("\n=== Agregar / Eliminar ===");
let numeros = [2, 4, 6];

numeros.push(8); // Agrega al final
console.log("push:", numeros);

numeros.pop(); // Elimina el último
console.log("pop:", numeros);

numeros.unshift(0); // Agrega al inicio
console.log("unshift:", numeros);

numeros.shift(); // Elimina el primero
console.log("shift:", numeros);

// splice: elimina o inserta
numeros.splice(1, 1, 99); // Reemplaza el segundo elemento por 99
console.log("splice:", numeros);

// with (ES2023): crea una copia con un valor cambiado
let numerosEditados = numeros.with(0, 42);
console.log("with:", numerosEditados);

// toSpliced (ES2023): como splice pero no modifica el original
let nuevaLista = numeros.toSpliced(0, 1);
console.log("toSpliced:", nuevaLista, "Original:", numeros);


// ================================
//   ACCESO / BÚSQUEDA
// ================================

console.log("\n=== Acceso / Búsqueda ===");
let datos = [10, 20, 30, 40, 50];

console.log("at:", datos.at(-1)); // Último elemento
console.log("includes:", datos.includes(20));
console.log("indexOf:", datos.indexOf(30));
console.log("lastIndexOf:", [1, 2, 3, 2].lastIndexOf(2));

console.log("find:", datos.find(x => x > 25)); // Primer valor mayor a 25
console.log("findIndex:", datos.findIndex(x => x > 25));
console.log("findLast:", datos.findLast(x => x > 25)); // Último mayor a 25
console.log("findLastIndex:", datos.findLastIndex(x => x > 25));

console.log("concat:", datos.concat([60, 70])); // Une arrays
console.log("slice:", datos.slice(1, 4)); // Extrae una parte


// ================================
//   ITERACIÓN / TRANSFORMACIÓN
// ================================

console.log("\n=== Iteración / Transformación ===");
let base = [1, 2, 3, 4];

base.forEach(num => console.log("forEach:", num * 2)); // Solo recorre

console.log("map:", base.map(num => num ** 2)); // Crea nuevo array

console.log("filter:", base.filter(num => num % 2 === 0)); // Filtra pares

console.log("reduce:", base.reduce((acum, num) => acum + num, 0)); // Suma

console.log("reduceRight:", base.reduceRight((acum, num) => acum - num, 0));

console.log("every:", base.every(num => num > 0)); // Todos cumplen

console.log("some:", base.some(num => num > 3)); // Alguno cumple

console.log("flat:", [1, [2, [3]]].flat(2)); // Aplana array
console.log("flatMap:", base.flatMap(num => [num, num * 10])); // Mapea y aplana

console.log("keys:", [...base.keys()]); // Índices
console.log("values:", [...base.values()]); // Valores
console.log("entries:", [...base.entries()]); // Pares índice-valor


// ================================
//   ORDEN / COPIA
// ================================

console.log("\n=== Orden / Copia ===");
let letras = ["c", "a", "b"];
letras.sort(); // Ordena alfabéticamente
console.log("sort:", letras);

letras.reverse(); // Invierte el orden
console.log("reverse:", letras);

// toSorted (ES2023): ordena sin modificar el original
let copiaOrdenada = letras.toSorted();
console.log("toSorted:", copiaOrdenada, "Original:", letras);

// toReversed (ES2023): invierte sin modificar
let copiaInvertida = letras.toReversed();
console.log("toReversed:", copiaInvertida, "Original:", letras);

// fill: rellena con un valor
let numeros2 = [1, 2, 3, 4];
numeros2.fill(0, 1, 3);
console.log("fill:", numeros2);

// copyWithin: copia parte del array sobre sí mismo
let copiaDentro = [10, 20, 30, 40, 50];
copiaDentro.copyWithin(0, 3);
console.log("copyWithin:", copiaDentro);


// ================================
//   CONVERSIÓN A STRING
// ================================

console.log("\n=== Conversión a String ===");
let palabras = ["Hola", "mundo"];
console.log("join:", palabras.join(" ")); // Une con separador
console.log("toString:", palabras.toString()); // Convierte a string
console.log("toLocaleString:", palabras.toLocaleString()); // Formato local
