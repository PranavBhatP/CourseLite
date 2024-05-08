import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ApprovalCard from './ApprovalCard';
const CourseApprovals = ({content, enrollmentApprovals, setEnrollmentApprovals}) => {
    useEffect(() => {
        const fetchEnrollmentApproval = async () => {
            const response = await axios.get('http://localhost:3500/enroll');
            const enrollmentData = await response.data;
            const specificEnrollmentData = enrollmentData.filter(enrollment => (enrollment.status === "Enrolled" && enrollment.studentID.studentID === content.studentID));
            setEnrollmentApprovals(specificEnrollmentData);
            console.log("Fetching approvals....")
        }
        try {
            fetchEnrollmentApproval()
        }
        catch (e) {
            console.log ("Error!: " + e.message);
        }
    },[content])
    return (
        <>
            <div className='flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg'>
                <h2 className='flex items-center text-center text-white text-2xl mb-4'><b> Approved Courses </b></h2>
                <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center w-full'>
                {enrollmentApprovals.length > 0 && enrollmentApprovals.map((approvedCourse, index) => {
                    return (
                        <ApprovalCard key={index} approvedCourse={approvedCourse} />
                    );
                })}
                {enrollmentApprovals.length === 0 && <p>You don't have any approvals yet!</p>}
                </div>
            </div>
        </>
    )
}

export default CourseApprovals;