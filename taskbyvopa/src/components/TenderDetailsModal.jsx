import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

function TenderDetailsModal({onEvent, tenderID}) {

    let [data, setData] = useState(null)

    useEffect(() => {
        const fetchTenderData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tenders`);

            let filterData = response.data.data.filter((tender) => tender.id === tenderID);
            if (filterData.length > 0) {
                setData(filterData[0]);
              } else {
                setData(null);
              }
              
          } catch (error) {
            console.error('Failed - ', error);
          }
        };
      
        fetchTenderData();
    }, []);

  return (
        <div className='dark:bg-[#1a1a1a] bg-[#F5F5F5] dark:text-[#F5F5F5] text-[#242424] rounded-xl absolute z-50 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] sm:w-[60vw] w-[90vw] h-[70vh] overflow-hidden'>
            <div className='px-5 py-3 flex justify-between items-center sticky top-0 dark:bg-[#1a1a1a] bg-neutral-300 border-b dark:border-neutral-800 border-neutral-300'>
                <p>Tender Details</p>
                <div className='p-1 dark:hover:bg-neutral-600 hover:bg-neutral-400 transition-all duration-200 rounded-full cursor-pointer'>
                    <svg onClick={onEvent} className='w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                </div>
            </div>
            <div className='p-5 h-[90%] flex items-start overflow-auto'>
                {
                    data?.id ?
                    <div className='grid grid-cols-1 gap-10 w-full'>
                        <div>
                            <p className='font-medium tracking-wide'>Title</p>
                            <p className='text-sm text-[#242424] dark:text-neutral-300 tracking-wide'>{data.title || 'N/A'}</p>
                        </div>
                        <div className='grid md:grid-cols-3 grid-cols-1 w-full gap-5'>
                            <div>
                                <p className='font-medium tracking-wide'>Category</p>
                                <p className='text-sm text-[#242424] dark:text-neutral-300 tracking-wide capitalize'>{data.category || 'N/A'}</p>
                            </div>
                            <div className='col-span-2'>
                                <p className='font-medium tracking-wide'>Supplier</p>
                                <p className='text-sm text-[#242424] dark:text-neutral-300 tracking-wide capitalize'>{data.awarded[0].suppliers_name || 'N/A'}</p>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-3 grid-cols-1 w-full gap-5'>
                            <div>
                                <p className='font-medium tracking-wide'>Date</p>
                                <p className='text-sm text-[#242424] dark:text-neutral-300 tracking-wide capitalize'>{data.date || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='font-medium tracking-wide'>Deadline Date</p>
                                <p className='text-sm text-[#242424] dark:text-neutral-300 tracking-wide capitalize'>{data.deadline_date || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='font-medium tracking-wide'>Days Remaining</p>
                                <p className='text-sm text-[#242424] dark:text-neutral-300 tracking-wide capitalize'>{data.deadline_length_days || 'N/A'}</p>
                            </div>
                        </div>
                    </div> :
                    <div className='flex flex-col items-center justify-center gap-2 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                        <svg className='w-5 text-blue-500 animate-spin' fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path> </g></svg>
                        <p>Loading Tender Details</p>
                    </div>
                }
            </div>
        </div>
  )
}

export default TenderDetailsModal
