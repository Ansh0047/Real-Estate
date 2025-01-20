import {GoogleAuthProvider, signInWithPopup, getAuth} from '@firebase/auth';
import {app} from "../firebase";

const OAuth = () => {
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);
            console.log(result);
        } catch (error) {
            console.log("can't connect to google", error);
        }
    };

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 
    rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        Continue With Google
    </button>
  );
};

export default OAuth;