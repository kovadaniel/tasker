export interface IComment{
    id: number,
    user: {
        name: string,
        image: string,
    };
    text: string;
    comments: IComment[]
}