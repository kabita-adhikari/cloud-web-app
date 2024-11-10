import { useDeferredValue, useEffect, useState } from "react";

export const useDate = () => {
    const locale ='en';
    const [today, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(()=> {
            setDate(new Date())

        }, 60*1000)

        return ()=> {
            clearInterval(timer)
        }
    },[])

    const day = today.toLocaleDateString(locale,{weekday: 'long'})
    const date = `${day},${today.getDate()},${today.toLocaleDateString(locale,{month:'long'})}\n\n`
    const time = today.toLocaleDateString(locale,{hour: 'numeric', hour12:true, minute:'numeric'})

    return {
        date, time
    }
}
// // import { useState, useEffect } from "react";

// // export const useDateFromApi = (apiData) => {
// //     console.log('apiData',apiData)
// //   const locale = 'en'; 
// //   const [formattedDate, setFormattedDate] = useState('');
// //   const [formattedTime, setFormattedTime] = useState('');

// //   useEffect(() => {
// //     if (apiData?.datetimeStr) {  // Ensure `datetimeStr` exists
// //       const apiDate = new Date(apiData.datetimeStr);

// //       const day = apiDate.toLocaleDateString(locale, { weekday: 'long' });
// //       const date = `${day}, ${apiDate.getDate()} ${apiDate.toLocaleDateString(locale, { month: 'long' })}`;
// //       const time = apiDate.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: true });

// //       setFormattedDate(date);
// //       setFormattedTime(time);
// //     }
// //   }, [apiData, locale]); // Update when apiData changes

// //   return { date: formattedDate, time: formattedTime };
// // };

// // import { useState, useEffect } from 'react';

// // export const useDateFromApi = () => {
// //   const [time, setTime] = useState('');

// //   useEffect(() => {
// //     const updateTime = () => {
// //       const currentTime = new Date().toLocaleTimeString();
// //       setTime(currentTime);
// //     };

// //     updateTime();
// //     const interval = setInterval(updateTime, 1000); // Update every second
    
// //     return () => clearInterval(interval); // Cleanup on unmount
// //   }, []);

// //   return { time };
// // };
// import { useState, useEffect } from "react";

// export const useDateFromApi = (apiData) => {
//   console.log('apiData', apiData);

//   const [formattedDate, setFormattedDate] = useState('');
//   const [formattedTime, setFormattedTime] = useState('');

//   useEffect(() => {
//     if (apiData?.datetimeStr) {  // Ensure `datetimeStr` exists
//       const apiDate = new Date(apiData.datetimeStr);

//       // Format Date (no locale formatting)
//       const day = apiDate.toDateString();  // This will give you a short format like 'Mon, Feb 10 2024'
//       const date = `${day}, ${apiDate.getDate()} ${apiDate.toLocaleDateString('en', { month: 'long' })}`;

//       // Format Time in UTC (no locale)
//       const hours = String(apiDate.getUTCHours()).padStart(2, '0');  // Get UTC hours
//       const minutes = String(apiDate.getUTCMinutes()).padStart(2, '0');  // Get UTC minutes
//       const time = `${hours}:${minutes}`;  // Combine for a 24-hour format

//       setFormattedDate(date);
//       setFormattedTime(time);
//     }
//   }, [apiData]);

//   return { date: formattedDate, time: formattedTime };
// };



