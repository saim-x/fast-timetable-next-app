// import * as XLSX from 'xlsx';
// import path from 'path';
// import { promises as fs } from 'fs';
// import { NextRequest, NextResponse } from 'next/server';

// const standardizeTime = (timing: any) => {
//   if (typeof timing === 'string') {
//     const parts = timing.split('-');
//     return parts.length === 2 ? { start: parts[0].trim(), end: parts[1].trim() } : { start: 'Unknown', end: 'Unknown' };
//   }
//   return { start: 'Unknown', end: 'Unknown' };
// };

// export async function POST(req: NextRequest) {
//   const { section } = await req.json();

//   if (!section) {
//     return NextResponse.json({ error: 'Section is required' }, { status: 400 });
//   }

//   try {
//     // Use the public directory to access the file
//     const filePath = path.resolve(process.cwd(), 'public', 'timetable.xlsx');
//     console.log(`Reading file from: ${filePath}`);

//     // Read the file asynchronously
//     const fileBuffer = await fs.readFile(filePath);

//     // Parse the workbook
//     const workbook = XLSX.read(fileBuffer);
//     const sheetNames = workbook.SheetNames;
//     const results: Record<string, any[]> = {};

//     for (const day of sheetNames) {
//       const worksheet = workbook.Sheets[day];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       console.log(`Data from sheet ${day}:`, data);

//       const timings = data[2].slice(1);
//       const locations = data.slice(4).map(row => row[0]);
//       const processedData = data.slice(4).map(row => row.slice(1));

//       const filteredData = [];

//       for (let i = 0; i < processedData.length; i++) {
//         for (let j = 0; j < processedData[i].length; j++) {
//           const cell = processedData[i][j];
//           if (cell && cell.includes(section)) {
//             const [course, instructor] = cell.split('\n').map(str => str.trim());
//             const timing = standardizeTime(timings[j]).start;
//             filteredData.push({
//               location: locations[i] || 'Unknown',
//               timing,
//               course: course || 'Unknown',
//               instructor: instructor || 'Unknown',
//             });
//           }
//         }
//       }

//       filteredData.sort((a, b) => a.timing.localeCompare(b.timing));

//       results[day] = filteredData;
//     }

//     const output = Object.entries(results).map(([day, courses]) => {
//       const formattedCourses = courses.map(({ location, timing, course, instructor }) => 
//         `| ${location.padEnd(12)} | ${timing.padEnd(11)} | ${course.padEnd(11)} | ${instructor.padEnd(18)} |`
//       ).join('\n');

//       return `
// ==================== ${day.toUpperCase()} ====================

// Filtered Courses and Instructors:

// +--------------+-------------+-------------+--------------------+
// | Location     | Timing      | Course      | Instructor         |
// +--------------+-------------+-------------+--------------------+
// ${formattedCourses}
// +--------------+-------------+-------------+--------------------+

// ============================================================
//       `;
//     }).join('\n');

//     return NextResponse.json({ output });
//   } catch (error) {
//     console.error('Error processing the file:', error);
//     return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
//   }
// }





//WORKING PERFECTLY BUT TIMING ISSUE

// import * as XLSX from 'xlsx';
// import path from 'path';
// import fs from 'fs';
// import { NextRequest, NextResponse } from 'next/server';

// const standardizeTime = (timing: any) => {
//     if (typeof timing === 'string') {
//         const parts = timing.split('-');
//         return parts.length === 2 ? { start: parts[0].trim(), end: parts[1].trim() } : { start: 'Unknown', end: 'Unknown' };
//     }
//     return { start: 'Unknown', end: 'Unknown' };
// };

// export async function POST(req: NextRequest) {
//     const { section } = await req.json();

//     if (!section) {
//         return NextResponse.json({ error: 'Section is required' }, { status: 400 });
//     }

//     try {
//         const filePath = path.resolve(process.cwd(), 'public', 'timetable.xlsx');
//         console.log(`Reading file from: ${filePath}`);

//         if (!fs.existsSync(filePath)) {
//             throw new Error('File does not exist');
//         }

//         const fileBuffer = fs.readFileSync(filePath);
//         const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
//         const sheetNames = workbook.SheetNames;
//         const results: Record<string, any[]> = {};

//         for (const day of sheetNames) {
//             const worksheet = workbook.Sheets[day];
//             const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             console.log(`Data from sheet ${day}:`, data);

