import { useState, useEffect } from 'react';
// import a from "next/a"
import { Input } from "../components/ui/input"
import axios from 'axios';
import { Label } from "../components/ui/label"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../components/ui/table"

function Admin() {
  const [data, setData] = useState({ queries: [], jobApplications: [], contacts: [], getInTouches: [] });
  const [selectedDataType, setSelectedDataType] = useState('queries');
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.qubicgen.com/api/fetchData', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  console.log(data);
 

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };
  return (
    token ? ( (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-yellow-100/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <a className="flex items-center gap-2 font-semibold" href="#">
              <UsersIcon className="h-6 w-6" />
              <span className="">All Forms Data</span>
            </a>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <div className="relative">
                <SearchIcon
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-white-500 " />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                  placeholder="Search individuals..."
                  type="search" />
              </div>
              <div className="mt-4">
                <Label htmlFor="filter" className="text-xl font-semibold">Filter by Type</Label>
                <select id="dataType" value={selectedDataType} onChange={handleDataTypeChange} className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="queries">Queries</option>
                  <option value="jobApplications">Job Applications</option>
                  <option value="contacts">Contacts</option>
                  <option value="getInTouches">Get In Touches</option>
                </select>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-yellow-100/40 px-6">
          <a className="lg:hidden" href="#">
            <UsersIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </a>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-yellow-500" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 "
                  placeholder="Search individuals..."
                  type="search" />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead> Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
            {data[selectedDataType].map((item) => (
              <TableRow key={item._id}>
               <TableCell>{item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.message ? `${item.message} ` : item.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>)
  ): (
    <div>
      You are not logged in. Go to 
      <a href="admin/login">Login</a>
    </div>
  )
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}

export default Admin;