import '../EditUser/edit.css'
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getRequestById ,putRequest} from "../../ApiFunctions/index";
import {  useEffect } from "react";
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
const EditUserForm = () => {
  const history = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams()
    const editUser = async(data)=>{ 
      try {
        await putRequest(`/update-user/${id}`, data);
        history('/')

      } catch (error) {
        console.log("error,",error);
      }
    }
    
useEffect(() => {
  const fetchUser = async () => {
    const response = await getRequestById(`/get-user-by-id/${id}`);
    const{firstName,lastName,email,mobile,picture} = response.data
    setValue('firstName',firstName)
    setValue('lastName',lastName)
    setValue('email',email)
    setValue('mobile',mobile)
    setValue('picture', picture)
  };
  fetchUser();
}, [id, setValue]);

    return(
      <div className="container">
   
        <form onSubmit={handleSubmit(editUser)}>
        <Avatar src="/broken-image.jpg" />
          <div className="row">
            <div className="col-25">
              <label htmlFor="fname">First Name</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="fname"
                name="firstName"
                placeholder="Your name.."
                {...register("firstName")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Your last name.."
                {...register("lastName")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="email">Email</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email.."
                {...register("email")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="mobile">Mobile</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Mobile.."
                {...register("mobile")}
              />
            </div>
          </div>
          <div class="row-1">
      <Button type="submit" value="Submit" variant='contained'>Edit</Button>
    </div>
          </form>
     
          </div>
    )
}

export default EditUserForm