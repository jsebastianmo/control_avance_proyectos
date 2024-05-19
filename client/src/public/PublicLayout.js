import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
    const [authToken] = useState(localStorage.getItem('token'));

    return(
        <>
            {
                authToken === null || authToken === undefined || authToken === "" ? 
                (
                    <>
                        <Outlet />
                    </>
                )
                :
                (
                    <Navigate to="/control" />
                )
            }
        </>
    )
}

export default PublicLayout;