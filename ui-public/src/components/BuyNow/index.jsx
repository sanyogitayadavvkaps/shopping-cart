

import axios from "axios";
// import Cookies from "js-cookie";


const BuyNow = () => {
    const userToken = localStorage.getItem("token")
    const userId = localStorage.getItem("user_id")


    const handleSubmit = async(e)=> {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/api/create-checkout-session', {
                userId: userId
            },
            {
                headers: {
                    Authorization: "Bearer "+userToken
                }
            // user: (JSON.parse(Cookies.get('user')))._id
            });
          console.log("RES=>",res.data)

            if(res.data.url){
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.log('Error while making payment : ', error.message);
        }

    }

    return (
        <>
            <h2 style={{color: 'red', textAlign: 'center'}}>
            Please upgrade to premium plan for posting more than 5 blogs !!
            </h2>

            <form onSubmit={handleSubmit}>

                <h3 style={{textAlign: 'center'}}>Hello user, you just have to make one time payment for activating your lifetime subscription and you will be able to post unlimited blogs</h3> 
                <h4 style={{textAlign: 'center'}}>Click on below link for redirecting to payment page</h4>
                <br />
                <button type='submit'>
                    Pay INR 500
                </button>

            </form>
        </>
    )
}

export default BuyNow;

