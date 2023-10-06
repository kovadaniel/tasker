export const formatDate = (date: Date): string => {
    const year = date.getFullYear();    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate()).toString().padStart(2, '0');
    return `${day}.${month}.${year}`
}

export const formatTime = (date: Date): string => {
    const hours = (date.getHours()).toString().padStart(2, '0');
    const minutes = (date.getMinutes()).toString().padStart(2, '0');
    return `${hours}:${minutes}`
}

export const msInMinute = 1000 * 60;
export const msInHour = msInMinute * 60;
export const msInDay = msInHour * 24;
export const msInYear = msInDay * 365;


/**
 * 
 * @param start 
 * @param end 
 * @returns a string of day-hour-minute interval between two times
 */
export const dmsInterval = (start:number, end:number) => {


    const interval = end - start;
    const days = Math.trunc(interval / msInDay);
    const leftOfDay = interval % msInDay;
    
    const hours = Math.trunc(leftOfDay / msInHour);
    const leftOfHours = leftOfDay % msInHour;
    const minutes = Math.trunc(leftOfHours / msInMinute);

    return `${days ? days : '0'} days ${hours ? hours : '0'} hours ${minutes? minutes : '0'} minutes`;
}

export const isOutdated = (ms:number) => Date.now() > ms

export const dateToISO = (date: Date) => date.toISOString().split('T')[0];
export const timeToISO = (date: Date) => date.toISOString().split('T')[1].substring(0, 5);
export const ISOtoDate = (isoDate: string) => { // isoDate looks like "yyyy-mm-dd hh:mm"
    const arr = isoDate.split(/-|\s|:/);// split string and create array.
    return new Date(
        Number.parseInt(arr[0]), // year
        Number.parseInt(arr[1] ) - 1, // month, decreased by 1
        Number.parseInt(arr[2]), // day
        Number.parseInt(arr[3]) + 3, // hours. '+3' as Date() for some reason reduces amount of hours on 3  
        Number.parseInt(arr[4]), // minutes
    )
}
