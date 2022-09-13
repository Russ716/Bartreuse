import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"

import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./bartreuse.css"


export const Bartreuse = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    
                </>
            </Authorized>

        } />
    </Routes>
}

