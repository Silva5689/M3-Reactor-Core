
export default function TarjetaOferta({
    oferta,
    esFavorita,
    onAlternarFavorito
}) {
    return (
        <article className="tarjeta-oferta">
            {oferta.thumb && (
                <img
                    src={oferta.thumb}
                    alt={oferta.title}
                    className="tarjeta-imagen"
                />
            )}

            <h3>{oferta.title}</h3>

            <p>Precio: {oferta.salePrice.toFixed(2)} $</p>
            <p>Antes: {oferta.normalPrice.toFixed(2)} $</p>
            <p>Descuento: {oferta.savings.toFixed(0)} %</p>

            <button
                type="button"
                className="boton-favorito"
                aria-pressed={esFavorita}
                onClick={() => onAlternarFavorito(oferta.dealID)}
            >
                {esFavorita
                    ? "♥ Quitar de favoritos"
                    : "♡ Añadir a favoritos"}
            </button>

            {oferta.dealID && (
                <a
                    href={`https://www.cheapshark.com/redirect?dealID=${encodeURIComponent(oferta.dealID)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-oferta"
                >
                    Ver oferta
                </a>
            )}
        </article>
    );
}