//             const timings = data[2].slice(1);
//             const locations = data.slice(4).map(row => row[0]);
//             const processedData = data.slice(4).map(row => row.slice(1));

//             const filteredData = [];

//             for (let i = 0; i < processedData.length; i++) {
//                 for (let j = 0; j < processedData[i].length; j++) {
//                     const cell = processedData[i][j];
//                     if (cell && cell.includes(section)) {
//                         const [course, instructor] = cell.split('\n').map(str => str.trim());
//                         const timing = standardizeTime(timings[j]).start;
//                         filteredData.push({
//                             location: locations[i] || 'Unknown',
//                             timing,
//                             course: course || 'Unknown',
//                             instructor: instructor || 'Unknown',
//                         });
//                     }
//                 }
//             }

//             filteredData.sort((a, b) => a.timing.localeCompare(b.timing));

//             results[day] = filteredData;
//         }

//         return NextResponse.json({ timetable: results });
//     } catch (error) {
//         console.error('Error processing the file:', error);
//         return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
//     }
// }


// //Sorting CORRECTLY
// import * as XLSX from 'xlsx';
// import path from 'path';
// import fs from 'fs';
// import { NextRequest, NextResponse } from 'next/server';

// // Convert time to 24-hour format for sorting
// const convertTo24Hour = (time: string) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     if (hours >= 8 && hours < 12) {
//         return hours; // 8 AM to 12 PM
//     } else if (hours >= 1 && hours <= 5) {
//         return hours + 12; // 1 PM to 5 PM
//     }
//     return hours; // Default to hours (for 12 PM to 8 AM case)
// };

// // Convert 24-hour time to 12-hour format with AM/PM
// const convertTo12Hour = (time: number) => {
//     const period = time >= 12 ? 'PM' : 'AM';
//     const displayHours = time % 12 || 12;
//     return `${displayHours}:${('0' + (time % 60)).slice(-2)} ${period}`;
// };

// const standardizeTime = (timing: any) => {
//     if (typeof timing === 'string') {
//         const parts = timing.split('-');
//         if (parts.length === 2) {
//             const start = parts[0].trim();
//             const start24 = convertTo24Hour(start);
//             return { 
//                 start24,
//                 startDisplay: convertTo12Hour(start24),
//             };
//         }
//     }
//     return { start24: 0, startDisplay: 'Unknown' };
// };

// export async function POST(req: NextRequest) {
//     const { section } = await req.json();

//     if (!section) {
//         return NextResponse.json({ error: 'Section is required' }, { status: 400 });
//     }

//     try {
//         const filePath = path.resolve(process.cwd(), 'public', 'timetable.xlsx');
//         console.log(`Reading file from: ${filePath}`);

//         if (!fs.existsSync(filePath)) {
//             throw new Error('File does not exist');
//         }

//         const fileBuffer = fs.readFileSync(filePath);
//         const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
//         const sheetNames = workbook.SheetNames;
//         const results: Record<string, any[]> = {};

//         for (const day of sheetNames) {
//             const worksheet = workbook.Sheets[day];
//             const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             console.log(`Data from sheet ${day}:`, data);

//             const timings = data[2].slice(1);
//             const locations = data.slice(4).map(row => row[0]);
//             const processedData = data.slice(4).map(row => row.slice(1));

//             let filteredData: any[] = [];

//             for (let i = 0; i < processedData.length; i++) {
//                 for (let j = 0; j < processedData[i].length; j++) {
//                     const cell = processedData[i][j];
//                     if (cell && cell.includes(section)) {
//                         const [course, instructor] = cell.split('\n').map(str => str.trim());
//                         const timing = standardizeTime(timings[j]);
//                         filteredData.push({
//                             location: locations[i] || 'Unknown',
//                             start: timing.startDisplay,
//                             course: course || 'Unknown',
//                             instructor: instructor || 'Unknown',
//                             start24: timing.start24 // For sorting purposes
//                         });
//                     }
//                 }
//             }

//             // Sorting by start time (converted to 24-hour format)
//             filteredData.sort((a, b) => a.start24 - b.start24);

//             // Format the time for display
//             filteredData = filteredData.map(item => ({
//                 ...item,
//                 start: item.start // This should already be in the correct format
//             }));

//             results[day] = filteredData;
//         }

//         return NextResponse.json({ timetable: results });
//     } catch (error) {
//         console.error('Error processing the file:', error);
//         return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
//     }
// }

