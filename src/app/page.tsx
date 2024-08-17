// // src/app/page.tsx

// "use client";
// import { useState } from 'react';

// const HomePage = () => {
//   const [section, setSection] = useState('');
//   const [output, setOutput] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/timetable', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ section }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       setOutput(data.output);
//     } else {
//       setOutput(`Error: ${data.error}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 ">Timetable Filter</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <label htmlFor="section" className="block mb-2 text-lg text-black">Enter Section:</label>
//         <input
//           id="section"
//           type="text"
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="border p-2 w-full mb-2"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Get Timetable</button>
//       </form>
//       <pre className="whitespace-pre-wrap bg-gray-100 p-4 border rounded">{output}</pre>
//     </div>
//   );
// };

// export default HomePage;

// src/app/page.tsx

// "use client";
// import { useState } from 'react';

// const HomePage = () => {
//   const [section, setSection] = useState('');
//   const [timetable, setTimetable] = useState<Record<string, any[]> | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/timetable', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ section }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTimetable(data.timetable);
//         setError(null);
//       } else {
//         setError(data.error);
//         setTimetable(null);
//       }
//     } catch (err) {
//       setError('An error occurred');
//       setTimetable(null);
//     }
//   };

//   const renderTable = (data: any[]) => (
//     <table className="min-w-full border-collapse border border-gray-200">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 p-2">Location</th>
//           <th className="border border-gray-300 p-2">Timing</th>
//           <th className="border border-gray-300 p-2">Course</th>
//           <th className="border border-gray-300 p-2">Instructor</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             <td className="border border-gray-300 p-2">{item.location}</td>
//             <td className="border border-gray-300 p-2">{item.timing}</td>
//             <td className="border border-gray-300 p-2">{item.course}</td>
//             <td className="border border-gray-300 p-2">{item.instructor}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Timetable Filter</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <label htmlFor="section" className="block mb-2 text-lg text-black">Enter Section:</label>
//         <input
//           id="section"
//           type="text"
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="border p-2 w-full mb-2"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Get Timetable</button>
//       </form>
//       {error && <p className="text-red-500">{error}</p>}
//       {timetable && (
//         <>
//           {Object.entries(timetable).map(([day, data]) => (
//             <div key={day} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{day}</h2>
//               {renderTable(data)}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;
// "use client";
// import { useState } from 'react';

// const HomePage = () => {
//   const [section, setSection] = useState('');
//   const [timetable, setTimetable] = useState<Record<string, any[]> | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/timetable', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ section }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTimetable(data.timetable);
//         setError(null);
//       } else {
//         setError(data.error);
//         setTimetable(null);
//       }
//     } catch (err) {
//       setError('An error occurred');
//       setTimetable(null);
//     }
//   };

//   const renderTable = (data: any[]) => (
//     <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
//       <thead>
//         <tr className="bg-blue-500 text-white">
//           <th className="border-b p-4">Location</th>
//           <th className="border-b p-4">Timing</th>
//           <th className="border-b p-4">Course</th>
//           <th className="border-b p-4">Instructor</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index} className="hover:bg-gray-100">
//             <td className="border-b p-4">{item.location}</td>
//             <td className="border-b p-4">{item.timing}</td>
//             <td className="border-b p-4">{item.course}</td>
//             <td className="border-b p-4">{item.instructor}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Timetable Filter</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
//         <label htmlFor="section" className="block text-lg font-medium text-gray-700 mb-2">Enter Section:</label>
//         <input
//           id="section"
//           type="text"
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition duration-200">Get Timetable</button>
//       </form>
//       {error && <p className="text-red-600 text-lg font-medium">{error}</p>}
//       {timetable && (
//         <>
//           {Object.entries(timetable).map(([day, data]) => (
//             <div key={day} className="mb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">{day}</h2>
//               {renderTable(data)}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;

//WITH RESPONSIVE DESIGN

