import { useState } from 'react'
import ChatBody from './components/ChatBody'
import ChatInput from './components/ChatInput'
import {useMutation} from 'react-query'
import { fetchResponse } from './api'
function App() {

  const [chat,setchat]=useState([])
  const mutation=useMutation({
    mutationFn:()=>{
      return fetchResponse(chat)
    },
    onSuccess:(data)=>setchat((prev)=>[...prev,{sender:'ai',message:data.message.replace(/^\n\n/, "")}])
  })
  
  const sendMessage=async(message)=>{
    await Promise.resolve(setchat((prev)=>[...prev,message]))
    mutation.mutate()
  }
  return (
    <div className='bg-[#1A232E] h-screen py-6 px-12 relative text-white overflow-hidden flex flex-col justify-between align-middle'>
      <div className='gradient-01 z-0 absolute'></div>
      <div className='gradient-02 z-0 absolute'></div>


      {/* header */}
      <div className='uppercase font-bold text-2xl text-center mb-3'>Chat-Gpt (2.0)</div>

      {/* body */}
      
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center ">
        <ChatBody chat={chat}/>
      </div>

      {/* Input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading}/>
      </div>

    </div>
  )
}

export default App
