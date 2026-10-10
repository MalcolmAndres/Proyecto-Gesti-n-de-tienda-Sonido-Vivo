import { useState } from "react"
import Button  from "react-bootstrap/Button"

function Contador(){
    const [contador,setContador] = useState(0)

    return(
        <div>
            <h2>Contador: {contador}</h2>
            <Button variant="primary"  onClick={() => setContador(contador + 1)} >
                Aumentar
            </Button>
        </div>
    )
}
export default Contador