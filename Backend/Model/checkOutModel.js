import mongoose from 'mongoose'

const checkOutSchema = mongoose.Schema({
    cartId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cartData"
        },
    ],
    firstName: {
        type: String,
        required
     
    },
    lastName: {
        type: String,
     
    },
    email: {
        type: String,
     
    },
    phone: {
        type: String,
     
    },
    state: {
        type: String,
     
    },
    pincode: {
        type: Number,
     
    },
    orderNotes: {
        type: String,
     
    },
    country: {
        type: String,
   //  
    },
    cuponCode: {
        type: String,

    }
    , address:{
        type: String,
 
}
})

const CheckOut = mongoose.model('checkout', checkOutSchema)


export const postCheckOutModel = async (body) => {
    const {
        cartData,
        firstName,
        lastName,
        email,
        phone,
        state,
        pincode,
        orderNotes,
        country,
        cuponCode,
        address
    } = body
    try {
        const res = await CheckOut.create({
            cartId: cartData, // Assign the cartData array to the cartId field
            firstName,
            lastName,
            email,
            phone,
            state,
            pincode,
            orderNotes,
            country,
            cuponCode,
            address
        });
        console.log("res=>",res)
        return { data: res, message: "Succes", status: 200 };
      } catch (err) {
        console.log("ERR=>",err)
        return { message: err, status: 500 };
      }


}