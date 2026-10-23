
import TarjetaOferta from "./TarjetaOferta.jsx";

export default function ListaOfertas({
    ofertas,
    favoritos,
    onAlternarFavorito
}) {
    if (ofertas.length === 0) {
        return <p>No se han encontrado ofertas.</p>;
    }

    return (
        <section className="lista-ofertas">
            {ofertas.map((oferta) => (
                <TarjetaOferta
                    key={oferta.dealID}
                    oferta={oferta}
                    esFavorita={favoritos.includes(oferta.dealID)}
                    onAlternarFavorito={onAlternarFavorito}
                />
            ))}
        </section>
    );
}
