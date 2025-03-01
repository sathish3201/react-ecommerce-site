import React, { useState } from 'react'
import { Country, State, City } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import AuthHoc from '../tools/AuthHoc'
import { useNavigate } from 'react-router-dom';
import { incrementorder } from '../../redux/reducer/OrderReducer';
import AxiosInstance from '../tools/AxiosInstance';
const Checkout = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state.cart.cartValues)
  const total_amount = useSelector((state)=> state.cart.total_price);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fname:'',
    lname:'',
    email:'',
    mobileno:'',
    address:'',
    country:'',
    state:'',
    city:'',
    zip:'',
  });
  const [errors, setErrors] = useState({
    fname:'',
    lname:'',
    email:'',
    mobileno:'',
    address:'',
    country:'',
    state:'',
    city:'',
    zip:'',
  });
  console.log({...formData})
  console.log([...cart_items])
  // form handle
  const handleChange=(e) =>{
    const {name, value} = e.target;
    console.log(e.target)
    setFormData((prevData) => ({
      ...prevData,
      [name]:value,
    }));
  };

   const validate=()=>{
    let formErrors ={};
    let isValid = true;
    //name validate
    if(!formData.fname){
      formErrors.fname = "First Name is Required !!"
      isValid = false;
    }
    if(!formData.lname){
      formErrors.lname = "Last Name is Required !!"
      isValid = false;
    }
    if(!formData.email){
      formErrors.email = "Email Name is Required !!"
      isValid = false;
    }
    if(!formData.moblieno){
      formErrors.moblieno = "Mobile No is Required !!"
      isValid = false;
    }
    if(!formData.address){
      formErrors.address = "Address is Required !!"
      isValid = false;
    }
    if(!formData.country){
      formErrors.country = "Please Select Country.. !!"
      isValid = false;
    }
    if(!formData.state){
      formErrors.state = "Please Choose State is Required !!"
      isValid = false;
    }
    if(!formData.city){
      formErrors.city = "Please Choose City is Required !!"
      isValid = false;
    }
    if(!formData.zip){
      formErrors.zip = "please provide valid zip code !!"
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
}
const generateId=() =>{
  let orderid="";
  [...cart_items].forEach((ele) => {
    orderid += ele.product.id;
  })
  orderid+=("#"+ total_amount);
  return orderid;
}


const handleSubmit=(e)=>{
  e.preventDefault();
  console.log("submit is clicked")

  const order_detail = {
    user : {...user.user},
    cart_items : [...cart_items],
    total_price : total_amount,
    delivery_detail : {...formData}
  }
  handleOrder(order_detail)
  dispatch(incrementorder({orderId :generateId(), order_detail: order_detail}))
  //  api calling 
  if(validate()){
    console.log("validation successfull");
    // on success
    // dispatch(incrementorder(order));
    setIsSubmitted(true);
    alert("form submitted Successfully!!")
  }else{
    console.log("validation unsuccessfull");
    setIsSubmitted(false);
  }
};

 const handleOrder= async({order_detail})=>{

    const id = user.user.id;
    const axiosinstance = AxiosInstance(user?.access_token);
    const response = await axiosinstance.post(`/orders/${id}/place-order/`,{order_detail});
    console.log(order_detail);
    console.log(response);
 }

  return (
    
    <div className="contact">
      <div className="Back btn btn-outline-primary" onClick={()=>{navigate('/cart')}}> # Back</div>
      <h2>Check Out</h2>
     <form className="was-validated row g-3" onSubmit={handleSubmit} >
      <div className="col-md-4">
        <input type="text" className="form-control" name='fname' placeholder='First Name' value={formData.fname} onChange={(e)=>{handleChange(e)}} required/>
        {errors.fname && (<span className="invalid-feedback">{errors.fname}</span>)}
      </div>
      <div className="col-md-4">
        <input type="text" className="form-control" name='lname' placeholder='LastName' value={formData.lname} onChange={handleChange} required/>
        {errors.lname && (<span className="invalid-feedback">{errors.lname}</span>)}
      </div>
      <div className="col-md-4">
        <input type="email" className="form-control" name='email' placeholder='Email' value={formData.email} onChange={handleChange} required/>
        {errors.email && (<span className="invalid-feedback">{errors.email}</span>)}
      </div>
      <div className="col-md-4">
        <input type="tel" className="form-control" name='mobileno' placeholder='Moblie No' value={formData.mobileno} onChange={handleChange} required/>
        {errors.moblieno && (<span className="invalid-feedback">{errors.moblieno}</span>)}
      </div>
      <div className="col-md-6">
        <input type="text" className="form-control" name='address' placeholder='Address' value={formData.address} onChange={handleChange} required/>
        {errors.address && (<span className="invalid-feedback">{errors.address}</span>)}
      </div>

     {/* country */}
     <div className="col-md-4">
        <select name="country" className='form-select' value={formData.country} onChange={handleChange}>
          <option selected value="">Choose...</option>
          {
            !!Country && Country.getAllCountries()?.map((item) => (
              <option  key ={item.isoCode} value={item.isoCode}> {item.name}</option>
            ))
          }
        </select>

        {errors.country && (<span className="invalid-feedback">{errors.country}</span>)}
      </div>

     
      {/* state */}
      <div className="col-md-4">
        <select name="state" className='form-select' value={formData.state} onChange={handleChange}>
          <option selected value="">Choose...</option>
        
        {
           !!formData.country && State.getStatesOfCountry(formData.country)?.map((item) => (
            <option key={item.isoCode} value={item.isoCode}> {item.name}</option>
           ))
        }
          
          
        
        </select>

        {errors.state && (<span className="invalid-feedback">{errors.state}</span>)}
      </div>

      
     {/* city */}
     <div className="col-md-4">
        <select name="city" className='form-select' value={formData.city} onChange={handleChange}>
          <option selected value="">Choose...</option>
          {
            formData.country !=='' && formData.state !=='' && City.getCitiesOfState(formData.country, formData.state)?.map((item) => (
              <option key={item.name} value={item.name}> {item.name}</option>
            ))
          }
        </select>

        {errors.country && (<span className="invalid-feedback">{errors.country}</span>)}
      </div>

     
      <div className="col-md-4">
        <input type="tel" className="form-control" name='zip' placeholder='Zip' value={formData.zip} onChange={handleChange} required/>
        {errors.zip && (<span className="invalid-feedback">{errors.zip}</span>)}
      </div>
          <div className="col-12">
            <div className="form-check">
              <input type="checkbox" className="form-check-input"  value="" id="invalidcheck" required/>
              <label htmlFor="invalidcheck" className='form-check-label'> Agree to terms and condition</label>
              <div className="invalid-feedback">You must agree before submitting</div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Place Order:{total_amount}</button>
          </div>
     </form>
     </div>

  )
}

export default AuthHoc(Checkout) 

