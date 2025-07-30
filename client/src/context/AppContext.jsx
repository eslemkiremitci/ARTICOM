import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const navigate = useNavigate()
    const [image, setImage] = useState(false)
    const [resultImage, setResultImage] = useState(false)
    const { getToken } = useAuth()
    const { isSignedIn } = useUser()
    const { openSignIn } = useClerk()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [kredi, setKredi] = useState(false)

    const loadKrediData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/user/kredi', { headers: { token } })
            if (data.success) {
                setKredi(data.kredi)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeBG = async (image) => {
        try {
            // Üyelik zorunlu: Üye değilse yönlendir
            if (!isSignedIn) {
                return openSignIn()
            }

            setResultImage(false)
            setImage(image)
            navigate('/result')

            const token = await getToken()

            const formData = new FormData()
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/image/remove-bg', formData, { headers: { token } })

            if (data.success) {
                setResultImage(data.resultImage)
                if (data.krediBalance !== undefined) setKredi(data.krediBalance)
            } else {
                toast.error(data.message)
                if (data.krediBalance !== undefined) setKredi(data.krediBalance)
                if (data.krediBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        image, setImage,
        backendUrl,
        removeBG,
        loadKrediData,
        resultImage, setResultImage,
        kredi
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
