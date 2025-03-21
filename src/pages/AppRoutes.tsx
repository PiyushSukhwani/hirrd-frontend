import { Divider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import HomePage from "../pages/home-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "../pages/find-jobs";
import Footer from "../Components/footer/Footer";
import FindTalent from "../pages/find-talent";
import TalentProfile from "../pages/talent-profile";
import PostJobPage from "../pages/post-job-page";
import JobDescPage from "../pages/job-desc-page";
import ApplyJobPage from "../pages/apply-job-page";
import CompanyPage from "../pages/company-page";
import PostedJobPage from "../pages/posted-job-page";
import JobHistoryPage from "../pages/job-history-page";
import SignUpPage from "../pages/signup-page";
import ProfilePage from "../pages/profile-page";
import Header from "../Components/header/Header";
import { ProtectedRoute } from "../Services/ProtectedRoute";
import { PublicRoute } from "../Services/PublicRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Divider size="xs" mx="md" />
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/job-history"
            element={
              <ProtectedRoute allowedRoles={["APPLICANT"]}>
                <JobHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/jobs/:id" element={<JobDescPage />} />
          <Route
            path="/post-job/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-job/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostedJobPage />
              </ProtectedRoute>
            }
          />
          <Route path="/talent-profile/:id" element={<TalentProfile />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
