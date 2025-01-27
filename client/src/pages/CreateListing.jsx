import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { currentUser } = useSelector(state => state.user)
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bathrooms: 1,
    bedrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);


  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const storeImage = async (image) => {
    // this promise will return the url from cloudinary 
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();

      formData.append("file", image);
      formData.append("upload_preset", "real_estate");
      formData.append("cloud_name", "dpqw0munc");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpqw0munc/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        resolve(data.secure_url);
      } catch (error) {
        reject(error);
      }

    });
  };

  const handleImageSubmit = async (event) => {
    setUploading(true);
    setImageUploadError(false);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        // getting urls for each image file
        promises.push(storeImage(files[i]));
      }

      console.log(promises);


      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed. Please try again.");
          setUploading(false);
        });
    }
    else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  // here removing the url having this index
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // to change the values when user inputs something
  const handleChange = (event) => {
    if (event.target.id === 'sent' || event.target.id === 'rent') {
      setFormData({
        ...formData,
        type: event.target.id
      });
    }

    if (event.target.id === 'parking' || event.target.id === 'furnished' || event.target.id === 'offer') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked
      });
    }

    if (event.target.type === 'number' || event.target.type === 'text' || event.target.type === 'textarea') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image');
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError('Discount price must be lower than regular price');
      }
      setLoading(true);
      setError(false);

      const res = await fetch('/api/listing/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        })

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className=" p-3 border border-gray-300 rounded-lg "
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className=" p-3 border border-gray-300 rounded-lg "
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="100000000"
                  required
                  className=" p-3 border border-gray-300 rounded-lg "
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>(₹ / month)</span>
                  )}
                </div>
              </div>

              {
                formData.offer && (
                  <div className="flex items-center gap-2">
                    <input
                      type='number'
                      id='discountPrice'
                      min='0'
                      max='10000000'
                      required
                      className='p-3 border border-gray-300 rounded-lg'
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className="flex flex-col items-center">
                      <p>Discounted price</p>
                      {formData.type === 'rent' && (
                        <span className='text-xs'>(₹ / month)</span>
                      )}
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex ">
            <p className="flex-semibold">Images:</p>
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex gap-4">
            <input
              className="p-3 border boder-gray-300 ronded w-full"
              type="file"
              id="images"
              onChange={(e) => setFiles(e.target.files)}
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border-green-700 
                            rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}
          {/* if user uploads some images then show them here */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex justify-between p-3 border items-center">
                <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />

                <button type="button" onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg 
                        uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
