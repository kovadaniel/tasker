import { Navigate, RouteObject } from 'react-router-dom'
import { ReactNode } from 'react'
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';

export interface IRoute{
    route: string,
    element: ReactNode;
}

export enum RouteNames{
    PROJECTS = '/projects',
    TASKS = '/tasks',
    OTHER = '/*'
}

export const routes: RouteObject[] = [
    {
        path: RouteNames.PROJECTS,
        element: <Projects/>
    },
    {
        path: RouteNames.TASKS,
        element: <Tasks/>
    },
    {
        path: RouteNames.OTHER,
        element: <Navigate to={RouteNames.TASKS}/>
    },
]