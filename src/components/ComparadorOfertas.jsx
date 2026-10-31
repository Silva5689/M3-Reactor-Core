import {
    calcularAhorroOferta,
    compararPrecios
} from "../utils/logic.js";

export default function ComparadorOfertas({
    ofertas,
    onLimpiar
}) {
    const comparacionCompleta = ofertas.length === 2;

    const comparacion = comparacionCompleta
        ? compararPrecios(ofertas[0], ofertas[1])
        : null;

    return (
        <section className="comparador-ofertas">
            <div className="cabecera-comparador">
                <div>
                    <h2>Comparador de videojuegos</h2>
                    <p>
                        Seleccionados: {ofertas.length} de 2
                    </p>
                </div>

                {ofertas.length > 0 && (
                    <button
                        type="button"
                        className="boton-limpiar"
                        onClick={onLimpiar}
                    >
                        Limpiar comparación
                    </button>
                )}
            </div>

            {ofertas.length === 0 && (
                <p>
                    Selecciona dos videojuegos utilizando
                    el botón Comparar de sus tarjetas.
                </p>
            )}

            {ofertas.length > 0 && (
                <div className="comparacion-lista">
                    {ofertas.map((oferta, indice) => (
                        <article
                            className={
                                comparacion?.indiceMasBarato === indice
                                    ? "comparacion-tarjeta comparacion-tarjeta--mas-barata"
                                    : "comparacion-tarjeta"
                            }
                            key={oferta.dealID}
                        >
                            <h3>{oferta.title}</h3>

                            {comparacion?.indiceMasBarato === indice && (
                                <p className="etiqueta-mejor-precio">
                                    Precio más bajo
                                </p>
                            )}

                            <p>
                                Precio actual:{" "}
                                {oferta.salePrice.toFixed(2)} $
                            </p>

                            <p>
                                Precio original:{" "}
                                {oferta.normalPrice.toFixed(2)} $
                            </p>

                            <p>
                                Descuento:{" "}
                                {oferta.savings.toFixed(0)} %
                            </p>

                            <p>
                                Ahorras:{" "}
                                {calcularAhorroOferta(oferta).toFixed(2)} $
                            </p>
                        </article>
                    ))}
                </div>
            )}

            {ofertas.length === 1 && (
                <p>
                    Selecciona otro videojuego para
                    completar la comparación.
                </p>
            )}

            {comparacion && (
                <div className="resultado-comparacion">
                    <p>
                        Diferencia entre precios actuales:{" "}
                        {comparacion.diferencia.toFixed(2)} $
                    </p>
                    <p>
                        {comparacion.indiceMasBarato === null
                            ? "Ambos videojuegos tienen el mismo precio actual."
                            : `Más barato: ${ofertas[comparacion.indiceMasBarato].title}`}
                    </p>
                </div>
            )}
        </section>
    );
}
