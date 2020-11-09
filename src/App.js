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
    const [isEditStateActive, setIsEditStateActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
    const [changingItem, setChangingItem] = useState({});

    const dispatch = useDispatch();
    const selectTodos = state => state.todos;
    const todos = useSelector(selectTodos);

    const toggleAddWindow = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
        setIsEditStateActive(false);
    }

    const toggleEditWindow = (e) => {
        e.preventDefault();
        setIsEditWindowOpen(!isEditWindowOpen);
        setNewItem('');
    }



    const handleInputChange = (value) => {
        setNewItem(value)
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


    const openEditWindow = (item) => {
        setIsEditWindowOpen(!isEditWindowOpen);
        setNewItem(item.value);
        setChangingItem({
            id: item.id,
            value: item.value,
            completed: item.completed
        })
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
            setIsEditWindowOpen(!isEditWindowOpen);
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
                        doThis={() => setIsEditStateActive(!isEditStateActive)}
                        buttonClass={'header__button'}
                    >
                        {isEditStateActive ? 'Отмена' : 'Править'}
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
                    isActive={isEditStateActive}
                    openTheEditor={openEditWindow}
                />

                <Button 
                    tag='button'
                    doThis={toggleAddWindow}
                    buttonClass={'button-circle'}>
                        <span className="button-circle__circle"/>
                </Button>

                <CSSTransition
                    in={isEditWindowOpen}
                    timeout={400}
                    classNames="hide"
                    unmountOnExit={true}
                >
                    <Portal id='edit-window'>
                        <ModalWindow
                            onClose={toggleEditWindow}
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
                            onClose={toggleAddWindow}
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


