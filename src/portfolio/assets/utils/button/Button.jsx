import React, { useEffect, useState } from 'react'
const withLoading = (WrappedComponent) =>{
    const [loading , setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);

        const timer = setTimeout(() =>{
            setLoading(false);
        },2000);

        return () => clearTimeout(timer);
    },[])
    // pass loading state as a prop to the wrapped component
    return <WrappedComponent {...props} loading={loading} />
}
const myComponent =({loading}) =>(
    <div>
        {loading?<p>Loading..</p> : <p>Data Loaded Succesfully Loaded </p>}
    </div>
);
const EnhancedComponent = withLoading(myComponent);
const Button = () => {
  return (
    <div>
      <EnhancedComponent />
    </div>
  )
}

export default Button
