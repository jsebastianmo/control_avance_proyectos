const Peticion = async (url, metodo="GET", datos="", token="") => {

    let options = {};

    if(metodo === "GET" || metodo === "DELETE"){
        options = {
            method: metodo,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        }
    }

    if(metodo === "POST" || metodo === "PUT"){
        options = {
            method: metodo,
            mode: 'no-cors',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        }
        
    }

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
}

export default Peticion;