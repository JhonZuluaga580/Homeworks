import {useState} from "react"


const SecondApp = ({value}) => {
    value = 10;
    const [counter, setCounter] = useState(value)

    const handleSubstract = () => {
        setCounter(counter - 1)
    }

    const handleReset = () => {
        setCounter(value)
    }


    return (
        <>
            <h1> Counter </h1>
            <span> {counter} </span>
            <button onClick={ () => handleSubstract()}> -1 </button>
            <button onClick={ () => handleReset()}> reset </button>

        </>
    )
}

export default SecondApp;