const CLAVE_CACHE = "ofertasCheapShark";
const DURACION_CACHE = 10 * 60 * 1000;

export async function obtenerOfertas(signal) {
    // Si la petición ya fue cancelada, no continuamos
    if (signal?.aborted) {
        throw new DOMException("Petición cancelada", "AbortError");
    }

    // Intentamos recuperar ofertas de la caché
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

    // Si no hay caché válida, consultamos CheapShark
    const respuesta = await fetch(
        "https://www.cheapshark.com/api/1.0/deals?onSale=1&pageSize=20",
        { signal }
    );

    if (!respuesta.ok) {
        const error = new Error("Error al consultar CheapShark");
        error.status = respuesta.status;
        throw error;
    }

    const ofertas = await respuesta.json();

    // Guardamos el resultado solamente si sigue activo
    if (!signal?.aborted) {
        try {
            localStorage.setItem(
                CLAVE_CACHE,
                JSON.stringify({
                    fecha: Date.now(),
                    ofertas
                })
            );
        } catch (error) {
            console.warn("No se pudo guardar la caché:", error);
        }
    }

    return ofertas;
}