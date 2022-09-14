// ! New Bottle
// ? Transient State:
// * Text input fields
// * Checkbox for openable
// * Save Button sends to database

/*
TODO input fields for: 

Brand Name
Drink Name
Drink Style
Vendor.type
Par Level
Cost per unit
! dropdown Container
! openable checkbox
? Full weight if box is checked
& Button to save from transient state to permanent in database.bottles.
*/

import { useNavigate } from "react-router"
import React, { useState, useEffect } from "react"
export const NewBottleForm = () => {
    const [bottle, update] = useState({
        brand: "",
        drink: "",
        cost: "",
        par: (0),
        typeId: (0)
    })
    const [vendors, updateTypes] = useState([])
    useEffect(
        () => {
            fetch('http://localhost:8088/vendors')
                .then(response => response.json())
                .then((vendorsArray) => {
                    updateTypes(vendorsArray)
                })
        },
        []
    )
    const navigate = useNavigate()

    const justSendIt = (event) => {
        event.preventDefault()
        const bottleToSendToAPI = {
            typeId: bottle.typeId,
            brand: bottle.brand,
            drink: bottle.drink,
            cost: bottle.cost,
            par: bottle.par,
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
                navigate("/bottleList")

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
                    <label htmlFor="productCost">Unit Cost:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="What's that cost ?"
                        value={bottle.cost}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.cost = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Bottle Par:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How many should we have on hand?"
                        value={bottle.par}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.par = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="typeList">
                <label htmlFor="type">Vendor:</label>
                {vendors.map(
                    (vendor) => {
                        return <div className="form-group">
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = { ...bottle }
                                        copy.typeId = evt.target.value
                                        update(copy)
                                    }
                                } type="checkbox" value={vendor.id} name="type" />{vendor.name}, {vendor.contact}, {vendor.type}
                        </div>
                    }
                )}
            </fieldset>
            <button
                onClick={(clickEvent) => justSendIt(clickEvent)}
                className="form-button">
                Send Bottle
            </button>
        </form>
    )
}