// //FINALLY
// import * as XLSX from 'xlsx';
// import path from 'path';
// import fs from 'fs';
// import { NextRequest, NextResponse } from 'next/server';

// const convertTo24Hour = (time: string) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     let hours24 = hours;

//     if (hours < 8) {
//         hours24 += 12; 
//     } else if (hours === 12) {
//         hours24 = 0; // Midnight case
//     }

//     return hours24 * 100 + minutes; 
// };

// const convertTo12Hour = (time: number) => {
//     const hours = Math.floor(time / 100);
//     const minutes = time % 100;
//     const period = hours >= 12 ? 'PM' : 'AM';
//     const displayHours = hours % 12 || 12;
//     return `${displayHours}:${('0' + minutes).slice(-2)} ${period}`;
// };

// const standardizeTime = (timing: any) => {
//     if (typeof timing === 'string') {
//         const [start, end] = timing.split('-').map(t => t.trim());
//         const start24 = convertTo24Hour(start);
//         return { 
//             start24,
//             startDisplay: convertTo12Hour(start24),
//         };
//     }
//     return { start24: 0, startDisplay: 'Unknown' };
// };

// export async function POST(req: NextRequest) {
//     const { section } = await req.json();

//     if (!section) {
//         return NextResponse.json({ error: 'Section is required' }, { status: 400 });
//     }

//     try {
//         const filePath = path.resolve(process.cwd(), 'public', 'timetable.xlsx');
//         console.log(`Reading file from: ${filePath}`);

//         if (!fs.existsSync(filePath)) {
//             throw new Error('File does not exist');
//         }

//         const fileBuffer = fs.readFileSync(filePath);
//         const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
//         const sheetNames = workbook.SheetNames;
//         const results: Record<string, any[]> = {};

//         for (const day of sheetNames) {
//             const worksheet = workbook.Sheets[day];
//             const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             console.log(`Data from sheet ${day}:`, data);

//             const timings = data[2].slice(1);
//             const locations = data.slice(4).map(row => row[0]);
//             const processedData = data.slice(4).map(row => row.slice(1));

//             let filteredData: any[] = [];

//             for (let i = 0; i < processedData.length; i++) {
//                 for (let j = 0; j < processedData[i].length; j++) {
//                     const cell = processedData[i][j];
//                     if (cell && cell.includes(section)) {
//                         const [course, instructor] = cell.split('\n').map(str => str.trim());
//                         const timing = standardizeTime(timings[j]);
//                         filteredData.push({
//                             location: locations[i] || 'Unknown',
//                             start: timing.startDisplay,
//                             course: course || 'Unknown',
//                             instructor: instructor || 'Unknown',
//                             start24: timing.start24 
//                         });
//                     }
//                 }
//             }

//             filteredData.sort((a, b) => a.start24 - b.start24);

//             filteredData = filteredData.map(item => ({
//                 ...item,
//                 start: item.start 
//             }));

//             results[day] = filteredData;
//         }

//         return NextResponse.json({ timetable: results });
//     } catch (error) {
//         console.error('Error processing the file:', error);
//         return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
//     }
// }


// import * as XLSX from 'xlsx';
// import path from 'path';
// import fs from 'fs';
// import { NextRequest, NextResponse } from 'next/server';

// const convertTo24Hour = (time: string) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     let hours24 = hours;

//     if (hours < 8) {
//         hours24 += 12; 
//     } else if (hours === 12) {
//         hours24 = 12; // Midnight case
//     }

//     return hours24 * 100 + minutes; 
// };

// const convertTo12Hour = (time: number) => {
//     const hours = Math.floor(time / 100);
//     const minutes = time % 100;
//     const period = hours >= 12 ? 'PM' : 'AM';
//     const displayHours = hours % 12 || 12;
//     return `${displayHours}:${('0' + minutes).slice(-2)} ${period}`;
// };

// const standardizeTime = (timing: any) => {
//     if (typeof timing === 'string') {
//         const [start, end] = timing.split('-').map(t => t.trim());
//         const start24 = convertTo24Hour(start);
//         return { 
//             start24,
//             startDisplay: convertTo12Hour(start24),
//         };
//     }
//     return { start24: 0, startDisplay: 'Unknown' };
// };

// export async function POST(req: NextRequest) {
//     const { section } = await req.json();

