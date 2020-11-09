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

    const [newItemText, setNewItemText] = useState('');
    const [isEditStateActive, setIsEditStateActive] = useState(false);
    const [isAddWindowOpen, setIsAddWindowOpen] = useState(false);
    const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
    const [changingItem, setChangingItem] = useState({});

    const dispatch = useDispatch();
    const selectItems = state => state.itemList;
    const itemList = useSelector(selectItems);

    const handleAddWindowDisplay = (e) => {
        e.preventDefault();
        setIsAddWindowOpen(!isAddWindowOpen);
        setIsEditStateActive(false);
    }

    const handleEditWindowDisplay = (e) => {
        e.preventDefault();
        setIsEditWindowOpen(!isEditWindowOpen);
        setNewItemText('');
    }



    const handleInputChange = (value) => {
        setNewItemText(value)
    }

    const addItemToPage = () => {
        const currentValue = newItemText.trim().length;
        
        if(currentValue === 0) {
            alert('Введите что-нибудь');
        } else {
            dispatch({type: 'item/itemAdded', payload: newItemText})

            setNewItemText('');
            setIsAddWindowOpen(!isAddWindowOpen)
        }
    }


    const openEditWindow = (item) => {
        setIsEditWindowOpen(!isEditWindowOpen);
        setNewItemText(item.value);
        setChangingItem({
            id: item.id,
            value: item.value,
            completed: item.completed
        })
    }

    const addChangedItemToPage = () => {
        const currentValue = newItemText.trim().length;
        if(currentValue === 0) {
            alert('Введить что-нибудь');
        } else {
            dispatch({type: 'item/itemChanged', payload: {
                id: changingItem.id,
                value: newItemText,
                completed: changingItem.completed
            }})

            setNewItemText('');
            setIsEditWindowOpen(!isEditWindowOpen);
        }
    }

    return(

        <div className='container'>

            <Header title='Сегодня'>
                <CSSTransition
                    in={itemList.length !== 0}
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
                    in={itemList.length === 0}
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
                    doThis={handleAddWindowDisplay}
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
                            onClose={handleEditWindowDisplay}
                            handleInputChange={handleInputChange}
                            addItemToPage={addChangedItemToPage}
                            text={newItemText}
                            textButton='Сохранить'
                            areaClass={'add-form__textarea_low-height'}
                        />
                    </Portal>
                </CSSTransition>

                <CSSTransition
                    in={isAddWindowOpen}
                    timeout={400}
                    classNames="hide"
                    unmountOnExit={true}
                >
                    <Portal id='modal'>
                        <ModalWindow
                            onClose={handleAddWindowDisplay}
                            handleInputChange={handleInputChange}
                            addItemToPage={addItemToPage}
                            text={newItemText}
                            textButton='Добавить'
                            areaClass={'add-form__textarea_large-height'}
                        />
                    </Portal>
                </CSSTransition>

            </main>
            
        </div>
    )
}


