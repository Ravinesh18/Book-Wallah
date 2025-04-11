import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from '../ChipInput';
import Upload from './Upload'

import { MdNavigateNext } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { postbook } from '../../operations/apiServices/bookApi';
const AddBook = () => {
  const { user } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("bookName", data.bookName);
    formData.append("description", data.description);
    formData.append("authorName", data.authorName);
    formData.append("ownerName", user._id);
    formData.append("coverImage", data.coverImage);
    formData.append("token", token);

    const genres = getValues("genre");
    if (Array.isArray(genres) && genres.length > 0) {
      genres.forEach((genre) => formData.append("genre[]", genre));
    } else {
      console.error("Genres must be an array!");
    }

    setLoading(true);

    // Dispatch the action to post the book
    dispatch(postbook(navigate, formData, token));

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-4 space-y-6"
    >
      <div>
        <div>
          <label>
            <span>
              Book Name<sup className="text-pink-200">*</sup>
            </span>
            <input
              id="bookName"
              placeholder="Enter Book Name"
              {...register("bookName", { required: true })}
              className="w-full form-style mt-2 p-2"
            />
            {errors.bookName && (
              <span className="ml-2 text-xs tracking-wide text-pink-400">
                Book name is required
              </span>
            )}
          </label>
        </div>
        <div>
          <label>
            <span>
              Short Description of Book<sup className="text-pink-200">*</sup>
            </span>
            <textarea
              id="description"
              placeholder="Enter Description.."
              {...register("description", { required: true })}
              className="min-h-[140px] w-full mt-2 p-2 form-style"
            />
            {errors.description && (
              <span className="ml-2 text-xs tracking-wide text-pink-400">
                Book Description is required
              </span>
            )}
          </label>
        </div>

        <div>
          <label>
            <span>
              Author Name<sup className="text-pink-200">*</sup>
            </span>
            <input
              id="authorName"
              placeholder="Enter Author name"
              {...register("authorName", { required: true })}
              className="w-full form-style mt-3"
            />
            {errors.courseName && (
              <span className="ml-2 text-xs tracking-wide text-pink-400">
                Author is required
              </span>
            )}
          </label>
        </div>
        <div>
          <ChipInput
            label="Tags"
            name="genre"
            placeholder="Enter genre and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            className='text-sm'
          />
        </div>
      </div>
      <Upload
        register={register}
        errors={errors}
        setValue={setValue}
        label="CoverImage"
        name="CoverImage"
      />

      <div className="flex justify-end gap-x-2">
        <button disabled={loading} className=" flex items-center space-x-2 px-6 py-2 text-sm bg-indigo-300 text-white rounded-md hover:bg-indigo-400 disabled:opacity-50">
          Next
          <MdNavigateNext />
        </button>
      </div>
    </form>
  );
};

export default AddBook;
