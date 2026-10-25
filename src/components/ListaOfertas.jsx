import TarjetaOferta from "./TarjetaOferta.jsx";

export default function ListaOfertas({
    ofertas,
    favoritos,
    onAlternarFavorito,
    seleccionados,
    onAlternarComparacion,
    mensajeVacio
}) {
    if (ofertas.length === 0) {
        return (
            <p className="mensaje-vacio">
                {mensajeVacio}
            </p>
        );
    }

    return (
        <section className="lista-ofertas">
            {ofertas.map((oferta) => (
                <TarjetaOferta
                    key={oferta.dealID}
                    oferta={oferta}
                    esFavorita={
                        favoritos.includes(oferta.dealID)
                    }
                    onAlternarFavorito={onAlternarFavorito}
                    seleccionadaComparacion={
                        seleccionados.includes(oferta.dealID)
                    }
                    onAlternarComparacion={onAlternarComparacion}
                    comparacionLlena={
                        seleccionados.length >= 2
                    }
                />
            ))}
        </section>
    );
}