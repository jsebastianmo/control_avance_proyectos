import { useState } from "react";

const useForm = () => {

    const [ formulario, setFormulario ] = useState({});

    const changed = ({target}) => {
        const { name, value } = target;
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    return {
        formulario,
        changed
    }
}

export default useForm;