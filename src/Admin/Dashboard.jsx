import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const cookies = new Cookies();

const tableStyles = {
  container: "overflow-auto max-h-[600px] shadow-md rounded-lg",
  tableWrapper: "min-w-full divide-y divide-gray-200",
  stickyHeader: "bg-gray-50 sticky top-0 z-10",
  messageCell: "px-6 py-4 max-w-[100px] overflow-y-auto whitespace-pre-wrap",
  cell: "px-6 py-4 whitespace-nowrap"
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('queries');
  const navigate = useNavigate();
  const [downloadError, setDownloadError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('fullName'); // default search field

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = cookies.get('TOKEN');
      
      // Check if token exists
      if (!token) {
        console.log('No token found');
        navigate('/admin/login');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const axiosConfig = {
        headers,
        withCredentials: true // Enable credentials
      };

      // Fetch all data in parallel
      const [
        getInTouchRes,
        queriesRes,
        studentFormsRes,
        projectsRes,
        careersRes
      ] = await Promise.all([
        axios.get('https://qg.vidyantra-dev.com/qubicgen/allRequests', axiosConfig),
        axios.get('https://qg.vidyantra-dev.com/qubicgen/allQueries', axiosConfig),
        axios.get('https://qg.vidyantra-dev.com/qubicgen/student-forms', axiosConfig),
        axios.get('https://qg.vidyantra-dev.com/qubicgen/projects', axiosConfig),
        axios.get('https://qg.vidyantra-dev.com/qubicgen/allCareers', axiosConfig)
      ]);

      setData({
        getInTouches: getInTouchRes.data || [],
        queries: queriesRes.data || [],
        students: studentFormsRes.data || [],
        projects: projectsRes.data || [],
        jobApplications: careersRes.data || [],
        // newJobs: [] // Keep if needed
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // If unauthorized, redirect to login
      if (error.response?.status === 401 || error.response?.status === 403) {
        cookies.remove('TOKEN', { path: '/' }); // Clear invalid token
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    cookies.remove('TOKEN', { path: '/' });
    navigate('/admin/login');
  };

  const handleDownload = async (resumePath, jobId) => {
    try {
      setDownloadStatus(prev => ({ ...prev, [jobId]: 'downloading' }));
      
      const token = cookies.get('TOKEN');
      // Use the complete URL to your backend
      const response = await fetch(
        `https://qg.vidyantra-dev.com/${resumePath}`, // resumePath already contains 'uploads/resumes/filename'
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get original filename from the path
      const originalFilename = resumePath.split('/').pop();

      const blob = await response.blob();
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary link element
      const a = document.createElement('a');
      a.href = url;
      a.download = originalFilename; // Use the original filename
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show success status
      setDownloadStatus(prev => ({ ...prev, [jobId]: 'success' }));
      toast.success('Resume downloaded successfully');

      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [jobId]: undefined }));
      }, 3000);

    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus(prev => ({ ...prev, [jobId]: 'error' }));
      toast.error('Failed to download resume');

      // Reset error status after 3 seconds
      setTimeout(() => {
        setDownloadStatus(prev => ({ ...prev, [jobId]: undefined }));
      }, 3000);
    }
  };

  const getFilteredData = (dataArray) => {
    if (!searchTerm) return dataArray;
    
    return dataArray.filter(item => {
      const searchValue = item[searchField]?.toString().toLowerCase() || '';
      return searchValue.includes(searchTerm.toLowerCase());
    });
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const exportToExcel = async (data, fileName) => {
    try {
      setIsDownloading(true);
      let exportData = [];
      const zip = new JSZip();
      const resumeFolder = zip.folder("resumes");
      
      switch(fileName) {
        case 'JobApplications':
          // Create a map to store file names and their new paths in the zip
          const fileMap = new Map();
          
          // First, download all resumes and add them to the zip
          for (const job of data.jobApplications) {
            if (job.resume) {
              try {
                const response = await fetch(`https://qg.vidyantra-dev.com/${job.resume}`, {
                  headers: {
                    'Authorization': `Bearer ${cookies.get('TOKEN')}`
                  }
                });
                
                if (response.ok) {
                  const blob = await response.blob();
                  const fileName = job.resume.split('/').pop();
                  const safeFileName = `${job.fullName}_${fileName}`.replace(/[^a-z0-9.]/gi, '_');
                  
                  await resumeFolder.file(safeFileName, blob);
                  fileMap.set(job.id, safeFileName);
                }
              } catch (error) {
                console.error(`Failed to download resume for ${job.fullName}:`, error);
              }
            }
          }

          exportData = data.jobApplications.map(job => ({
            'Full Name': job.fullName,
            'Gender': job.gender,
            'Phone Number': job.phoneNumber,
            'WhatsApp Number': job.whatsappNumber,
            'Personal Email': job.personalEmail,
            'Office Email': job.officeEmail,
            'Course': job.course,
            'Branch': job.branch,
            'College Name': job.collegeName,
            'Address': job.address,
            'Passed Out Year': new Date(job.passedOutYear).toLocaleDateString(),
            '10th Percentage': job.tenthPercentage,
            '12th Percentage': job.twelthPercentage,
            'Graduation Percentage': job.graduationPercentage,
            'Resume File': fileMap.get(job.id) || 'No Resume',
            'Resume Link': job.resume ? `https://qg.vidyantra-dev.com/${job.resume}` : 'No Resume',
            'Comments': job.comments,
            'Applied Date': new Date(job.createdAt).toLocaleString()
          }));
          break;

        case 'Queries':
          exportData = data.queries.map(query => ({
            'Name': `${query.firstName} ${query.lastName}`,
            'Email': query.email,
            'Message': query.message,
            'Date': new Date(query.date).toLocaleString()
          }));
          break;

        case 'Projects':
          exportData = data.projects.map(project => ({
            'Name': project.name,
            'Email': project.email,
            'Phone': project.phone,
            'Job Title': project.jobTitle,
            'Company': project.company,
            'Message': project.message,
            'Date': new Date(project.date).toLocaleString()
          }));
          break;

        case 'Students':
          exportData = data.students.map(student => ({
            'Name': student.name,
            'Email': student.email,
            'Phone': student.phone,
            'Course': student.course,
            'Stream': student.stream,
            'College': student.college,
            'Message': student.message,
            'Date': new Date(student.date).toLocaleString()
          }));
          break;

        case 'GetInTouch':
          exportData = data.getInTouches.map(touch => ({
            'Name': touch.fullName,
            'Email': touch.email,
            'Message': touch.message,
            'Date': new Date(touch.date).toLocaleString()
          }));
          break;

        default:
          return;
      }

      // Create Excel file
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      
      // Auto-size columns
      const colWidths = [];
      exportData.forEach(row => {
        Object.keys(row).forEach((key, i) => {
          const value = String(row[key]);
          colWidths[i] = Math.max(colWidths[i] || 0, value.length);
        });
      });
      ws['!cols'] = colWidths.map(w => ({ wch: w }));

      // Add Excel file to zip
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      zip.file(`${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`, excelBuffer);

      // Generate and download zip file
      const zipContent = await zip.generateAsync({ type: 'blob' });
      saveAs(zipContent, `${fileName}_with_resumes_${new Date().toISOString().split('T')[0]}.zip`);

      toast.success(`${fileName} exported successfully!`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!data) return <div>Loading...</div>;

  const renderContent = () => {
    const renderSearchBar = () => (
      <div className="flex gap-4 mb-4">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="fullName">Name</option>
          <option value="email">Email</option>
          <option value="course">Course</option>
          <option value="collegeName">College</option>
          <option value="phoneNumber">Phone</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          autoFocus
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );

    const renderExportButton = () => (
      <button
        onClick={() => exportToExcel(data, activeTab.charAt(0).toUpperCase() + activeTab.slice(1))}
        className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export to Excel
      </button>
    );

    const TableContainer = ({ children }) => (
      <div>
        <div className="flex justify-between items-center mb-4">
          {renderSearchBar()}
          {renderExportButton()}
        </div>
        <div className={tableStyles.container}>
          {children}
        </div>
      </div>
    );

    switch (activeTab) {
      case 'queries':
        const filteredQueries = getFilteredData(data.queries);
        return (
          <TableContainer>
            <table className={tableStyles.tableWrapper}>
              <thead className={tableStyles.stickyHeader}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQueries.map((query) => (
                  <tr key={query._id} className="hover:bg-gray-50">
                    <td className={tableStyles.cell}>{query.firstName} {query.lastName}</td>
                    <td className={tableStyles.cell}>{query.email}</td>
                    <td className={tableStyles.messageCell}>{query.message}</td>
                    <td className={tableStyles.cell}>
                      {new Date(query.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        );

      case 'projects':
        const filteredProjects = getFilteredData(data.projects);
        return (
          <TableContainer>
            <table className={tableStyles.tableWrapper}>
              <thead className={tableStyles.stickyHeader}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className={tableStyles.cell}>{project.name}</td>
                    <td className={tableStyles.cell}>{project.email}</td>
                    <td className={tableStyles.cell}>{project.phone}</td>
                    <td className={tableStyles.cell}>{project.jobTitle}</td>
                    <td className={tableStyles.cell}>{project.company}</td>
                    <td className={tableStyles.messageCell}>{project.message}</td>
                    <td className={tableStyles.cell}>
                      {new Date(project.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        );

      case 'students':
        const filteredStudents = getFilteredData(data.students);
        return (
          <TableContainer>
            <table className={tableStyles.tableWrapper}>
              <thead className={tableStyles.stickyHeader}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stream</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className={tableStyles.cell}>{student.name}</td>
                    <td className={tableStyles.cell}>{student.email}</td>
                    <td className={tableStyles.cell}>{student.phone}</td>
                    <td className={tableStyles.cell}>{student.course}</td>
                    <td className={tableStyles.cell}>{student.stream}</td>
                    <td className={tableStyles.cell}>{student.college}</td>
                    <td className={tableStyles.messageCell}>{student.message}</td>
                    <td className={tableStyles.cell}>
                      {new Date(student.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        );

      case 'getInTouches':
        const filteredTouches = getFilteredData(data.getInTouches);
        return (
          <TableContainer>
            <table className={tableStyles.tableWrapper}>
              <thead className={tableStyles.stickyHeader}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTouches.map((touch) => (
                  <tr key={touch._id} className="hover:bg-gray-50">
                    <td className={tableStyles.cell}>{touch.fullName}</td>
                    <td className={tableStyles.cell}>{touch.email}</td>
                    <td className={tableStyles.messageCell}>{touch.message}</td>
                    <td className={tableStyles.cell}>
                      {new Date(touch.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        );

      case 'jobApplications':
        const filteredApplications = getFilteredData(data.jobApplications);
        return (
          <TableContainer>
            <table className={tableStyles.tableWrapper}>
              <thead className={tableStyles.stickyHeader}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className={tableStyles.cell}>{job.fullName}</td>
                    <td className={tableStyles.cell}>{job.gender}</td>
                    <td className={tableStyles.cell}>
                      <div>
                        <p>Phone: {job.phoneNumber}</p>
                        <p>WhatsApp: {job.whatsappNumber}</p>
                      </div>
                    </td>
                    <td className={tableStyles.cell}>
                      <div>
                        <p>Personal: {job.personalEmail}</p>
                        <p>Office: {job.officeEmail}</p>
                      </div>
                    </td>
                    <td className={tableStyles.cell}>
                      <div>
                        <p>Course: {job.course}</p>
                        <p>Branch: {job.branch}</p>
                        <p>College: {job.collegeName}</p>
                      </div>
                    </td>
                    <td className={tableStyles.cell}>
                      <div>
                        <p>10th: {job.tenthPercentage}</p>
                        <p>12th: {job.twelthPercentage}</p>
                        <p>Graduation: {job.graduationPercentage}</p>
                      </div>
                    </td>
                    <td className={tableStyles.cell}>
                      {job.resume ? (
                        <button
                          onClick={() => handleDownload(job.resume, job.id)}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            downloadStatus[job.id] === 'downloading'
                              ? 'bg-yellow-100 text-yellow-800'
                              : downloadStatus[job.id] === 'error'
                              ? 'bg-red-100 text-red-800'
                              : downloadStatus[job.id] === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          disabled={downloadStatus[job.id] === 'downloading'}
                        >
                          {downloadStatus[job.id] === 'downloading' ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Downloading...
                            </span>
                          ) : downloadStatus[job.id] === 'error' ? (
                            'Download Failed'
                          ) : downloadStatus[job.id] === 'success' ? (
                            'Downloaded'
                          ) : (
                            'Download Resume'
                          )}
                        </button>
                      ) : (
                        <span className="text-gray-400">No resume</span>
                      )}
                    </td>
                    <td className={tableStyles.messageCell}>{job.comments}</td>
                    <td className={tableStyles.cell}>
                      {new Date(job.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        );

      case 'newJobs':
        return (
          <TableContainer>
            <table className={tableStyles.tableWrapper}>
              {/* Existing newJobs table */}
            </table>
          </TableContainer>
        );

      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <div className=" bg-white overflow-hidden shadow rounded-lg flex justify-center items-center">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-col justify-center items-center ">
                  <div className="text-2xl font-bold text-gray-900 text-center">{data.queries.length}</div>
                  <div className="mt-1 text-sm text-gray-500 text-center">Queries</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg flex justify-center items-center">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-col justify-center items-center ">
                  <div className="text-2xl font-bold text-gray-900 text-center">{data.getInTouches.length}</div>
                  <div className="mt-1 text-sm text-gray-500 text-center">Get In Touch</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg flex justify-center items-center">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-col justify-center items-center ">
                  <div className="text-2xl font-bold text-gray-900 text-center">{data.jobApplications.length}</div>
                  <div className="mt-1 text-sm text-gray-500 text-center">Job Applications</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg flex justify-center items-center">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-col justify-center items-center ">
                  <div className="text-2xl font-bold text-gray-900 text-center">{data.projects.length}</div>
                  <div className="mt-1 text-sm text-gray-500 text-center">Projects</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg flex justify-center items-center">
            <div className="p-5">
              <div className="flex items-center ">
                <div className="flex-col justify-center items-center ">
                  <div className="text-2xl font-bold text-gray-900 text-center">{data.students.length}</div>
                  <div className="mt-1 text-sm text-gray-500">Students</div>
                </div>
              </div>
            </div>
          </div>
         
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="sm:hidden">
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="queries">Queries</option>
              <option value="projects">Projects</option>
              <option value="students">Students</option>
              <option value="getInTouches">Get In Touches</option>
              <option value="jobApplications">Job Applications</option>
              {/* <option value="newJobs">New Jobs</option> */}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {[
                  'queries',
                  'getInTouches',
                  'jobApplications',
                  'projects',
                  'students',
                  
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      ${activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
                    `}
                  >
                    {tab.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
