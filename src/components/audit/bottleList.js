// * Current Bottle List, lists all current bottles in bar

/*
exports and displays a list of the bottles in permanent state, database.bottles
adds a delete button to each row, to remove from database. 
adds edit button for each row, to change par or other information.
*/
// ! fix delete on Bottlle.js

import "./bottles.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Bottle } from "./bottlle"


export const BottleList = ({ searchTermState }) => {
    const [bottles, setBottles] = useState([])
    const [filteredBottles, setFiltered] = useState([])
    const [users, setUsers] = useState([])
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const getAllBottles = () => {
        fetch(`http://localhost:8088/bottles?_expand=container&_expand=user`)
            .then(response => response.json())
            .then((bottleArray) => {
                setBottles(bottleArray)
            })
    }
    useEffect(
        () => {
            fetch(`http://localhost:8088/bottles?_expand=container&_expand=user`)
                .then(response => response.json())
                .then((bottleArray) => {
                    setBottles(bottleArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(() => {
        fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((userArray) => {
                setUsers(userArray)
            })
    },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const myUser = users.filter(user => user.id === honeyUserObject.id)
            if (myUser[0]?.isOwner === true) {
                // !for bar owner
                setFiltered(bottles)
            }
            else {
                // !for inventory auditors
                const myBottles = bottles.filter(bottle => bottle.userId === honeyUserObject.id)
                setFiltered(myBottles)
            }
        },
        [bottles]
    )

    return <>
        <h3>List of bottles</h3>
        <article className="bottleList">
            {
                filteredBottles.map(
                    (bottle) => <Bottle
                        key={`bottle--${bottle.id}`}
                        getAllBottles={getAllBottles}
                        bottleObject={bottle}
                        currentUser={honeyUserObject} />
                )
            }

        </article>
    </>
}
