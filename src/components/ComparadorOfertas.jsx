export default function ComparadorOfertas({
    ofertas,
    onLimpiar
}) {
    const comparacionCompleta = ofertas.length === 2;

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
                    {ofertas.map((oferta) => (
                        <article
                            className="comparacion-tarjeta"
                            key={oferta.dealID}
                        >
                            <h3>{oferta.title}</h3>

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
                                {(
                                    oferta.normalPrice -
                                    oferta.salePrice
                                ).toFixed(2)} $
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

            {comparacionCompleta && (
                <p className="resultado-comparacion">
                    Diferencia entre precios actuales:{" "}
                    {Math.abs(
                        ofertas[0].salePrice -
                        ofertas[1].salePrice
                    ).toFixed(2)} $
                </p>
            )}
        </section>
    );
}