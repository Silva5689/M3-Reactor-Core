
import { useEffect, useState } from "react";

import { obtenerOfertas } from "./services/api.js";
import {
    prepararOfertas,
    filtrarOfertas,
    filtrarPorPrecio,
    ordenarOfertas,
    calcularAhorroTotal
} from "./utils/logic.js";

import useLocalStorage from "./hooks/useLocalStorage.js";

import Filtros from "./components/Filtros.jsx";
import ListaOfertas from "./components/ListaOfertas.jsx";
import ResumenAhorro from "./components/ResumenAhorro.jsx";
import EstadoCarga from "./components/EstadoCarga.jsx";

import "./App.css";

function mensajeDeError(error) {
    if (typeof error.status === "number") {
        return `CheapShark ha respondido con un error HTTP (${error.status}).`;
    }

    if (error instanceof TypeError) {
        return "No se ha podido conectar con CheapShark.";
    }

    return "No se han podido cargar las ofertas.";
}

export default function App() {
    // Estado de las ofertas
    const [ofertas, setOfertas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [intentoCarga, setIntentoCarga] = useState(0);

    // Estado de los filtros
    const [busqueda, setBusqueda] = useState("");
    const [precioMaximo, setPrecioMaximo] = useState("");
    const [orden, setOrden] = useState("");
    const [soloFavoritos, setSoloFavoritos] = useState(false);

    // Bonus: favoritos guardados en localStorage
    const [favoritos, setFavoritos] = useLocalStorage(
        "favoritosCheapShark",
        []
    );

    const favoritosValidos = Array.isArray(favoritos)
        ? favoritos
        : [];

    // Una única carga para el inicio y los reintentos
    useEffect(() => {
        let activo = true;

        async function cargarOfertas() {
            try {
                const datos = await obtenerOfertas();
                const preparadas = prepararOfertas(datos);

                if (activo) {
                    setOfertas(preparadas);
                }
            } catch (errorCapturado) {
                if (activo) {
                    setOfertas([]);
                    setError(mensajeDeError(errorCapturado));
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarOfertas();

        return () => {
            activo = false;
        };
    }, [intentoCarga]);

    // El botón solicita una nueva carga
    function reintentar() {
        setCargando(true);
        setError(null);
        setIntentoCarga((actual) => actual + 1);
    }

    // Añadir o quitar un favorito sin modificar el array original
    function alternarFavorito(dealID) {
        setFavoritos((actuales) => {
            const lista = Array.isArray(actuales)
                ? actuales
                : [];

            if (lista.includes(dealID)) {
                return lista.filter((id) => id !== dealID);
            }

            return [...lista, dealID];
        });
    }

    // Valores derivados: no necesitan estado propio
    const filtradas = filtrarOfertas(ofertas, busqueda);
    const porPrecio = filtrarPorPrecio(filtradas, precioMaximo);

    const ofertasFavoritas = soloFavoritos
        ? porPrecio.filter((oferta) =>
            favoritosValidos.includes(oferta.dealID)
        )
        : porPrecio;

    const ofertasVisibles = ordenarOfertas(ofertasFavoritas, orden);
    const ahorroTotal = calcularAhorroTotal(ofertasVisibles);

    return (
        <main className="contenedor-principal">
            <header className="cabecera">
                <h1>Ofertas de videojuegos</h1>
                <p>
                    Encuentra descuentos de videojuegos con CheapShark.
                </p>
            </header>

            <Filtros
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                precioMaximo={precioMaximo}
                setPrecioMaximo={setPrecioMaximo}
                orden={orden}
                setOrden={setOrden}
                soloFavoritos={soloFavoritos}
                setSoloFavoritos={setSoloFavoritos}
            />

            <EstadoCarga
                cargando={cargando}
                error={error}
                onReintentar={reintentar}
            />

            {!cargando && !error && (
                <>
                    <p className="contador-ofertas">
                        Mostrando {ofertasVisibles.length} de{" "}
                        {ofertas.length} ofertas.
                    </p>

                    <ResumenAhorro total={ahorroTotal} />

                    <ListaOfertas
                        ofertas={ofertasVisibles}
                        favoritos={favoritosValidos}
                        onAlternarFavorito={alternarFavorito}
                    />
                </>
            )}
        </main>
    );
}
