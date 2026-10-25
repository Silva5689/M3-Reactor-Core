export default function Filtros({
    filtros,
    onCambiarFiltro
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
                    value={filtros.busqueda}
                    onChange={(evento) =>
                        onCambiarFiltro(
                            "busqueda",
                            evento.target.value
                        )
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
                    value={filtros.precioMaximo}
                    onChange={(evento) =>
                        onCambiarFiltro(
                            "precioMaximo",
                            evento.target.value
                        )
                    }
                />
            </div>

            <div className="filtro">
                <label htmlFor="orden">
                    Ordenar por:
                </label>

                <select
                    id="orden"
                    value={filtros.orden}
                    onChange={(evento) =>
                        onCambiarFiltro(
                            "orden",
                            evento.target.value
                        )
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
                        checked={filtros.soloFavoritos}
                        onChange={(evento) =>
                            onCambiarFiltro(
                                "soloFavoritos",
                                evento.target.checked
                            )
                        }
                    />
                    Mostrar solo favoritos
                </label>
            </div>
        </section>
    );
}