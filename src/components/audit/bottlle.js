
import { useNavigate } from "react-router-dom"



export const Bottle = ({ getAllBottles, bottleObject, currentUser }) => {
    const navigate = useNavigate()


    return <section className="bottle" key={`bottle--${bottleObject.id}`}>
        <div className="bottleContainer">
            <header>Bottle #{bottleObject.id}: {bottleObject.brand} {bottleObject.name}</header>
            <footer className="emergency" ><b>Quantity: </b> {
                bottleObject.quantity ? ` ${bottleObject.quantity} `
                    : "🚨"} <aside className="par"> <b> Par: </b> {bottleObject.par} </aside> </footer>

            <button onClick={() => {
                return fetch(`http://localhost:8088/bottles/${bottleObject.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllBottles()
                    })
            }} className="bottle__Delete" >Delete</button >


            <button onClick={(clickEvent) => {
                navigate(`/editBottle/${bottleObject.id}`)


            }} className="bottle__Delete" > Edit </button>
        </div>
    </section>
}
