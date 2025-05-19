function decodificarMensaje(texto) {
      while (texto.includes('(')) {
        const regex = /\(([^()]+)\)/;
        const match = texto.match(regex);
        if (!match) break;

        const fragmentoInvertido = match[1];
        const fragmentoOriginal = fragmentoInvertido.split('').reverse().join('');
        texto = texto.replace(match[0], fragmentoOriginal);
      }
      return texto;
    }

    document.getElementById('btn-decodificar').addEventListener('click', () => {
      const textoCodificado = document.getElementById('input-texto').value;
      const textoDecodificado = decodificarMensaje(textoCodificado);
      document.getElementById('output-texto').textContent = textoDecodificado;
    });

    // Mostrar resultado inicial con el texto por defecto
    document.getElementById('btn-decodificar').click();