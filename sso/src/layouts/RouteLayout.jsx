import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../components/Login/Login"
import Register from "../components/Login/Register"
import Main from "./Main"

const RouteLayout = () => {
    return (
        <div style={{ minHeight: "75vh" }}>
            <Routes>
                <Route path={"/"} element={<Main />}>
                    <Route index element={<Register />} />
                    <Route path={"register"} element={<Register />} />
                    <Route path={"login"} element={<Login />} />
                </Route>
            </Routes>
        </div>
    )
}

export default RouteLayout
