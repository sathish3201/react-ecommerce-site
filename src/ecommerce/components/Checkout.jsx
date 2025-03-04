import React, { useState } from 'react'
import { Country, State, City } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import AuthHoc from '../tools/AuthHoc'
import { useNavigate } from 'react-router-dom';
import { incrementorder } from '../../redux/reducer/OrderReducer';
import AxiosInstance from '../tools/AxiosInstance';
import { remove_cart } from '../../redux/reducer/CartReducer';
import Spinner from '../tools/Spinner';
import Ganesh from '../../portfolio/assets/utils/Ganesh';
const Checkout = ({user}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const cart_items = useSelector((state) => state.cart.cartValues);
  const total_amount = useSelector((state)=> state.cart.total_price);

  const cart_new_items= cart_items.map(item => {
      const new_item={
        product:{
          id : item.product.id,
        },
        quantity : item.quantity
      };
      return new_item;
  });

  console.log([...cart_new_items])
 

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

  // console.log({...formData})
  
  // form handle
  const handleChange=(e) =>{
    const {name, value} = e.target;
    console.log(e.target)
    setFormData((prevData) => ({
      ...prevData,
      [name]:value,
    }));
  };



const handleSubmit= async(e)=>{
  e.preventDefault();
  
  setLoading(true)
  
  try{
    const order_detail = {
      cart_items : [...cart_new_items],
      total_price : total_amount,
      delivery_detail : {...formData}
    }
  const usid=user.user.id
  const axiosinstance = AxiosInstance(user?.access_token);
  const response = await axiosinstance.post(`api/orders/${usid}/place-order/`, {...order_detail});
  if(response.status == 401){
      alert('Session TimeOut. Redirecting to Login....')
      dispatch(remove_user())
      navigate('/login')
  }
  // console.log({...order_detail});
  alert(`${response.data.detail}`)
  dispatch(remove_cart())
  }catch(error){
    alert(`${error.response?.data?.error} || failed place order`)
  }finally{
    setLoading(false)
  }
 
};
if(loading){
  return <Spinner/>
}
  return (
    
    <div className="contact">
      <div className="contact-left" id="contact-id">
    <div className="header">
      <h2>Checkout</h2>
      <span className='close' id="close" onClick={()=>{
        document.getElementById("contact-id").style.display="none";
      }}>&times;</span>
    </div>
      <div className="Back btn btn-outline-primary" onClick={()=>{navigate('/cart')}}> # Back</div>
      
     <form className="was-validated row g-3" onSubmit={handleSubmit} >
      <div className="col-md-4">
        <input type="text" className="form-control" name='fname' placeholder='First Name' value={formData.fname} onChange={(e)=>{handleChange(e)}} required/>

      </div>
      <div className="col-md-4">
        <input type="text" className="form-control" name='lname' placeholder='LastName' value={formData.lname} onChange={handleChange} required/>

      </div>
      <div className="col-md-4">
        <input type="email" className="form-control" name='email' placeholder='Email' value={formData.email} onChange={handleChange} required/>

      </div>
      <div className="col-md-4">
        <input type="text" className="form-control" name='mobileno' placeholder='Moblie No' value={formData.mobileno} onChange={handleChange} 
        pattern="^[6-9][0-9]{9}$"
        title="please enter valid 10 digit mobile number starting with 6,7,8,9"
        required/>
        
      </div>
      <div className="col-md-6">
        <input type="text" className="form-control" name='address' placeholder='Address' value={formData.address} onChange={handleChange} required/>
   
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

      </div>

     
      <div className="col-md-4">
        <input type="tel" className="form-control" name='zip' placeholder='Zip' value={formData.zip} onChange={handleChange}
        pattern="^\d{6}$"
        title='please enter valid 6 digit zip code'
        required/>
       
      </div>
      <div className="form-row">
          <div className="col-12">
            <div className="form-check">
              <input type="checkbox" className="form-check-input"  value="" id="invalidcheck" required/>
              <label htmlFor="invalidcheck" className='form-check-label'> Agree to terms and condition</label>
              <div className="invalid-feedback">You must agree before submitting</div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-outline-primary">Place Order:{total_amount}</button>
          </div>
          </div>
     </form>
     </div>
     <div className="hero-right">
              <Ganesh />
         </div>
    </div>

  )
}

export default AuthHoc(Checkout) 

