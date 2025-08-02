'use client';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_PATH, USERDATA } from '@/app/config';

const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
};

export default function ExamPage() {
    const [examid, setExamid] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get exam ID from URL
    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 1];
        setExamid(id);
    }, []);

    // Fetch exam timer once examid is available
    useEffect(() => {
        if (!examid) return;

        axios.post(API_PATH + `ManageEducation.php`, {
            action: 'fetchexamtimer',
            examid,
            ...USERDATA(),
        }).then((r) => {
            console.log('Timer API response:', r.data); // Debug
            if (r.data.status === 'success') {
                setEndTime(r.data.end_time); // e.g. "2025-08-02 18:01:00"
            }
        });
    }, [examid]);

    // Start timer once endTime is fetched
    useEffect(() => {
        if (!endTime) return;

        const endTimestamp = new Date(endTime.replace(' ', 'T')).getTime();

        const updateTime = () => {
            const now = Date.now();
            const diffSeconds = Math.floor((endTimestamp - now) / 1000);
            const remaining = Math.max(0, diffSeconds);

            setTimeLeft(remaining);
            if (remaining === 0) setIsTimeUp(true);
        };

        updateTime(); // run immediately
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    // Fetch questions
    const fetchQuestions = async () => {
        try {
            const res = await axios.post(API_PATH + `ManageEducation.php`, {
                action: 'fetchexamquestions',
                examid,
                ...USERDATA(),
            });
            if (res.data.status === 'success') {
                setQuestions(res.data.retval);
            }
        } catch (err) {
            console.error('Failed to load questions', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (examid) fetchQuestions();
    }, [examid]);

    const handleOptionChange = useCallback((e) => {
        const confirmChoice = window.confirm(
            'Are you sure you want to select this answer? Once submitted, you cannot change your answer.'
        );
        if (!confirmChoice) return;

        const qid = e.target.id;
        const answer = e.target.value;

        axios.post(API_PATH + `ManageEducation.php`, {
            action: 'submitexamanswer',
            questionid: qid,
            examid,
            answer,
            ...USERDATA(),
        }).then((res) => {
            if (res.data.status === 'success') {
                fetchQuestions();
            }
        });
    }, [examid]);

    if (loading) return <p className="p-4">Loading exam...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="container">
                <div className="d-flex justify-content-between pt-3">
                    <h3 className="text-2xl font-bold mb-6">Examination</h3>
                    <div>
                        {isTimeUp ? (
                            <div className="text-red-600 font-bold text-xl">⛔ Time is up!</div>
                        ) : timeLeft !== null ? (
                            <div className="text-green-700 font-semibold text-xl">
                                ⏳ Time Left: {formatTime(timeLeft)}
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
                {
                    isTimeUp ? (<div className='alert alert-danger p-3 text-center'>Examination time is over, you can no longer submit answers.</div>) : (
                        questions.length > 0 ? questions.map((q, index) => (
                            <div key={q.id} className="border p-4 rounded-xl shadow-sm bg-white mb-1">
                                <p className="font-medium mb-3">
                                    {index + 1}. {q.question}
                                </p>
                                <div className="row">
                                    {['option_1', 'option_2', 'option_3', 'option_4'].map((opt, i) => (
                                        <div className="col-md-6 p-2" key={i}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    value={opt}
                                                    id={q.id}
                                                    onChange={handleOptionChange}

                                                />
                                                {" "}{q[opt]}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            <div className='alert alert-danger p-3 text-center'>No More Exam Questions left. Examination is over for now.</div>
                        )

                    )
                }

            </div>
        </div>
    );
}
