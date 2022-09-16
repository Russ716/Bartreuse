

export const Bottle = ({ getAllBottles, bottleObject, currentUser }) => {


    return <section className="bottle" key={`bottle--${bottleObject.id}`}>
        <header>{bottleObject.brand} {bottleObject.name}</header>
        <footer className="emergency" ><b>Quantity:</b> {bottleObject.quantity ? `${bottleObject.quantity}` : "🚨"} <b>Par:</b> {bottleObject.par}</footer>
        {
            <button onClick={() => {
                fetch(`http://localhost:8088/bottles/${bottleObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllBottles()
                    })
            }} className="bottle__Delete" > ^ Delete ^ </button >
        }
    </section>
}
