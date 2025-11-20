import React from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams,useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const ViewPaste=() =>{
  const {id}=useParams();

  const allPastes=useSelector((state)=>state.paste.pastes);

  const paste=allPastes.filter((p)=>String(p._id)===String(id))[0];
  
  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input className='p-1 rounded-2xl mt-4 w-[66%] pl-4'
          type="text"
          placeholder='Enter title here'
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste}
          className='p-2 rounded-2xl mt-4'>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button> */}
      </div>
      <div className='mt-8'>
        <textarea className='rounded-2xl w-[80vw] mt-4 p-4'
          value={paste.content}
          placeholder='Enter Your Content here'
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
