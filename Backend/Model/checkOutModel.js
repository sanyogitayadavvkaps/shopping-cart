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
        required:true
     
    },
    lastName: {
        type: String,
        required:true
     
    },
    email: {
        type: String,
        required:true
     
    },
    phone: {
        type: String,
        required:true
     
    },
    state: {
        type: String,
        required:true
     
    },
    pincode: {
        type: Number,
        required:true
     
    },
    orderNotes: {
        type: String,
        required:true
     
    },
    country: {
        type: String,
        required:true
   //  
    },
    cuponCode: {
        type: String  

    }
    , address:{
        type: String,
        required:true
 
}
})

const CheckOut = mongoose.model('checkout', checkOutSchema)


export const postCheckOutModel = async (body) => {
    const {
        allGetCart,
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
            cartId: allGetCart, // Assign the cartData array to the cartId field
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
        return { data: res, message: "Succes", status: 200 };
      } catch (err) {
        console.log("ERR=>",err)
        return { message: err, status: 500 };
      }


}