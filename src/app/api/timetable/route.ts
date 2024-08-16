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







import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

const standardizeTime = (timing: any) => {
    if (typeof timing === 'string') {
        const parts = timing.split('-');
        return parts.length === 2 ? { start: parts[0].trim(), end: parts[1].trim() } : { start: 'Unknown', end: 'Unknown' };
    }
    return { start: 'Unknown', end: 'Unknown' };
};

export async function POST(req: NextRequest) {
    const { section } = await req.json();

    if (!section) {
        return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    try {
        const filePath = path.resolve(process.cwd(), 'public', 'timetable.xlsx');
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
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            console.log(`Data from sheet ${day}:`, data);

            const timings = data[2].slice(1);
            const locations = data.slice(4).map(row => row[0]);
            const processedData = data.slice(4).map(row => row.slice(1));

            const filteredData = [];

            for (let i = 0; i < processedData.length; i++) {
                for (let j = 0; j < processedData[i].length; j++) {
                    const cell = processedData[i][j];
                    if (cell && cell.includes(section)) {
                        const [course, instructor] = cell.split('\n').map(str => str.trim());
                        const timing = standardizeTime(timings[j]).start;
                        filteredData.push({
                            location: locations[i] || 'Unknown',
                            timing,
                            course: course || 'Unknown',
                            instructor: instructor || 'Unknown',
                        });
                    }
                }
            }

            filteredData.sort((a, b) => a.timing.localeCompare(b.timing));

            results[day] = filteredData;
        }

        return NextResponse.json({ timetable: results });
    } catch (error) {
        console.error('Error processing the file:', error);
        return NextResponse.json({ error: 'Error reading or processing the file' }, { status: 500 });
    }
}


