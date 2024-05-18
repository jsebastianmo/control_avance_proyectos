import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

    return(
        <>
            {
                authToken === null || authToken === undefined || authToken == "" ? 
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