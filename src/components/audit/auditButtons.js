import { useState, useEffect } from "react"

export const GenerateOrder = () => {
    const [bottles, updateBottles] = useState([])
    const [filteredBottles, setFiltered] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/bottles')
                .then(response => response.json())
                .then((bottleArray) => {
                    updateBottles(bottleArray)
                })
        },
        []
    )
    useEffect(() => {
        const orderBottle = bottles.filter(bottle => bottle.quantity < bottle.par)
        setFiltered(orderBottle)
    }, [bottles])

    return filteredBottles.map(
        (bottle) => {
            if (parseInt(bottle.quantity) < parseInt(bottle.par)) {
                let orderNumber = parseInt(bottle.par) - parseInt(bottle.quantity)
                return <section className="order" key={`order--${bottle.id}`}>
                    <header>{bottle.brand} {bottle.name}</header>
                    <footer className="amount" ><b>Quantity: {bottle.quantity}</b> 
                        <i>Par: {bottle.par} </i> 
                        <b>Order ≥ {orderNumber}</b></footer>
                </section>
            }
        }
    )
}
