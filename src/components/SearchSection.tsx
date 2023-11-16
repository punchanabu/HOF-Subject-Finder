'use client'
import React, { useState } from 'react';
import { FaUser, FaCircle } from 'react-icons/fa';
type SearchResult = {
  name: string;
  label1: string;
  label2: string;
  label3: string;
};

function SearchSection() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    setErrorMessage('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const response = await fetch(`/api/search?name=${searchTerm}`);
      
      const data = await response.json();
      
      if (response.ok) {
        setSearchResults(data as SearchResult);
      } else {
        
        throw new Error(data.message || 'Search failed');
       
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Fetch error:', error.message);
        setErrorMessage(error.message);
      }
      setSearchResults(null);
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Type in your name..."
          className="w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>
      {searchResults && (
        <>
        <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg text-black font-bold font-noto-sans-thai mb-2 text-xl">ผลการค้นหา</h3>
          <div className="flex items-center text-black font-noto-sans-thai mb-1 text-xl">
            <FaUser className="mr-2" />
            <span className="font-semibold"></span> {searchResults.name}
          </div>
        </div>

        <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg text-black font-bold font-noto-sans-thai mb-2 text-xl">ฐานที่ต้องไป</h3>
            <div className="space-y-0">
              <div className="flex flex-col items-center">
                <p className='text-black font-noto-sans-thai text-2xl'>ฐานแรก</p>
                <FaCircle className="text-orange-500 text-4xl rounded-full" />
                <p className="text-black font-noto-sans-thai text-xl">{searchResults.label1}</p>
                <div className="w-0.5 h-12 bg-orange-300"></div>
              </div>
              <div className="flex flex-col items-center mb-0">
                <p className='text-black font-noto-sans-thai text-2xl'>ฐานสอง</p>
                <FaCircle className="text-orange-500 text-4xl rounded-full" />
                <p className="text-black font-noto-sans-thai text-xl">{searchResults.label2}</p>
                <div className="w-0.5 h-12 bg-orange-300"></div>
              </div>
              <div className="flex flex-col items-center mt-0">
                <p className='text-black font-noto-sans-thai text-2xl'>ฐานสาม</p>
                <FaCircle className="text-orange-500 text-4xl rounded-full" />
                <p className="text-black font-noto-sans-thai text-xl">{searchResults.label3}</p>
              </div>
            </div>
          </div>
      </>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default SearchSection;
