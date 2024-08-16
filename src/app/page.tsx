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
"use client";
import { useState, useRef } from "react";
import Router from "next/router";
import html2canvas from "html2canvas";
import { GrInstallOption } from "react-icons/gr";

const HomePage = () => {
  const [section, setSection] = useState("");
  const [timetable, setTimetable] = useState<Record<string, any[]> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const router = Router;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section }),
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

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'timetable.png'; 

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  };

  const renderTable = (data: any[]) => (
    <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-x-auto">
      <thead>
        <tr className="bg-blue-500 text-white text-left">
          <th className="border-b p-2 sm:p-4">Location</th>
          <th className="border-b p-2 sm:p-4">Timing</th>
          <th className="border-b p-2 sm:p-4">Course</th>
          <th className="border-b p-2 sm:p-4">Instructor</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border-b p-2 sm:p-4">{item.location}</td>
            <td className="border-b p-2 sm:p-4">{item.timing}</td>
            <td className="border-b p-2 sm:p-4">{item.course}</td>
            <td className="border-b p-2 sm:p-4">{item.instructor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 sm:p-6 bg-white shadow-md rounded-lg">
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-0 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <span className="gradient-text">FAST</span> Timetable Filter.
        </h1>
        <a
          href="https://github.com/saim-x"
          target="_blank"
          className="text-sm sm:text-base text-blue-600 hover:underline"
        >
          About the Developer
        </a>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6"
      >
        <label
          htmlFor="section"
          className="block text-base sm:text-lg font-medium text-gray-700 mb-2"
        >
          Enter Section:
        </label>
        <input
          id="section"
          type="text"
          placeholder="e.g. BCS-3A"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 sm:p-3 w-full mb-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Get Timetable
        </button>
      </form>
      {error && (
        <p className="text-red-600 text-base sm:text-lg font-medium mb-4">
          {error}
        </p>
      )}
      {timetable && (
        <>
          <button
            onClick={downloadScreenshot}
            className="bg-green-600 text-white p-2 sm:p-3 rounded-lg shadow flex  gap-2 items-center hover:bg-green-700 transition duration-200 mb-6"
          >
            Download Timetable
            <GrInstallOption />
          </button>
          <div ref={screenshotRef} className="mb-6">
            {Object.entries(timetable).map(([day, data]) => (
              <section key={day} className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                  {day}
                </h2>
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
