import { createContext, useContext } from "react";
import axios from "axios";

export const UserContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:3000/api/v1/users"
});


export const UserProvider = ({children}) => {

    const userContext = useContext(UserContext);

    const getUserHistory = async(token) => {
       try {
           let request = await client.get("/get_all_activity", {
                params : {
                    token : token,
                }
           })
           return request.data;
       } catch (e) {
            throw e;
       }
    }


    const addToActivity = async (token , meeting_code) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: token,
                meeting_code : meeting_code,
            })

            return request.data.message;
        } catch (e) {
            throw e;
        }
    }

    const isValidToken = async(token) => {
        try {
            let request = await client.get("/verify", {
                params : {
                    token : token,
                }
            })

            return request.status;
        } catch (e) {
            throw e;
        }
    }

    const data = {
        addToActivity, getUserHistory, isValidToken,
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}