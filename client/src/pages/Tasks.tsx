import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { Col, Container, Row } from "react-bootstrap";
import useSort from "../hooks/useSort";
import TaskList from "../components/TaskList";
import useDragAndDrop from "../hooks/useDragAndDrop";
import useSearchedTasks from "../hooks/useSearchedTasks";

const Tasks = () => {
    const {fetchTasks} = useActions();
    const {tasks} = useAppSelector(state => state.task);
    const {query} = useAppSelector(state => state.query);

    const {setTasks} = useActions();

    useEffect(() => {
        fetchTasks();
    }, []);

    const handlers = useDragAndDrop(tasks, setTasks)
    
    const searchedTasks = useSearchedTasks(tasks, query);
    
    const boards = useSort(searchedTasks);

    return (  
        <Container>
            <Row className="pt-3 pb-3 mh100">
                {boards.map(board => 
                    <Col xs={4} key={board.id}>
                        <TaskList board={board} handlers={handlers}/>
                    </Col>)}
            </Row>
            
        </Container>

    );
}
 
export default Tasks;