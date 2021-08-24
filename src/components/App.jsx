import { useReducer, useEffect } from 'react';
import './App.css';

const initialState = {
    gear: 0,
    speed: 0,
    engineStarted: false,
    distanceTravelled: 0
}

function reducer(previousState, action) {
    switch (action.type) {
        case "start":
            if (previousState.engineStarted === false) {
                const startTry = Math.random();
                if (startTry > 0.5) {
                    console.log(startTry)
                    return {
                        ...previousState,
                        engineStarted: true,
                    }
                } 
            }
            return previousState;
        case "stop":
            if (previousState.engineStarted === true) {
                return {
                    ...previousState,
                    gear: 0,
                    engineStarted: false,
                }
            }
            return previousState;
        case "gearup":
            if (previousState.engineStarted === true && previousState.gear < 5) {
                return {
                    ...previousState,
                    gear: previousState.gear + 1,
                }
            } 
            return previousState;
        case "geardown":
            if (previousState.engineStarted === true && previousState.gear > -2) {
                return {
                    ...previousState,
                    gear: previousState.gear - 1,
                }
            } 
            return previousState;
        case "speedup":
            if (previousState.engineStarted === true && previousState.gear !== 0) {
                return {
                    ...previousState, 
                    // Joels much shorter version to my endless switch statement: 
                    speed: (previousState.speed + (5 * previousState.gear)) <= 225 ? previousState.speed + (5 * previousState.gear) : 225
                }
                // switch (previousState.gear) {
                //     case -2:
                //         return {
                //             // engineStarted: true, // or: previousState.engineStarted
                //             // gear: previousState.gear,
                //             // distanceTravelled: previousState.distanceTravelled
                //             // instead of the above 4 lines, you can spread them: 
                //             ...previousState,
                //             speed: previousState.speed <= 215 ? previousState.speed - 10 : 225
                //         }
                //     case -1:
                //         return {
                //             ...previousState,
                //             speed: previousState.speed <= 220 ? previousState.speed - 5 : 225
                //         }
                //     case 1:
                //         return {
                //             ...previousState,
                //             speed: previousState.speed <= 220 ? previousState.speed + 5 : 225,
                //             // distanceTravelled: setInterval(() => { previousState.distanceTravelled + 1.4;
                //             // }, 1000)
                //         }
                //     case 2:
                //         return {
                //             ...previousState,
                //             speed: previousState.speed <= 215 ? previousState.speed + 10 : 225
                //         }
                //     case 3:
                //         return {
                //             ...previousState,
                //             speed: previousState.speed <= 210 ? previousState.speed + 15 : 225
                //         }
                //     case 4:
                //         return {
                //             ...previousState,
                //             speed: previousState.speed <= 205 ? previousState.speed + 20 : 225
                //         }
                //     case 5:
                //         return {
                //             ...previousState,
                //             speed: previousState.speed <= 200 ? previousState.speed + 25 : 225
                //         }
                //     default:
                //         alert("Unknown action!!!")
                //         return previousState;
                // }
                
            } 
            return previousState;
        case "speeddown":
            if (previousState.engineStarted === true && previousState.gear !== 0) {
                return {
                    engineStarted: true,
                    gear: previousState.gear,
                    speed: previousState.speed >= 10 ? previousState.speed - 10 : 0,
                    distanceTravelled: previousState.distanceTravelled
                }
            } 
            return previousState;
        case "move":
            if (previousState.engineStarted === true && previousState.gear !== 0 && previousState.speed > 0) {
                return {
                    ...previousState,
                    // divide speed by 3.6 to get from km to meter
                    distanceTravelled: previousState.distanceTravelled + previousState.speed/3.6
                    // helper to see anything, got NaN first:
                    // distanceTravelled: `${previousState.distanceTravelled} + ${previousState.speed}`
                }
            } else if (previousState.engineStarted === false && previousState.speed > 0 && previousState.distanceTravelled > 0) {
                return {
                    ...previousState,
                    // divide speed by 3.6 to get from km to meter
                    distanceTravelled: previousState.distanceTravelled + previousState.speed/3.6
                }
            }
            return previousState;
        case "reset":
            return initialState;
        default:
            alert("Unknown action!!!")
            return previousState;
    }

}

function App() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    console.log("State is ", state);
    // if you type console.log("State is" + state), you only get State is [object Object] in the console for some unknown reason
    // with console.log("State is ", state) you get the contents of your initialState object desiplayed just fine

    useEffect(() => {
        const distanceMeter = setInterval(() => {
            dispatch({ type: "move"});
        }, 1000) 
        return () => {
            clearInterval(distanceMeter);
        };
    }, [])

    return (
        <div className="App">
            <h1>This is a boat game.</h1>
            {/* <p>Your boat engine is running: {`${state.engineStarted}`}</p> */}
            <p>Boat engine running? 
                <br />
                {state.engineStarted ? "✅" : "❌"}
            </p>
            <p>Current gear: <span className="bold">{state.gear}</span></p>
            <p>Current speed: <span className="bold">{state.speed}</span> km/h</p>
            <p>Distance travelled: <span className="bold">
                    {state.distanceTravelled < 1000 
                        ? 
                        Number(state.distanceTravelled.toFixed(2)) : 
                        Number((state.distanceTravelled/1000).toFixed(2))
                    }
                </span> {state.distanceTravelled < 1000 ? "m" : "km"}
            </p>
        
            <button onClick={() => dispatch({type: "start"})}>
                Start engine
            </button>
            <button onClick={() => dispatch({type: "stop"})}>
                Stop engine
            </button>
            <button onClick={() => dispatch({type: "gearup"})}>
                1 gear up
            </button>
            <button onClick={() => dispatch({type: "geardown"})}>
                1 gear down
            </button>
            <button onClick={() => dispatch({type: "speedup"})}>
                Go faster
            </button>
            <button onClick={() => dispatch({type: "speeddown"})}>
                Go slower
            </button>
            <div className="wrapper">
                <button onClick={() => dispatch({type: "reset"})}>
                    Reset
                </button>
            </div>
            
        </div>
        

    )
}

export default App;