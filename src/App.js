import React, {useState, useEffect} from 'react';

import Header from './Components/Header/Header'
import Button from './Components/Button/Button';
import ModalWindow from './Components/ModalWindow/ModalWindow';
import Portal from './Components/Portal';
import List from './Components/List/List';

import { CSSTransition } from 'react-transition-group';

import './css/animations.css';
import './css/App.css';
import './css/fonts.css';

export default function App() {

    const [newItem, setNewItem] = useState('');
    const [itemList, setItemList] = useState([]);
    const [isEditActive, setIsEditActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [editWindowOpen, setEditWindowOpen] = useState(false);
    const [changingItem, setChangingItem] = useState({});



    useEffect(() => {
        const taskList = JSON.parse(localStorage.getItem('taskList'));
    
        if(Boolean(taskList)) {
          setItemList(taskList)  
        } 
    }, [])



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
        item.complited = !item.complited;
        setIsDone(!isDone);
        const taskList = [...itemList];
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }

    const handleInputChange = (value) => {
        setNewItem(value)
    }



    const daleteItem = (id) => {
        const taskList = [...itemList];
        const updatedItemList = taskList.filter(item => item.id !== id);
        setItemList(updatedItemList);

        localStorage.setItem('taskList', JSON.stringify(updatedItemList));
        const storageItemListLingth = JSON.parse(localStorage.getItem('taskList')).length;
        if(storageItemListLingth === 0) {
          localStorage.removeItem('taskList');
        };
    }



    const addItemToPage = () => {
        const currentValue = newItem.trim().length;
        if(currentValue === 0) {
            alert('Введите что-нибудь');
        } else {
            const newTask = {
                id: Number(Math.random().toFixed(10)) * Math.pow(10, 10),
                value: newItem,
                complited: false
            };

            const taskList = [...itemList];
            taskList.push(newTask);

            setNewItem('');
            setItemList(taskList);
            setIsModalOpen(!isModalOpen)

            localStorage.setItem('taskList', JSON.stringify(taskList));
        }
    }

    const changeItem = (item) => {
        const condition = isEditActive;
        if(condition) {
            setEditWindowOpen(!editWindowOpen);
            setNewItem(item.value);
            setChangingItem({
                index: itemList.indexOf(item),
                id: item.id,
                value: item.value,
                complited: item.complited
            });
        };
    }

    const addChangedItemToPage = () => {
        const currentValue = newItem.trim().length;
        if(currentValue === 0) {
            alert('Введить что-нибудь');
        } else {
            const indexOfItem = changingItem.index;
            const newTask = {
                id: changingItem.id,
                value: newItem,
                complited: changingItem.complited
            };

            const newTaskList = [...itemList];
            newTaskList.splice(indexOfItem, 1, newTask);

            setNewItem('');
            setItemList(newTaskList);
            setEditWindowOpen(!editWindowOpen);

            localStorage.setItem('taskList', JSON.stringify(newTaskList));

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
                        doThis={toggleEdit}
                        buttonClass={'header__button'}
                    >
                        {isEditActive ? 'Отмена' : 'Править'}
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
                    itemList={itemList}
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


