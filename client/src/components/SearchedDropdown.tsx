import { FC } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ListSearchMenu from './UI/SearchListMenu/SearchListMenu'

interface SearchedDropdownProps{
    title: string,
    items: ({id: number, title: string})[];
    setItem: (id: number) => void;
}

const SearchedDropdown: FC<SearchedDropdownProps & React.HTMLAttributes<HTMLDivElement>> = 
({title, items, setItem, ...props}) => {
    return (  
        <Dropdown {...props} onSelect={(key) => key && setItem(Number.parseInt(key))} >
            <Dropdown.Toggle variant="light" title='Applies without saving'>
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu as={ListSearchMenu}>
                {items.map(item => 
                    <Dropdown.Item key={item.id} eventKey={item.id} title='Saves immediately!'>{item.title}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}
 
export default SearchedDropdown;