// ! New Audit Count
// ? Transient State:
// * text input fields
// * Dropdown for Container
// * Save button sends to database
// * List shows current audit from database

/*
input fields for: 
drink name
quantity (full)
optional weight if open
! location dropdown
container
% of full, open
save button
list of stuff entered so far, in order. 
button to route to bottleOrder. 
*/

import { useNavigate } from "react-router"
import React, { useState, useEffect } from "react"
export const InventoryAudit = () => {
    const [bottle, update] = useState({
        brand: "",
        drink: "",
        quantity: (0),
        percentage: (0),
        containerType: (0)
    })
    const [bottles, updateBottles] = useState([])
    const [locations, updateLocations] = useState([])
    const [containers, updateContainer] = useState([])
    const [openableBottles, setOpenable] = useState(false)
    useEffect(
        () => {
            fetch('http://localhost:8088/locations')
                .then(response => response.json())
                .then((locationsArray) => {
                    updateLocations(locationsArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch('http://localhost:8088/containers')
                .then(response => response.json())
                .then((containersArray) => {
                    updateContainer(containersArray)
                })
        },
        []
    )
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

    const navigate = useNavigate()

    const justSendIt = (event) => {
        event.preventDefault()
        const bottleToSendToAPI = {
            containerType: bottle.containerType,
            brand: bottle.brand,
            drink: bottle.drink,
            quantity: bottle.quantity,
            percentage: bottle.percentage,
        }
        return fetch('http://localhost:8088/bottles', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bottleToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/InventoryAudit")
            })
    }
    return (
        <form className="productForm">
            <h2 className="productForm_title">Create New Bottle</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Brand Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name that new bottle..."
                        value={bottle.brand}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.brand = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Drink Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name that new bottle..."
                        value={bottle.drink}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.drink = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productQuantity">Unit quantity:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="How many fulls?"
                        value={bottle.quantity}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.quantity = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <button onClick={() => {
                    setOpenable(!openableBottles)
                }}>{
                        openableBottles
                            ? <fieldset>

                                <div className="form-group">
                                    <label htmlFor="name">Bottle percentage:</label>
                                    <input
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder="How full is that open bottle?"
                                        value={bottle.percentage}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...bottle }
                                                copy.percentage = evt.target.value
                                                update(copy)
                                            }
                                        } />
                                </div>
                            </fieldset>
                            : "This bottle is less than full."
                    }
                </button>
            </fieldset>

            <fieldset className="typeList">
                <label htmlFor="type">Container type:</label>
                {containers.map(
                    (container) => {
                        return <div className="form-group" key={`container--${container.id}`} >
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = { ...bottle }
                                        copy.containerType = container.id
                                        update(copy)
                                    }
                                } type="radio" value={container.id} name="type" />{container.material} {container.name}, {container.sizeML} mL,
                        </div>
                    }
                )}
            </fieldset>

            <li>
                <select className="locations">
                    <option value="">Where counted?</option>
                    {locations.map(
                        location => {
                            return <option key={`location--${location.id}`} value={`${location.id}`}>{location.description}</option>
                        }
                    )
                    }
                </select>
            </li>
            <button
                onClick={(clickEvent) => justSendIt(clickEvent)}
                className="form-button">
                Send Bottle
            </button>
            <article className="bottlesCounted">
                {bottles.map(
                    bottle => {
                        return <section className="ticket" key={`bottle--${bottle.id}`}>
                            <header>{bottle.brand} {bottle.drink}</header>
                            <footer className="emergency" ><b>Quantity</b>: {bottle.quantity}</footer>
                        </section>
                    }
                )
                }
            </article>

        </form>
    )
}
/*
"id": 3,
    //   "userId": 5,
    //   "vendorId": 2,
    //   "brand": "Del Sol",
    //   "name": "Réjane",
    //   "containerId": 3,
    //   "quantity": 76,
    //   "open": true,
      "openBottleId": 3,
    //   "cost": "$14.07",
    //   "price": "$5.71",
    //  "locationId": 2,
    //   "par": 40
*/