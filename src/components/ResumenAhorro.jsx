export default function ResumenAhorro({ total }) {
    return (
        <section className="resumen-ahorro">
            <h2>Ahorro potencial</h2>
            <p>{total.toFixed(2)} $</p>
        </section>
    );
}
