// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/

class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  isSequence() {
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
  }

  geraNovoCPF() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = geraDigitos(cpfSemDigitos);
    const digito2 = geraDigitos(cpfSemDigitos + digito1);

    const cpfInteiro = this.cpfLimpo + digito1 + digito2;

    return cpfInteiro === this.cpfLimpo;
  }

  static geraDigitos(cpfSemDigitos) {
    let total = 0;
    let regressivo = cpfSemDigitos.length + 1;

    for (let stringNumerica of cpfSemDigitos) {
      total += regressivo * Number(stringNumerica);
      regressivo--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : "0";
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequence()) return false;
    this.geraNovoCPF();
    return true;
  }
}

const cpf = new ValidaCPF("070.987.720-03");
if (cpf.valida) {
  console.log("CPF VÁLIDO");
} else {
  console.log("CPF VÁLIDO");
}
