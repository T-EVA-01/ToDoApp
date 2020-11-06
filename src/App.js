import React, {useState} from 'react';

import Header from './Components/Header/Header'
import Button from './Components/Button/Button';
import ModalWindow from './Components/ModalWindow/ModalWindow';
import Portal from './Components/Portal';
import List from './Components/List/List';

import { CSSTransition } from 'react-transition-group';

import { useDispatch, useSelector } from 'react-redux';

import './css/animations.css';
import './css/App.css';
import './css/fonts.css';

export default function App() {

    const [newItem, setNewItem] = useState('');
    const [isEditActive, setIsEditActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editWindowOpen, setEditWindowOpen] = useState(false);
    const [changingItem, setChangingItem] = useState({});

    const dispatch = useDispatch();
    const selectTodos = state => state.todos;
    const todos = useSelector(selectTodos);

    const toggleModel = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
        setIsEditActive(false);
    }

    const toggleEdit = () => {
        setIsEditActive(!isEditActive)
    }

    const toggleEditModal = (e) => {
        e.preventDefault();
        setEditWindowOpen(!editWindowOpen);
        setNewItem('');
    }



    const handleCheckboxChange = (item) => {
        dispatch({type: 'todo/todoToggled', payload: item.id})
    }

    const handleInputChange = (value) => {
        setNewItem(value)
    }

    

    const daleteItem = (id) => {
        dispatch({type: 'todo/todoDeleted', payload: id})
    }

    const addItemToPage = () => {
        const currentValue = newItem.trim().length;
        
        if(currentValue === 0) {
            alert('Введите что-нибудь');
        } else {
            dispatch({type: 'todo/todoAdded', payload: newItem})

            setNewItem('');
            setIsModalOpen(!isModalOpen)
        }
    }


    const changeItem = (item) => {
        const condition = isEditActive;
        
        if(condition) {
            setEditWindowOpen(!editWindowOpen);
            setNewItem(item.value);
            setChangingItem({
                id: item.id,
                value: item.value,
                completed: item.completed
            });
        };
    }

    const addChangedItemToPage = () => {
        const currentValue = newItem.trim().length;
        if(currentValue === 0) {
            alert('Введить что-нибудь');
        } else {
            dispatch({type: 'todo/todoChanged', payload: {
                id: changingItem.id,
                value: newItem,
                completed: changingItem.completed
            }})

            setNewItem('');
            setEditWindowOpen(!editWindowOpen);
        }
    }

    return(

        <div className='container'>

            <Header title='Сегодня'>
                <CSSTransition
                    in={todos.length !== 0}
                    timeout={400}
                    classNames='show'
                    unmountOnExit={true}
                    mountOnEnter={true}
                >
                    <Button 
                        tag='button'
                        doThis={toggleEdit}
                        buttonClass={'header__button'}
                    >
                        {isEditActive ? 'Отмена' : 'Править'}
                    </Button>
                </CSSTransition>
            </Header>

            <main className='main'>

                <CSSTransition 
                    in={todos.length === 0}
                    timeout={1000}
                    classNames='show-text'
                    unmountOnExit={true}
                    exit={false}
                >   
                    <h2 className='task-list-state'>Список задач пуст</h2>
                </CSSTransition>

                <List 
                    itemList={todos}
                    isActive={isEditActive}
                    handleCheckboxChange={handleCheckboxChange}
                    daleteItem={daleteItem}
                    changeItem={changeItem}
                />

                <Button 
                    tag='button'
                    doThis={toggleModel}
                    buttonClass={'button-circle'}>
                        <span className="button-circle__circle"/>
                </Button>

                <CSSTransition
                    in={editWindowOpen}
                    timeout={400}
                    classNames="hide"
                    unmountOnExit={true}
                >
                    <Portal id='edit-window'>
                        <ModalWindow
                            onClose={toggleEditModal}
                            handleInputChange={handleInputChange}
                            addItemToPage={addChangedItemToPage}
                            text={newItem}
                            textButton='Сохранить'
                            areaClass={'add-form__textarea_low-height'}
                        />
                    </Portal>
                </CSSTransition>

                <CSSTransition
                    in={isModalOpen}
                    timeout={400}
                    classNames="hide"
                    unmountOnExit={true}
                >
                    <Portal id='modal'>
                        <ModalWindow
                            onClose={toggleModel}
                            handleInputChange={handleInputChange}
                            addItemToPage={addItemToPage}
                            text={newItem}
                            textButton='Добавить'
                            areaClass={'add-form__textarea_large-height'}
                        />
                    </Portal>
                </CSSTransition>

            </main>
            
        </div>
    )
}


