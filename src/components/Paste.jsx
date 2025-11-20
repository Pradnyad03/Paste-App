import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { ToastBar } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState('');

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes
      (searchItem.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
      <input className='p-2 rounded-2xl mt-4 w-[660px] pl-4'
        type="search"
        placeholder='Search Here'
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className='border' key={paste?._id}>
                <div className='font-bold'>
                  {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-3 place-content-evenly'>
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      Edit
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                      View
                    </NavLink>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}>
                    Copy
                  </button>
                  <button>
                    Share
                  </button>
                </div>
                <div>
                  {paste?.createdAt}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste