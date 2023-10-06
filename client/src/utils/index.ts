export const capitalize = (str: string):string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const truncate = (str: string, maxWords = 10, maxSize = 100) => {
    const words = str.split(' ');
    let result = '';
    for(let i = 0; i < words.length; i++){
        if(i >= maxWords){
            return result+=words[i]+'...'
        }
        else{
            result+=words[i];
        }
        
        if(result.length > maxSize){
            return result + '...';
        }
        result+=' ';
    }
    return result;
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function naturalIndexOf<T>( el: T, arr: T[]):number {
    return arr.indexOf(el) + 1;
}

interface commentedType<T extends commentedType<T>>{
    id: number;
    comments: T[];
}
export function findDeepComment<T extends commentedType<T>>(array: T[], id: number): T|null {
    let result = null;
    array.some(obj => result = obj.id === id && obj || findDeepComment(obj.comments, id));
    return result;
}
