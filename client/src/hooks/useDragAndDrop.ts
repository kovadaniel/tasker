import React, { useMemo, useState } from "react";
import { ITask, ITaskList } from "../models/ITask";
import { IHandlers } from "../models/IHandlers";
import { flushSync } from "react-dom";

const useDragAndDrop = (tasks:ITask[], setTasks: (tasks: ITask[]) => void):IHandlers => {
    /**
     * for an item WHICH we take for dropping set a class 'dragged-active'
     * for an item OVER WHICH a dragged element is set a class 'under-dragged-active'
     */
    const [currentTask, setCurrentTask] = useState<ITask>();

    const handlers = useMemo(() => ({
        dragStartHandler(e: React.DragEvent<HTMLElement>, task:ITask){  
            setCurrentTask(task);
            e.currentTarget.classList.add('dragged-active');
        },
        dragEndHandler(e: React.DragEvent<HTMLElement>){
            e.currentTarget.classList.remove('under-dragged-active');
            e.currentTarget.classList.remove('dragged-active');
        },
        dragLeaveHandler(e: React.DragEvent<HTMLElement>){
            e.currentTarget.classList.remove('under-dragged-active'); 
        },
        dragOverHandler(e: React.DragEvent<HTMLElement>){
            e.preventDefault();
            //e.stopPropagation();
            if(e.currentTarget.className.includes('task-item') ||
               e.currentTarget.className.includes('drop-area')) {
                e.currentTarget.classList.add('under-dragged-active');
            }   
            if(e.currentTarget.className.includes('board')){
                e.currentTarget.classList.add('under-dragged-active');
            }
        },

        dropHandler(e: React.DragEvent<HTMLElement>, board: ITaskList, task: ITask){
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('under-dragged-active');
            // for removing shadow of a selected board when an element is dropped:
            e.currentTarget.parentElement?.parentElement?.classList.remove('under-dragged-active'); 


            if(currentTask){
                // if task wasn't actually moved
                if(currentTask.id === task.id) return;

                // get an initial index (the original place) of the item WHICH we dragged
                const currentIndex = tasks.indexOf(currentTask);
                // remove an item WHICH we dragged from its original place
                tasks.splice(currentIndex, 1);

                // get an index of the task (OVER WHICH we dropped) in the original array of tasks 
                // if TASK WAS NOT PROVIDED we have to insert the tast at the START of the board
                const dropIndex = tasks.indexOf(task)
                // insert an item WHICH we dropped to the place 
                // of an item OVER WHICH we dropped
                tasks.splice(dropIndex + 1, 0, currentTask);
                // change status of the item WHICH we dropped
                currentTask.status = board.type;

                // change the state and therefore evoke a rerender of boards
                // ! this if-sentence is a fallback for incompatible browsers
                if ((document as any).startViewTransition) {
                    (document as any).startViewTransition(() => {
                        flushSync(() => {
                            setTasks(tasks.map(t => {
                                if(t.id === task.id) return task;
                                if(t.id === currentTask.id) return currentTask;
                                return t;
                            }));
                        })
                    })
                } else {
                    setTasks(tasks.map(t => {
                        if(t.id === task.id) return task;
                        if(t.id === currentTask.id) return currentTask;
                        return t;
                    }));
                }
            }
        },
        
        dropBoardHandler(e: React.DragEvent<HTMLElement>, board: ITaskList, start= false){
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.remove('under-dragged-active');
            if(currentTask){
                // take an index of the current tast 
                const currentIndex = tasks.indexOf(currentTask);
                // if task wasn't actually moved to another board - stop executing
                if(currentTask.status === board.type && 
                    (currentIndex === 0 || currentIndex === (tasks.length - 1))) return;
                
                // remove from original place
                tasks.splice(currentIndex, 1);

                // add to a new place (to the end of the list)
                currentTask.status = board.type;
                if(start) {
                    tasks.unshift(currentTask);
                } else {
                    tasks.push(currentTask);
                }
                // change the state
                if ((document as any).startViewTransition) {
                    (document as any).startViewTransition(() => {
                        flushSync(() => {
                            setTasks(tasks.map(t => {
                                if(t.id === currentTask.id){
                                    return currentTask;
                                }
                                return t;
                            }))
                        })
                    })
                } else {
                    setTasks(tasks.map(t => {
                        if(t.id === currentTask.id){
                            return currentTask;
                        }
                        return t;
                    }))
                }
            }
        },

    }), [currentTask, tasks])

    return handlers;
}
 
export default useDragAndDrop; 
    
    