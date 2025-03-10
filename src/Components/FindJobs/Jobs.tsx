import { useEffect, useState } from "react";
import Sort from "../UI/Sort";
import JobCard from "./job-card";
import { getAllJobs } from "../../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";
import { resetSort } from "../../Slices/SortSlice";

const Jobs = () => {
  const [jobList, setjobList] = useState([]);
  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort);
  const [filteredJobsList, setFilteredJobsList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    window.scrollTo(0, 0);

    getAllJobs()
      .then((res) => {
        setjobList(res.filter((job: any) => job.jobStatus === "ACTIVE"));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (sort === "Most Recent") {
      setjobList((jobList) =>
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
        )
      );
    } else if (sort == "Salary Low to High") {
      setjobList(() =>
        [...jobList].sort(
          (a: any, b: any) => a.packageOffered - b.packageOffered
        )
      );
    } else if (sort == "Salary High to Low") {
      setjobList(() =>
        [...jobList].sort(
          (a: any, b: any) => b.packageOffered - a.packageOffered
        )
      );
    }
  }, [sort]);

  useEffect(() => {
    let filterJobs = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterJobs = filterJobs.filter((job: any) =>
        filter["Job Title"]?.some((title: any) =>
          job.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filterJobs = filterJobs.filter((job: any) =>
        filter["Job Type"]?.some((title: any) =>
          job.jobType.toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filterJobs = filterJobs.filter((job: any) =>
        filter.Location.some((location: string) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (filter.Experience && filter.Experience.length > 0) {
      filterJobs = filterJobs.filter((job: any) =>
        filter.Experience.some((filterExp: any) =>
          job?.experience.toLowerCase().includes(filterExp.toLowerCase())
        )
      );
    }

    if (filter.Salary && filter.Salary?.length > 0) {
      filterJobs = filterJobs?.filter(
        (job: any) =>
          job.packageOffered >= filter.Salary[0] &&
          job.packageOffered <= filter.Salary[1]
      );
    }

    setFilteredJobsList(filterJobs);
  }, [filter, jobList, sort]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort sort="jobs" />
      </div>
      <div className="mt-10 flex flex-wrap xl:gap-16 items-center justify-start xl:pl-8 lg:pl-6 lg:gap-10 gap-14 pl-10">
        {filteredJobsList?.map((job: any, index: number) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
