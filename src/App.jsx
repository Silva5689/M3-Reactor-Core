
import { useState } from "react";

import {
    filtrarOfertas,
    filtrarPorPrecio,
    ordenarOfertas,
    calcularAhorroTotal
} from "./utils/logic.js";

import useOfertas from "./hooks/useOfertas.js";
import useLocalStorage from "./hooks/useLocalStorage.js";

import Filtros from "./components/Filtros.jsx";
import ListaOfertas from "./components/ListaOfertas.jsx";
import ResumenAhorro from "./components/ResumenAhorro.jsx";
import EstadoCarga from "./components/EstadoCarga.jsx";
import ComparadorOfertas from "./components/ComparadorOfertas.jsx";

import "./App.css";

export default function App() {
    // Consulta a CheapShark
    const {
        ofertas,
        estado,
        error,
        reintentar
    } = useOfertas();

    // Estado de los filtros
    const [filtros, setFiltros] = useState({
        busqueda: "",
        precioMaximo: "",
        orden: "",
        soloFavoritos: false
    });

    // Favoritos guardados en localStorage
    const [favoritos, setFavoritos] = useLocalStorage(
        "favoritosCheapShark",
        [],
        Array.isArray
    );

    // Videojuegos seleccionados para comparar
    const [seleccionados, setSeleccionados] = useState([]);

    // Actualizar un filtro
    function cambiarFiltro(nombre, valor) {
        setFiltros((anteriores) => ({
            ...anteriores,
            [nombre]: valor
        }));
    }

    // Añadir o quitar un videojuego de favoritos
    function alternarFavorito(dealID) {
        setFavoritos((actuales) => {
            if (actuales.includes(dealID)) {
                return actuales.filter(
                    (id) => id !== dealID
                );
            }

            return [...actuales, dealID];
        });
    }

    // Seleccionar o quitar videojuegos del comparador
    function alternarComparacion(dealID) {
        setSeleccionados((actuales) => {
            if (actuales.includes(dealID)) {
                return actuales.filter(
                    (id) => id !== dealID
                );
            }

            if (actuales.length >= 2) {
                return actuales;
            }

            return [...actuales, dealID];
        });
    }

    // Vaciar el comparador
    function limpiarComparacion() {
        setSeleccionados([]);
    }

    // Filtrar y ordenar las ofertas
    // Son valores derivados, no necesitan useState
    const filtradas = filtrarOfertas(
        ofertas,
        filtros.busqueda
    );

    const porPrecio = filtrarPorPrecio(
        filtradas,
        filtros.precioMaximo
    );

    const ofertasFavoritas = filtros.soloFavoritos
        ? porPrecio.filter((oferta) =>
            favoritos.includes(oferta.dealID)
        )
        : porPrecio;

    const ofertasVisibles = ordenarOfertas(
        ofertasFavoritas,
        filtros.orden
    );

    // Calcular el ahorro de las ofertas visibles
    const ahorroTotal = calcularAhorroTotal(
        ofertasVisibles
    );

    // Obtener los videojuegos seleccionados para comparar
    const ofertasComparadas = seleccionados
        .map((id) =>
            ofertas.find((oferta) => oferta.dealID === id)
        )
        .filter(Boolean);

    // Mensaje dependiendo de por qué no hay resultados
    let mensajeVacio;

    if (ofertas.length === 0) {
        mensajeVacio = "No hay ofertas disponibles.";
    } else if (filtros.soloFavoritos) {
        mensajeVacio = "No hay favoritos que coincidan con los filtros.";
    } else {
        mensajeVacio = "No hay videojuegos que coincidan con los filtros.";
    }

    return (
        <main className="contenedor-principal">
            <header className="cabecera">
                <h1>Ofertas de videojuegos</h1>

                <p>
                    Encuentra descuentos de videojuegos
                    con CheapShark.
                </p>
            </header>

            <Filtros
                filtros={filtros}
                onCambiarFiltro={cambiarFiltro}
            />

            <EstadoCarga
                cargando={estado === "cargando"}
                error={error}
                onReintentar={reintentar}
            />

            {estado === "correcto" && (
                <>
                    <p className="contador-ofertas">
                        Mostrando {ofertasVisibles.length} de{" "}
                        {ofertas.length} ofertas.
                    </p>

                    <ResumenAhorro total={ahorroTotal} />

                    <ComparadorOfertas
                        ofertas={ofertasComparadas}
                        onLimpiar={limpiarComparacion}
                    />

                    <ListaOfertas
                        ofertas={ofertasVisibles}
                        favoritos={favoritos}
                        onAlternarFavorito={alternarFavorito}
                        seleccionados={seleccionados}
                        onAlternarComparacion={alternarComparacion}
                        mensajeVacio={mensajeVacio}
                    />
                </>
            )}
        </main>
    );
}
