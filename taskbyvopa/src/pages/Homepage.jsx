import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Overlay from '../components/Overlay';
import TenderDetailsModal from '../components/TenderDetailsModal';

function Homepage() {

    let [data, setData] = useState([]);
    let [isModalOpen, setModalOpen] = useState(false)
    let [isTenderID, setTenderID] = useState(null)

    useEffect(() => {
        const fetchTenderData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tenders`);
            setData(response.data.data)
          } catch (error) {
            console.error('Failed - ', error);
          }
        };
      
        fetchTenderData();
    }, []);

      let handleRowClick = (tenderID) => {
        console.log(tenderID);
        setTenderID(tenderID)
        setModalOpen(!isModalOpen);
      }
      
    return (
        <>
        
            <section className='h-[80vh] mt-20 flex justify-center items-center'>
                {
                    data.length > 0 ?
                    <>
                        <div className='m-3 border dark:border-neutral-800 border-neutral-300 rounded-xl shadow-md overflow-auto h-full theme-transition'>
                            <table className='table w-full'>
                                <thead className='sticky top-0 bg-blue-500 text-white text-left'>
                                    <tr>
                                        <th className='font-medium tracking-wide'>Title</th>
                                        <th className='font-medium tracking-wide'>Category</th>
                                        <th className='font-medium tracking-wide text-nowrap'>Deadline Date</th>
                                        <th className='font-medium tracking-wide'>Supplier</th>
                                        <th className='font-medium tracking-wide'>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((tender) => (
                                            <tr key={tender.id} onClick={() => handleRowClick(tender.id)} className='border-t dark:border-neutral-800 border-neutral-300 text-sm dark:hover:bg-neutral-800 hover:bg-neutral-300 cursor-pointer *:capitalize dark:text-[#cecece] text-[#242424] theme-transition dark:hover:text-white'>
                                                <td>{tender.title || 'N/A'}</td>
                                                <td>{tender.category || 'N/A'}</td>
                                                <td>{tender.deadline_date || 'N/A' }</td>
                                                <td>{tender.awarded[0].suppliers_name || 'N/A'}</td>
                                                <td className='group'>
                                                    <a href={tender.src_url} target='_blank'>
                                                        <svg className='w-6 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 18L18 6M18 6H9M18 6V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </> :
                    <div className='flex flex-col items-center gap-2'>
                        <svg className='w-5 text-blue-500 animate-spin' fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path> </g></svg>
                        <p>Loading Tenders</p>
                    </div>
                }
            </section>
            {
                isModalOpen && <Overlay onEvent={handleRowClick} />
            }
            {
                isModalOpen && <TenderDetailsModal onEvent={handleRowClick} tenderID={isTenderID} />
            }
        </>
    )
}

export default Homepage
