import axios from 'axios'
import { setAlert } from './alerts'
import {
    BUS_FOUND,
    BUS_NOTFOUND,
} from './types';


// Search Buses //  

export const searchbuses = ({to,from,date}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(config)
    // to=to.toLowerCase()
    // from=from.toLowerCase()

    const [toCity,toState] = to.trim().split(',')
    const [fromCity, fromState] = from.trim().split(',')
    const data = {
        "source":{
        "city":toCity,
        "state":toState
        },
        "destination":{
        "city":fromCity,
        "state":fromState
        },
        date
        }

    const body = JSON.stringify(data)
    
    try{
        const res = await axios.post('/api/buses',body,config)
        console.log("found",res.data)
        if(res.data.length == 0){
            dispatch({
                type:BUS_NOTFOUND,
            })
            
        }
        else{
            dispatch({
                type:BUS_FOUND,
                payload:res.data
            })
    
            // dispatch(loadUser())
        }
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'))
                
            });
        }

        dispatch({
            type:BUS_NOTFOUND,
        })

    }
}
