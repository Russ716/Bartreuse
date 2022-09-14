// * Current Bottle List, lists all current bottles in bar

/*
exports and displays a list of the bottles in permanent state, database.bottles
adds a delete button to each row, to remove from database. 
adds edit button for each row, to change par or other information.
*/

import "./bottles.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BottleList = ({ searchTermState }) => {
    const [bottles, setBottles] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/bottles`)
                .then(response => response.json())
                .then((bottleArray) => {
                    setBottles(bottleArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        <h2>List of bottles</h2>
        <article className="bottles">
            {
                bottles.map(
                    (bottle) => {
                        return <section className="bottle" key={`bottle--${bottle.id}`}>
                            <header>{bottle.brand} {bottle.drink}</header>
                            <footer className="emergency" ><b>Quantity:</b> {bottle.quantity ? `${bottle.quantity}` : "🚨"} <b>Par:</b> {bottle.par}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}