// "use client";
// import { useState } from "react";
// import Router from "next/router";
// const HomePage = () => {
//   const [section, setSection] = useState("");
//   const [timetable, setTimetable] = useState<Record<string, any[]> | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);
//   const router = Router;
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/timetable", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ section }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTimetable(data.timetable);
//         setError(null);
//       } else {
//         setError(data.error);
//         setTimetable(null);
//       }
//     } catch (err) {
//       setError("An error occurred");
//       setTimetable(null);
//     }
//   };

//   const renderTable = (data: any[]) => (
//     <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-x-auto">
//       <thead>
//         <tr className="bg-blue-500 text-white text-left">
//           <th className="border-b p-2 sm:p-4">Location</th>
//           <th className="border-b p-2 sm:p-4">Timing</th>
//           <th className="border-b p-2 sm:p-4">Course</th>
//           <th className="border-b p-2 sm:p-4">Instructor</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index} className="hover:bg-gray-100">
//             <td className="border-b p-2 sm:p-4">{item.location}</td>
//             <td className="border-b p-2 sm:p-4">{item.timing}</td>
//             <td className="border-b p-2 sm:p-4">{item.course}</td>
//             <td className="border-b p-2 sm:p-4">{item.instructor}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <header className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 sm:p-6 bg-white shadow-md rounded-lg">
//         <h1
//           className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-0 cursor-pointer"
//           onClick={() => window.location.reload()}

//         >
//           <span className="gradient-text">FAST</span> Timetable Filter.
//         </h1>
//         <a
//           href="https://github.com/saim-x"
//           target="_blank"
//           className="text-sm sm:text-base text-blue-600 hover:underline"
//         >
//           About the Developer
//         </a>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6"
//       >
//         <label
//           htmlFor="section"

//           className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
//         >
//           Enter Section:
//         </label>
//         <input
//           id="section"
//           type="text"
//           placeholder="e.g. BCS-3A"
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="border border-gray-300 rounded-lg p-2 sm:p-3 w-full mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
//         >
//           Get Timetable
//         </button>
//       </form>
//       {error && (
//         <p className="text-red-600 text-base sm:text-lg font-medium mb-4">
//           {error}
//         </p>
//       )}
//       {timetable && (
//         <>
//           {Object.entries(timetable).map(([day, data]) => (
//             <section key={day} className="mb-6 sm:mb-8">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
//                 {day}
//               </h2>
//               {renderTable(data)}
//             </section>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;

//WITH SCREENSHOT FUNCTIONALITY
// "use client";
// import { useState, useRef } from "react";
// import Router from "next/router";
// import html2canvas from "html2canvas";
// import { GrInstallOption } from "react-icons/gr";

// const HomePage = () => {
//   const [section, setSection] = useState("");
//   const [timetable, setTimetable] = useState<Record<string, any[]> | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const screenshotRef = useRef<HTMLDivElement>(null);
//   const router = Router;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/timetable", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ section }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTimetable(data.timetable);
//         setError(null);
//       } else {
//         setError(data.error);
//         setTimetable(null);
//       }
//     } catch (err) {
//       setError("An error occurred");
//       setTimetable(null);
//     }
//   };

//   const downloadScreenshot = async () => {
//     if (screenshotRef.current) {
//       const canvas = await html2canvas(screenshotRef.current);
//       const imgData = canvas.toDataURL("image/png");

