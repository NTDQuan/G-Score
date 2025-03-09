import React, { useState, useEffect } from 'react'
import Table from '../components/Table'
import APIService from '../Service/APIService'

const Search = () => {
  const [registrationId, setRegistrationId] = useState('')
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null)
      const result = await APIService.searchRecordWithId(registrationId);
      setData([result]);
    } catch (err) {
      setError('No record found');
      setData(null);
    }
  } 


  return (
    <div className='flex flex-col min-h-screen p-6 bg-gray-100 space-y-6'>
      <h1 className="text-2xl font-bold mb-5 text-center sm:text-left">Search</h1>
      <div className='shadow-[1px_1px_3px_3px_rgba(0,0,0,0.05)] 
                      p-5 
                      w-full 
                      border 
                      border-hidden 
                      rounded-md
                      bg-white'
      >
        <h3>Enter student id here:</h3>
        <div className='flex space-x-3'>
            <input 
              type="text"
              className='
                min-w-[50%]
                border-gray-400
                border-1
                rounded-[4px]
                py-1
                px-2
              '
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              placeholder='Enter registration number'
            ></input>
            <button 
              type="button"
              onClick={handleSearch}
              className='
                border
                rounded-[4px]
                px-4
                py-2
                bg-blue-500 
                text-white
                cursor-pointer
              '
            >
              Submit
            </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className='shadow-[1px_1px_3px_3px_rgba(0,0,0,0.05)] 
                      p-5 
                      w-full 
                      border 
                      border-hidden 
                      rounded-md
                      bg-white'
      >
        <h1 className='my-5 text-2xl font-bold'>Detail Score</h1>

        <div className='flex-1 overflow-auto h-full'>
          <Table data={data}/>
        </div>
      </div>
    </div>
  )
}

export default Search
