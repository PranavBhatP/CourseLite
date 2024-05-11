import React, { useState , useEffect, useParams} from 'react'
import DetailCard from './DetailCard';
import Dropdown from './Dropdown';
import axios from 'axios';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
const Content = ({content}) => {
    const [asset, setAsset] = useState('s');
    const [assetList, setAssetList] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setShowMore(!showMore);
    }
    const fetchStudents = async () => {
        try { 
            const studentResponse = await axios.get('http://localhost:3500/students');
            const studentData = await studentResponse.data;
            setAssetList(studentData);
        }
        catch(e) {
            console.log(e);
        }
    }
    const fetchFaculty = async () => {
        try { 
            const facultyResponse = await axios.get('http://localhost:3500/faculty');
            const facultyData = await facultyResponse.data;
            setAssetList(facultyData);
        }
        catch(e) {
            console.log(e);
        }
    }

    const fetchCourses = async () => {
        try { 
            const courseResponse = await axios.get('http://localhost:3500/courses');
            const courseData = await courseResponse.data;
            setAssetList(courseData);
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        switch(asset) {
            case 's' : {
                fetchStudents();
            } break;
            case 'f' : {
                fetchFaculty();
            } break;
            case 'c' : {
                fetchCourses();
            } break;
            default : console.log("Invalid asset")
        }
    },[asset])
    return (
        <main className='flex items-center h-full justify-center flex-col gap-y-10 gap width-full m-6'>
            <div className = "flex p-3 w-11/12 items-center flex-col text-white justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg">
            <h2 className=' flex items-center text-center text-2xl mb-4'><br></br><b> Faculty Details </b></h2>
            <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center gap-x-4 w-full'>
                <DetailCard field ="Name" text = {content.name}/>
                <DetailCard field ="Email" text = {content.email}/>
            </div>
            </div>
            <div className = "flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg">
                <h2 className=' flex items-center text-center text-2xl text-white mb-4'><br></br><b> Search Asset </b></h2>
                <Dropdown asset = {asset} setAsset={setAsset}/>
                <form onSubmit={(e) => e.preventDefault()}>
                    {asset !== 'c' && <button 
                        type = "submit"
                        onClick = {() => { navigate(`/admin/${content.email.split('@')[0].toLowerCase()}/newAsset`, { state : { assetType : asset } })}}
                        className = " mt-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        + New Asset
                    </button>}
                </form>
                <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center gap-x-4 w-full'>
                    { assetList.length > 0 && assetList.slice(0, showMore ? assetList.length : 4).map(item => (
                            <Card item = {item} asset = {asset}/>
                    ))}
                </div>
                {<button 
                    onClick = {handleClick}
                    className ="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                   {!showMore ? "View More..." : "View Less"}
                </button>}
            </div>
        </main>
  )
}

export default Content;