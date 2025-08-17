'use client';

import React from 'react';

const studentDetails = {
    name: 'John Doe',
    rollNumber: '2025A1234',
    course: 'Bachelor of Science (Computer Science)',
    semester: '6th Semester',
    institute: 'ABC Institute of Technology',
};

const marks = [
    { subject: 'Mathematics', total: 100, obtained: 85 },
    { subject: 'Physics', total: 100, obtained: 72 },
    { subject: 'Chemistry', total: 100, obtained: 65 },
    { subject: 'English', total: 100, obtained: 90 },
    { subject: 'Computer Science', total: 100, obtained: 95 },
];

function getGrade(percent) {
    if (percent >= 90) return 'A+';
    if (percent >= 80) return 'A';
    if (percent >= 70) return 'B+';
    if (percent >= 60) return 'B';
    if (percent >= 50) return 'C';
    if (percent >= 40) return 'D';
    return 'F';
}

export default function MarksheetPage() {
    const totalMarks = marks.reduce((acc, m) => acc + m.total, 0);
    const obtainedMarks = marks.reduce((acc, m) => acc + m.obtained, 0);
    const percentage = (obtainedMarks / totalMarks) * 100;
    const finalGrade = getGrade(percentage);

    return (
        <div className="py-5 d-flex items-center justify-content-center bg-gray-100 print:bg-white px-4 py-10">
            <div
                className="bg-white text-black border border-gray-400 shadow p-10 print:shadow-none"
                style={{
                    width: '8.27in',
                    height: '11.69in',
                }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold uppercase">{studentDetails.institute}</h1>
                    <h2 className="text-lg mt-2 font-medium">Semester Examination Marksheet</h2>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
                    <div><strong>Name:</strong> {studentDetails.name}</div>
                    <div><strong>Roll Number:</strong> {studentDetails.rollNumber}</div>
                    <div><strong>Course:</strong> {studentDetails.course}</div>
                    <div><strong>Semester:</strong> {studentDetails.semester}</div>
                </div>

                <table className="w-full border border-gray-400 text-sm mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 px-3 py-2 text-left">Subject</th>
                            <th className="border border-gray-400 px-3 py-2 text-center">Total Marks</th>
                            <th className="border border-gray-400 px-3 py-2 text-center">Obtained</th>
                            <th className="border border-gray-400 px-3 py-2 text-center">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((m, i) => {
                            const percent = (m.obtained / m.total) * 100;
                            return (
                                <tr key={i}>
                                    <td className="border border-gray-300 px-3 py-2">{m.subject}</td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">{m.total}</td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">{m.obtained}</td>
                                    <td className="border border-gray-300 px-3 py-2 text-center">{getGrade(percent)}</td>
                                </tr>
                            );
                        })}
                        <tr className="bg-gray-100 font-semibold">
                            <td className="border border-gray-400 px-3 py-2 text-right">Total</td>
                            <td className="border border-gray-400 px-3 py-2 text-center">{totalMarks}</td>
                            <td className="border border-gray-400 px-3 py-2 text-center">{obtainedMarks}</td>
                            <td className="border border-gray-400 px-3 py-2 text-center">—</td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-sm mb-10">
                    <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>
                    <p><strong>Final Grade:</strong> {finalGrade}</p>
                    <p><strong>Result:</strong> {finalGrade === 'F' ? 'Fail' : 'Pass'}</p>
                </div>

                <div className="flex justify-between text-sm mt-auto">
                    <div>
                        <p>__________________</p>
                        <p>Student Signature</p>
                    </div>
                    <div className="text-right">
                        <p>__________________</p>
                        <p>Controller of Examination</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
