import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cl from '../style/navbar.module.css'
import { useActions } from '../hooks/useActions';
import TaskModal from './TaskModal';
import { useState } from 'react'

const NavigationBar = () => {
    const {setQuery} = useActions(); 
    const [showCreateModal, setShowCreateModal] = useState(false);

    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.currentTarget.value);
    }

    return (
        <Navbar expand="lg" className={cl.navbar}>
            <Container>
                <Navbar.Brand href="#home" className={cl.title}>Tasker</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={cl.nav}>Projects</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button variant='dark' className='me-5' onClick={() => setShowCreateModal(true)}>
                    New task
                </Button>
                <TaskModal 
                    isVisible={showCreateModal} 
                    setIsVisible={setShowCreateModal}/>

                <Form.Control
                    type="search"
                    placeholder="Search"
                    className={cl.input}
                    aria-label="Search"
                    onInput={inputHandler}/>
            </Container>
    </Navbar>
    );
}
 
export default NavigationBar;