import { useState, useEffect } from "react";

export default function useLocalStorage(
    clave,
    valorInicial,
    validar = () => true
) {
    const [valor, setValor] = useState(() => {
        try {
            const guardado = localStorage.getItem(clave);

            if (guardado !== null) {
                const dato = JSON.parse(guardado);

                if (validar(dato)) {
                    return dato;
                }
            }
        } catch (error) {
            console.warn("Error al leer localStorage:", error);
        }

        return valorInicial;
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                clave,
                JSON.stringify(valor)
            );
        } catch (error) {
            console.warn("Error al guardar en localStorage:", error);
        }
    }, [clave, valor]);

    return [valor, setValor];
}