//     if (!section) {
//         return NextResponse.json({ error: 'Section is required' }, { status: 400 });
//     }

//     try {
//         const filePath = path.resolve(process.cwd(), 'public', 'timetable.xlsx');
//         console.log(`Reading file from: ${filePath}`);

//         if (!fs.existsSync(filePath)) {
//             throw new Error('File does not exist');
//         }

//         const fileBuffer = fs.readFileSync(filePath);
//         const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
//         const sheetNames = workbook.SheetNames;
//         const results: Record<string, any[]> = {};

//         for (const day of sheetNames) {
//             const worksheet = workbook.Sheets[day];
//             const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

//             console.log(`Data from sheet ${day}:`, data);

//             if (data.length < 5) {
//                 console.warn(`Sheet ${day} does not have enough rows.`);
//                 continue;
//             }

//             const timings = data[2]?.slice(1) || [];
//             const locations = data.slice(4).map(row => row[0] || 'Unknown');
//             const processedData = data.slice(4).map(row => row.slice(1));

//             let filteredData: any[] = [];

//             for (let i = 0; i < processedData.length; i++) {
//                 for (let j = 0; j < processedData[i].length; j++) {
//                     const cell = processedData[i][j];
//                     if (cell && cell.includes(section)) {
//                         const [course, instructor] = cell.split('\n').map((str: string) => str.trim());
//                         const timing = standardizeTime(timings[j]);
//                         filteredData.push({
//                             location: locations[i] || 'Unknown',
//                             start: timing.startDisplay,
//                             course: course || 'Unknown',
//                             instructor: instructor || 'Unknown',
//                             start24: timing.start24 
//                         });
//                     }
//                 }
//             }

//             filteredData.sort((a, b) => a.start24 - b.start24);

//             results[day] = filteredData;
//         }

//         return NextResponse.json({ timetable: results });
//     } catch (error) {
//         console.error('Error processing the file:', error);
//         return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
//     }
// }









//WITH TWO SECTIONS
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

const convertTo24Hour = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    let hours24 = hours;

    if (hours < 8) {
        hours24 += 12;
    } else if (hours === 12) {
        hours24 = 12; // Midnight case
    }

    return hours24 * 100 + minutes;
};

const convertTo12Hour = (time: number) => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${('0' + minutes).slice(-2)} ${period}`;
};

const standardizeTime = (timing: any) => {
    if (typeof timing === 'string') {
        const [start, end] = timing.split('-').map(t => t.trim());
        const start24 = convertTo24Hour(start);
        return {
            start24,
            startDisplay: convertTo12Hour(start24),
        };
    }
    return { start24: 0, startDisplay: 'Unknown' };
};

export async function POST(req: NextRequest) {
    const { section } = await req.json();

    if (!section) {
        return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    const sections = section.split(',').map((s: string) => s.trim());

    try {
        const filePath = path.resolve(process.cwd(), 'public', 'timetable5.xlsx');
        console.log(`Reading file from: ${filePath}`);

        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }

        const fileBuffer = fs.readFileSync(filePath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;
        const results: Record<string, any[]> = {};

        for (const day of sheetNames) {
            const worksheet = workbook.Sheets[day];
            const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

            console.log(`Data from sheet ${day}:`, data);

            if (data.length < 5) {
                console.warn(`Sheet ${day} does not have enough rows.`);
                continue;
            }

            const timings = data[2]?.slice(1) || [];
            const locations = data.slice(4).map(row => row[0] || 'Unknown');
            const processedData = data.slice(4).map(row => row.slice(1));

            let filteredData: any[] = [];

            for (let i = 0; i < processedData.length; i++) {
                for (let j = 0; j < processedData[i].length; j++) {
                    const cell = processedData[i][j];

                    if (cell && sections.some((sec: string) => cell.includes(sec))) {
                        const [course, instructor] = cell.split('\n').map((str: string) => str.trim());
                        const timing = standardizeTime(timings[j]);
                        filteredData.push({
                            location: locations[i] || 'Unknown',
                            start: timing.startDisplay,
                            course: course || 'Unknown',
                            instructor: instructor || 'Unknown',
                            start24: timing.start24 
                        });
                    }
                }
            }

            filteredData.sort((a, b) => a.start24 - b.start24);

            results[day] = filteredData;
        }

        return NextResponse.json({ timetable: results });
    } catch (error) {
        console.error('Error processing the file:', error);
        return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
    }
}
