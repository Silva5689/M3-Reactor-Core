const CLAVE_CACHE = "ofertasCheapShark";
const DURACION_CACHE = 10 * 60 * 1000;

export async function obtenerOfertas() {

    try {
        const guardado = localStorage.getItem(CLAVE_CACHE);

        if (guardado) {
            const cache = JSON.parse(guardado);

            if (
                Array.isArray(cache.ofertas) &&
                typeof cache.fecha === "number" &&
                Date.now() - cache.fecha < DURACION_CACHE
            ) {
                return cache.ofertas;
            }
        }

    } catch (error) {
        console.warn("No se pudo leer la caché:", error);
    }

    const respuesta = await fetch(
        "https://www.cheapshark.com/api/1.0/deals?onSale=1&pageSize=20"
    );

    if (!respuesta.ok) {

        const error = new Error("Error al consultar CheapShark");

        error.status = respuesta.status;

        throw error;
    }

    const ofertas = await respuesta.json();

    try {
        localStorage.setItem(CLAVE_CACHE, JSON.stringify({
            fecha: Date.now(),
            ofertas: ofertas
        }));

    } catch (error) {
        console.warn("No se pudo guardar la caché:", error);
    }

    return ofertas;
}