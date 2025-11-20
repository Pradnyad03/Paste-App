import { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';


const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);

    function createPaste(){
        const paste={
            title:title,
            content:value,
            _id: pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }

        if(pasteId){
            //updatePaste
            dispatch(updateToPastes(paste));
        }
        else{
            //createPaste
            dispatch(addToPastes(paste));
        }
        setTitle("");
        setValue("");
        setSearchParams({});
    }

    const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };


    useEffect(()=>{
        if(pasteId){
            const paste=allPastes.find((p)=>p._id===pasteId);
            if(paste)
            {setTitle(paste.title);
            setValue(paste.content);}
        }
    },[pasteId,allPastes]);

    return (
        <div>
             <div className='flex flex-row gap-7 place-content-between'>
            <input className='p-1 rounded-2xl mt-4 w-[66%] pl-4'
                type="text"
                placeholder='Enter title here'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={createPaste}
            className='p-2 rounded-2xl mt-4'>
                {
                    pasteId ? "Update My Paste" : "Create My Paste"
                }
            </button>
        </div>
        <div className='mt-8'>
            <textarea className='rounded-2xl w-[80vw] mt-4 p-4'
            value={value}
            placeholder='Enter Your Content here'
            onChange={(e)=>setValue(e.target.value)}
            rows={20}
            />
        </div>
        </div>

    )
}

export default Home
