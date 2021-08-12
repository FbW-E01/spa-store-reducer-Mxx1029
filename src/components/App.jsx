import { useReducer, useEffect } from 'react';
import './App.css';

const initialState = {
    gear: 0,
    speed: 0,
    engineStarted: false,
    engineStopped: true,
    distanceTravelled: 0
}

function reducer(previousState, action) {
    switch (action.type) {
        case "start":
            if (previousState.engineStarted === false && previousState.engineStopped === true) {
                const startTry = Math.random();
                if (startTry > 0.5) {
                    console.log(startTry)
                    return {
                        engineStarted: true,
                        engineStopped: false,
                        gear: 0,
                        speed: previousState.speed,
                        distanceTravelled: 0
                    }
                } else if (startTry <= 0.5) {
                    console.log(startTry)
                    return {
                        engineStarted: false,
                        engineStopped: true,
                        gear: 0,
                        speed: previousState.speed,
                        distanceTravelled: previousState.distanceTravelled
                    }
                }
            }
            return previousState;
        case "stop":
            if (previousState.engineStarted === true && previousState.engineStopped === false) {
                return {
                    engineStarted: false,
                    engineStopped: true,
                    gear: 0,
                    speed: previousState.speed,
                    distanceTravelled: 0
                }
            }
            return previousState;
        case "gearup":
            if (previousState.engineStarted === true && previousState.engineStopped === false && previousState.gear < 5) {
                return {
                    engineStarted: true,
                    engineStopped: false,
                    gear: previousState.gear + 1,
                    speed: previousState.speed,
                    distanceTravelled: previousState.distanceTravelled
                }
            } 
            return previousState;
        case "geardown":
            if (previousState.engineStarted === true && previousState.engineStopped === false && previousState.gear > -2) {
                return {
                    engineStarted: true,
                    engineStopped: false,
                    gear: previousState.gear - 1,
                    speed: previousState.speed
                }
            } 
            return previousState;
        case "speedup":
            if (previousState.engineStarted === true && previousState.engineStopped === false && previousState.gear !== 0 && previousState.speed < 225) {
                switch (previousState.gear) {
                    case -2:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 215 ? previousState.speed + 10 : 225
                        }
                    case -1:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 220 ? previousState.speed + 5 : 225
                        }
                    case 1:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 220 ? previousState.speed + 5 : 225,
                            // distanceTravelled: setInterval(() => { previousState.distanceTravelled + 1.4;
                            // }, 1000)
                        }
                    case 2:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 215 ? previousState.speed + 10 : 225
                        }
                    case 3:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 210 ? previousState.speed + 15 : 225
                        }
                    case 4:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 205 ? previousState.speed + 20 : 225
                        }
                    case 5:
                        return {
                            engineStarted: true,
                            engineStopped: false,
                            gear: previousState.gear,
                            speed: previousState.speed <= 200 ? previousState.speed + 25 : 225
                        }
                    default:
                        alert("Unknown action!!!")
                        return previousState;
                }
                
            } 
            return previousState;
        case "speeddown":
            if (previousState.engineStarted === true && previousState.engineStopped === false && previousState.gear !== 0) {
                return {
                    engineStarted: true,
                    engineStopped: false,
                    gear: previousState.gear,
                    speed: previousState.speed >= 10 ? previousState.speed - 10 : 0
                }
            } 
            return previousState;
        case "move":
            if (previousState.engineStarted === true && previousState.engineStopped === false && previousState.gear !== 0 && previousState.speed > 0) {
                return {
                    // engineStarted: true,
                    // engineStopped: false,
                    // gear: previousState.gear,
                    // speed: previousState.speed,
                    ...previousState,
                    distanceTravelled: Number(previousState.distanceTravelled) + Number(previousState.speed)
                }
            }
            return previousState;
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
        setInterval(() => {
            dispatch({ type: "move"
            // , state.distanceTravelled 
        })
        }, 1000)
    }, [])

    return (
        <div className="App">
            <h1>This is a boat game.</h1>
            {/* <p>Your boat engine is running: {`${state.engineStarted}`}, or has the engine been stopped: {`${state.engineStopped}`}</p> */}
            <p>Boat engine running? 
                <br />
                {state.engineStarted ? "✅" : "❌"}
            </p>
            <p>Current gear: <span className="bold">{state.gear}</span></p>
            <p>Current speed: <span className="bold">{state.speed}</span> km/h</p>
            <p>Distance travelled: <span className="bold">{state.distanceTravelled}</span> m</p>
        
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
            <button onClick={() => dispatch({type: "speedup"}, {type: "move"})}>
                Go faster
            </button>
            <button onClick={() => dispatch({type: "speeddown"})}>
                Go slower
            </button>
            
        </div>
        

    )
}

export default App;