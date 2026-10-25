import { useEffect, useState } from "react";

import { obtenerOfertas } from "../services/api.js";
import { prepararOfertas } from "../utils/logic.js";

function mensajeDeError(error) {
    if (typeof error.status === "number") {
        return `CheapShark ha respondido con un error HTTP (${error.status}).`;
    }

    if (error instanceof TypeError) {
        return "No se ha podido conectar con CheapShark.";
    }

    return "No se han podido cargar las ofertas.";
}

export default function useOfertas() {
    const [resultado, setResultado] = useState({
        ofertas: [],
        estado: "cargando",
        error: null
    });

    const [intentoCarga, setIntentoCarga] = useState(0);

    useEffect(() => {
        const controlador = new AbortController();

        async function cargarOfertas() {
            try {
                const datos = await obtenerOfertas(
                    controlador.signal
                );

                const ofertasPreparadas = prepararOfertas(datos);

                if (!controlador.signal.aborted) {
                    setResultado({
                        ofertas: ofertasPreparadas,
                        estado: "correcto",
                        error: null
                    });
                }
            } catch (errorCapturado) {
                if (!controlador.signal.aborted) {
                    setResultado({
                        ofertas: [],
                        estado: "error",
                        error: mensajeDeError(errorCapturado)
                    });
                }
            }
        }

        cargarOfertas();

        return () => {
            controlador.abort();
        };
    }, [intentoCarga]);

    function reintentar() {
        setResultado((anterior) => ({
            ...anterior,
            estado: "cargando",
            error: null
        }));

        setIntentoCarga((actual) => actual + 1);
    }

    return {
        ofertas: resultado.ofertas,
        estado: resultado.estado,
        error: resultado.error,
        reintentar
    };
}