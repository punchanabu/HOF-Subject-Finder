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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
    setErrorMessage('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      {isLoading && (
        <div role="status" className="flex justify-center items-center w-full h-full mt-5">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {(searchResults && 'name' in searchResults)  && (
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
                <p className="text-black font-noto-sans-thai text-xl">&quot;{searchResults.label1}&quot;</p>
                <div className="w-0.5 h-12 bg-orange-300"></div>
              </div>
              <div className="flex flex-col items-center mb-0">
                <p className='text-black font-noto-sans-thai text-2xl'>ฐานสอง</p>
                <FaCircle className="text-orange-500 text-4xl rounded-full" />
                <p className="text-black font-noto-sans-thai text-xl">&quot;{searchResults.label2}&quot;</p>
                <div className="w-0.5 h-12 bg-orange-300"></div>
              </div>
              <div className="flex flex-col items-center mt-0">
                <p className='text-black font-noto-sans-thai text-2xl'>ฐานสาม</p>
                <FaCircle className="text-orange-500 text-4xl rounded-full" />
                <p className="text-black font-noto-sans-thai text-xl">&quot;{searchResults.label3}&quot;</p>
              </div>
            </div>
          </div>
      </>
      )}
      {(searchResults && !('name' in searchResults) && searchResults != null) && <p className='text-red-400 font-noto-sans-thai mt-5'>ไม่เจอชื่อ ในฐานข้อมูล</p>}
      {errorMessage && (
        <p className="mt-4 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default SearchSection;
