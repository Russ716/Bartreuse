import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Bus from "../images/image.jpg"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isOwner: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("honey_user", JSON.stringify({
                        id: createdUser.id,
                        Owner: createdUser.isOwner
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Bartreuse</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = { ...customer }
                        copy.isOwner = evt.target.checked
                        setCustomer(copy)
                    }}
                        type="checkbox" id="isOwner" />
                    <label htmlFor="email"> I am an owner of the bar. </label>
                </fieldset>
                <fieldset>
                    <button className="myButton" type="submit"> Register </button>
                </fieldset>
                <div>Bartreuse is a wholly owned subsidiary of Russ's Busses. </div>
                <img src={Bus} class="logo" alt="Russ' Busses" />
            </form>
        </main>
    )
}

