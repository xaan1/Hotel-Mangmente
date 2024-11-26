import { createContext, useState,useEffect } from "react";

import axios from 'axios'
export const AppContext = createContext()




export const AppContexProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token')  ? localStorage.getItem('token') : null)
    const [userData, setUserData] = useState(null)
    const [hotels, setHotels] = useState([])

    const backEndUrl = 'http://localhost:3000'

    const [currentEdited , setCurrentEdited] = useState(null)

 




    const getUserProfile = async () => {
        const {data} =  await axios.get(`${backEndUrl}/api/users/profileUser`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        if(data.success){
            setUserData(data.user)
        }

    //    console.log(data , "data in get Profile")
    }




    useEffect(() => {
      
            getUserProfile()
        
    }, [token]);




    // FETCH HOTELS

     const fetchHotels = async () => {

        try {
            const {data} = await axios.get(`${backEndUrl}/api/hotels/allHotels`)
          
            setHotels(data.
                hotels)
        } catch (error) {
            console.log(error)
        }


 
}


console.log(hotels, "hotels")


useEffect(() => {
      
    fetchHotels()

}, []);


    const value = {
        token, setToken,
        backEndUrl,
        userData,
        setUserData,
        getUserProfile,
        fetchHotels,
        hotels,
        setHotels,
        currentEdited , setCurrentEdited

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}




export default AppContexProvider