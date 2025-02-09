import { jobList } from '../../Data/JobsData'
import JobCard from '../FindJobs/job-card'

const CompanyJobs = () => {
  return (
    <div className='flex mt-10 flex-wrap gap-5'>
        {
            jobList.map((job, index:number) => <JobCard jobData={job}/>)
        }
    </div>
  )
}

export default CompanyJobs