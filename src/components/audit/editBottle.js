
import { useNavigate, useParams } from "react-router-dom"

import React, { useState, useEffect } from "react"
export const EditBottle = ({ getAllBottles, bottleObject, currentUser }) => {
    const { bottleId } = useParams()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [bottle, update] = useState({
        brand: "",
        name: "",
        cost: 0,
        price: 0,
        par: 0,
        vendorId: 0,
        userId: 0,
        containerId: 0,
        quantity: 0,
        open: false,
        location: "",
    })
    const [containers, updateContainer] = useState([])
    const [openableBottles, setOpenable] = useState(false)
    const [vendors, updateTypes] = useState([])
    const [locations, updateLocations] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/bottles/${bottleId}`)
                .then(response => response.json())
                .then((data) => {
                    update(data)
                })
        }, [bottleId]
    )

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
    const navigate = useNavigate()
    const openBottle = () => {
        setOpenable(!openableBottles)
        if (openableBottles) {
            const copy = { ...bottle }
            copy.open = true
            update(copy)
        } else {
            const copy = { ...bottle }
            copy.open = false
            update(copy)
        }
    }

    const justEditIt = (event) => {
        event.preventDefault()
        const bottleToSendToAPI = {
            userId: honeyUserObject.id,
            vendorId: bottle.vendorId,
            brand: bottle.brand,
            name: bottle.name,
            containerId: bottle.containerId,
            quantity: bottle.quantity,
            open: bottle.open,
            cost: bottle.cost,
            price: bottle.price,
            location: bottle.location,
            par: bottle.par,
        }
        return fetch(`http://localhost:8088/bottles/${bottleId}`, {
            method: "PUT",
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
            <h3 className="productForm_title">Edit this Bottle</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Brand Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="change the brand..."
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
                        placeholder="Name that bottle..."
                        value={bottle.name}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.name = evt.target.value
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
                    <label htmlFor="productPrice">Unit price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="How much should we charge ?"
                        value={bottle.price}
                        onChange={
                            (evt) => {
                                const copy = { ...bottle }
                                copy.price = evt.target.value
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
                        placeholder="How many do we have?"
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
                <label htmlFor="type">Container type:</label>
                {containers.map(
                    (container) => {
                        return <div className="form-group" key={`container--${container.id}`} >
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = { ...bottle }
                                        copy.containerId = container.id
                                        update(copy)
                                    }
                                } type="radio" checked value={container.id} name="type" />
                            {container.material} {container.name}, {container.sizeML} mL,
                        </div>
                    }
                )}
            </fieldset>
            <fieldset>
                <button onClick={(clickEvent) => {
                    clickEvent.preventDefault()
                    openBottle()
                }}> This bottle will be poured
                </button>
            </fieldset >
            <li>
                <select className="locations">
                    <option value="">Where should it be stored?</option>
                    {locations.map(
                        location => {
                            return <option
                                onChange={
                                    (evt) => {
                                        const copy = { ...bottle }
                                        copy.locationId = location.id
                                        update(copy)
                                    }
                                } key={`location--${location.id}`} defaultValue={`${location.id}`} value={`${location.id}`}>
                                {location.description}</option>
                        }
                    )
                    }
                </select>
            </li>
            <fieldset className="typeList">
                <label htmlFor="type">Vendor:</label>
                {vendors.map(
                    (vendor) => {
                        return <div className="form-group" key={vendor.id}>
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = { ...bottle }
                                        copy.vendorId = evt.target.value
                                        update(copy)
                                    }
                                } type="checkbox" value={vendor.id} name="type" />{vendor.name}, {vendor.contact}, {vendor.type}
                        </div>
                    }
                )}
            </fieldset>
            <button
                onClick={(clickEvent) => justEditIt(clickEvent)}
                className="form-button">
                Save Edits
            </button>
        </form >
    )
}

