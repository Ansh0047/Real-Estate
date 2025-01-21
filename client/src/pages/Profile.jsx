import { useSelector } from "react-redux";
import { useRef } from "react";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          // onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer
        self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
        />

        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />

        <button
          className=" bg-slate-800 text-white rounded-lg p-3 uppercase
        hover:opacity-85 disabled: opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer hover:opacity-85">Delete account</span>
        <span className="text-red-700 cursor-pointer hover:opacity-85">Sign out</span>
      </div>
    </div>
  )
}

export default Profile