import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";
import OAuth from "../component/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});

  // instead of maintaining the local states we will manage the global states
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  
  // global state i.e (user)
  const {loading , error} = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  };

  // console.log(formData);
  // console.log(error);
  

  const handleSubmit = async (event) => {
    event.preventDefault();      // to avoid the refresh of the page when form is submitted
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="email"
          className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder="password"
          className='border p-3 rounded-lg' id='password' onChange={handleChange} />

        {/* when loding just disable the button */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account? </p>
        <Link to="/signup">
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {/* {error && <p className='text-red-500 mt-5'>Enter Valid Credentials</p>} */}
    </div>
  )
}

export default SignIn