//       const link = document.createElement('a');
//       link.href = imgData;
//       link.download = 'timetable.png';

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const renderTable = (data: any[]) => (
//     <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//       <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
//         <tr>
//           <th className="px-4 py-2 text-left">Location</th>
//           <th className="px-4 py-2 text-left">Timing</th>
//           <th className="px-4 py-2 text-left">Course</th>
//           <th className="px-4 py-2 text-left">Instructor</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
//             <td className="px-4 py-2">{item.location}</td>
//             <td className="px-4 py-2">{item.start}</td>
//             <td className="px-4 py-2">{item.course}</td>
//             <td className="px-4 py-2">{item.instructor}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <header className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 sm:p-6 bg-white shadow-lg rounded-lg">
//       <h1
//           className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-0 cursor-pointer"
//           onClick={() => window.location.reload()}
//         >
//           <span className="gradient-text">FAST</span> Timetable Filter.
//         </h1>
//         <a
//           href="https://github.com/saim-x"
//           target="_blank"
//           className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition duration-200"
//         >
//           About the Developer
//         </a>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6"
//       >
//         <label
//           htmlFor="section"
//           className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
//         >
//           Enter Section:
//         </label>
//         <input
//           id="section"
//           type="text"
//           placeholder="e.g. BCS-3A"
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="border border-gray-300 rounded-lg p-2 sm:p-3 w-full mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
//         >
//           Get Timetable
//         </button>
//       </form>
//       {error && (
//         <p className="text-red-600 text-base sm:text-lg font-medium mb-4">
//           {error}
//         </p>
//       )}
//       {timetable && (
//         <>
//           <button
//             onClick={downloadScreenshot}
//             className="bg-green-600 text-white p-2 sm:p-3 rounded-lg shadow flex gap-2 items-center hover:bg-green-700 transition duration-200 mb-6"
//           >
//             Download Timetable
//             <GrInstallOption />
//           </button>
//           <div ref={screenshotRef} className="mb-6">
//             {Object.entries(timetable).map(([day, data]) => (
//               <section key={day} className="mb-6 sm:mb-8">
//                 <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
//                   {day}
//                 </h2>
//                 {renderTable(data)}
//               </section>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;



//WITH REDESIGNED DESIGN
// "use client";
// import { useState, useRef } from "react";
// import Router from "next/router";
// import html2canvas from "html2canvas";
// import { GrInstallOption } from "react-icons/gr";

// const HomePage = () => {
//   const [section, setSection] = useState("");
//   const [timetable, setTimetable] = useState<Record<string, any[]> | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const screenshotRef = useRef<HTMLDivElement>(null);
//   const router = Router;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/timetable", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ section }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTimetable(data.timetable);
//         setError(null);
//       } else {
//         setError(data.error);
//         setTimetable(null);
//       }
//     } catch (err) {
//       setError("An error occurred");
//       setTimetable(null);
//     }
//   };

//   const downloadScreenshot = async () => {
//     if (screenshotRef.current) {
//       const canvas = await html2canvas(screenshotRef.current);
//       const imgData = canvas.toDataURL("image/png");

//       const link = document.createElement("a");
//       link.href = imgData;
//       link.download = "timetable.png";

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const renderTable = (data: any[]) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {data.map((item, index) => (
//         <div
//           key={index}
//           className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
//         >
//           <div className="p-4">
//             <p className="font-bold text-lg text-indigo-600 mb-2">{item.course}</p>
//             <p className="text-gray-600">Location: {item.location}</p>
//             <p className="text-gray-600">Timing: {item.start}</p>
//             <p className="text-gray-600">Instructor: {item.instructor}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6 text-gray-800">
//       <header className="w-full max-w-5xl mx-auto mb-8">
//         <div className="flex justify-between items-center bg-white text-gray-800 rounded-lg shadow-lg p-6">
//           <h1
//             className="text-3xl font-extrabold cursor-pointer"
//             onClick={() => window.location.reload()}
//           >
//             FAST Timetable Filter
//           </h1>
//           <a
//             href="https://github.com/saim-x"
//             target="_blank"
//             className="text-blue-600 hover:text-blue-800 transition duration-200"
//           >
//             About the Developer
//           </a>
//         </div>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-8 mb-8"
//       >
//         <label
//           htmlFor="section"
//           className="block text-lg font-semibold mb-4"
//         >
//           Enter Section:
//         </label>
//         <input
//           id="section"
//           type="text"
//           placeholder="e.g. BCS-3A"
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200"
//         >
//           Get Timetable
//         </button>
//       </form>

//       {error && (
//         <p className="bg-red-600 text-white py-3 px-6 rounded-lg mb-6">
//           {error}
//         </p>
//       )}

//       {timetable && (
//         <>
//           <button
//             onClick={downloadScreenshot}
//             className="flex items-center bg-green-600 text-white py-3 px-6 rounded-lg mb-8 hover:bg-green-700 transition duration-200"
//           >
//             Download Timetable <GrInstallOption className="ml-2" />
//           </button>

//           <div ref={screenshotRef} className="w-full max-w-5xl mx-auto">
//             {Object.entries(timetable).map(([day, data]) => (
//               <section key={day} className="mb-12">
//                 <h2 className="text-2xl font-semibold mb-4">{day}</h2>
//                 {renderTable(data)}
//               </section>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;






//WITH TWO SECTIONS
"use client";
import { useState, useRef } from "react";
import Router from "next/router";
import html2canvas from "html2canvas";
import { GrInstallOption } from "react-icons/gr";
import { FiInfo } from "react-icons/fi";
const HomePage = () => {
  const [section, setSection] = useState("");
  const [timetable, setTimetable] = useState<Record<string, any[]> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const router = Router;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clean the input: remove trailing commas, consecutive commas, and trim each section
    const cleanedSections = section
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== ''); // Remove empty strings
  
    // Join the cleaned sections back into a single string separated by commas
    const cleanedSection = cleanedSections.join(',');
  
    try {
      const response = await fetch("/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: cleanedSection }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setTimetable(data.timetable);
        setError(null);
      } else {
        setError(data.error);
        setTimetable(null);
      }
    } catch (err) {
      setError("An error occurred");
      setTimetable(null);
    }
  };
  

  const downloadScreenshot = async () => {
    if (screenshotRef.current) {
      const canvas = await html2canvas(screenshotRef.current);
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = imgData;
      link.download = "timetable.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderTable = (data: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
        >
          <div className="p-4">
            <p className="font-bold text-lg text-indigo-600 mb-2">{item.course}</p>
            <p className="text-gray-600">Location: {item.location}</p>
            <p className="text-gray-600">Timing: {item.start}</p>
            <p className="text-gray-600">Instructor: {item.instructor}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6 text-gray-800">
      <header className="w-full max-w-5xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white text-gray-800 rounded-lg shadow-lg p-6">
          <h1
            className="text-3xl font-extrabold cursor-pointer"
            onClick={() => window.location.reload()}
          >
            FAST Timetable Filter
          </h1>
          <a
            href="https://github.com/saim-x"
            target="_blank"
            className="text-blue-600 hover:text-blue-800 transition duration-200"
          >
            About the Developer
          </a>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-8 mb-8"
      >
        <label
          htmlFor="section"
          className="block text-lg font-semibold mb-4"
        >
          Enter Section:
        </label>
        <input
          id="section"
          type="text"
          placeholder="e.g. BCS-3A or BCS-3A, BCS-3B"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          required
        />
        <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md bg-gray-100 mb-4 text-gray-600 text-xs">
          <FiInfo className="text-gray-400" />
          <p>To add elective courses, add sections followed by comma</p>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Get Timetable
        </button>
      </form>

      {error && (
        <p className="bg-red-600 text-white py-3 px-6 rounded-lg mb-6">
          {error}
        </p>
      )}

      {timetable && (
        <>
          <button
            onClick={downloadScreenshot}
            className="flex items-center bg-green-600 text-white py-3 px-6 rounded-lg mb-8 hover:bg-green-700 transition duration-200"
          >
            Download Timetable <GrInstallOption className="ml-2" />
          </button>

          <div ref={screenshotRef} className="w-full max-w-5xl mx-auto">
            {Object.entries(timetable).map(([day, data]) => (
              <section key={day} className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{day}</h2>
                {renderTable(data)}
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

