function validRut(rut) {
  if (!rut || rut.trim().length < 3) return false;
  const rutLimpio = rut.replace(/[^0-9kK-]/g, "");

  if (rutLimpio.length < 3) return false;
  const num = parseInt(rut.slice(0, -1), 10);
  const dgv = rut.toString().split("").reverse()[0];
  const dvCalc = calculateDV(num);
  return dvCalc === dgv;
}

function calculateDV(rut) {
  const cuerpo = `${rut}`;
  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;

  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    const index = multiplo * cuerpo.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma += index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo += 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  const dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 10) return "k";
  if (dvEsperado === 11) return "0";
  return `${dvEsperado}`;
}

export { validRut, calculateDV };
