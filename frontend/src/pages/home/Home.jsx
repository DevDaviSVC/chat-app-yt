import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser]);

  return (
    <div className='flex sm:h-[450px] min-h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}