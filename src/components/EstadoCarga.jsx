
export default function EstadoCarga({
    cargando,
    error,
    onReintentar
}) {
    if (cargando) {
        return (
            <div className="estado-carga" role="status">
                <p>Cargando ofertas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="estado-error" role="alert">
                <p>{error}</p>

                <button type="button" onClick={onReintentar}>
                    Reintentar
                </button>
            </div>
        );
    }

    return null;
}
