
export default function Filtros({
    busqueda,
    setBusqueda,
    precioMaximo,
    setPrecioMaximo,
    orden,
    setOrden,
    soloFavoritos,
    setSoloFavoritos
}) {
    return (
        <section className="filtros">
            <div className="filtro">
                <label htmlFor="busqueda">
                    Buscar videojuego:
                </label>
                <input
                    id="busqueda"
                    type="search"
                    placeholder="Ej: GTA, FIFA, Minecraft..."
                    value={busqueda}
                    onChange={(evento) =>
                        setBusqueda(evento.target.value)
                    }
                />
            </div>

            <div className="filtro">
                <label htmlFor="precio-maximo">
                    Precio máximo ($):
                </label>
                <input
                    id="precio-maximo"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Sin límite"
                    value={precioMaximo}
                    onChange={(evento) =>
                        setPrecioMaximo(evento.target.value)
                    }
                />
            </div>

            <div className="filtro">
                <label htmlFor="orden">
                    Ordenar por:
                </label>
                <select
                    id="orden"
                    value={orden}
                    onChange={(evento) =>
                        setOrden(evento.target.value)
                    }
                >
                    <option value="">Orden original</option>
                    <option value="precio-asc">
                        Precio: menor a mayor
                    </option>
                    <option value="precio-desc">
                        Precio: mayor a menor
                    </option>
                    <option value="descuento-desc">
                        Mayor descuento
                    </option>
                </select>
            </div>

            <div className="filtro">
                <label className="filtro-favoritos">
                    <input
                        type="checkbox"
                        checked={soloFavoritos}
                        onChange={(evento) =>
                            setSoloFavoritos(evento.target.checked)
                        }
                    />
                    Mostrar solo favoritos
                </label>
            </div>
        </section>
    );
}
