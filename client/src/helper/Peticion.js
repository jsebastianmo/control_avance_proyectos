const Peticion = async (url, metodo="GET", datos="", token="") => {

    let options = {};

    if(metodo === "GET" || metodo === "DELETE"){
        options = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        }
    }

    if(metodo === "POST" || metodo === "PUT"){
        options = {
            method: metodo,
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        }
        
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export default Peticion;