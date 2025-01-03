import { jobList } from '../Data/JobsData'
import JobCard from '../FindJobs/job-card'

const RecommendedJobs = () => {
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList.map((job, index: number) => (index < 6 &&
          <JobCard key={index} jobData={job} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedJobs