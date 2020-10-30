import React, {Component} from 'react';

import Header from './Components/Header/Header'
import Button from './Components/Button/Button';
import ModalWindow from './Components/ModalWindow/ModalWindow';
import Portal from './Components/Portal';
import List from './Components/List/List'
import Condition from './Components/Сondition';

import './css/App.css';
import './css/fonts.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      editWindowOpen: false,
      isDone: false,
      isEditActive: false,
      changingItem: null,
      newItem: '',
      itemList: [],
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItemToPage = this.addItemToPage.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.addChangedItemToPage = this.addChangedItemToPage.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.daleteItem = this.daleteItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }



  componentDidMount() {
    const itemList = localStorage.getItem('itemList')
    
    if(Boolean(itemList)) {
      this.setState({
        itemList : JSON.parse(itemList)
      })
    } 
  }



  toggleEdit() {
    this.setState(state => ({isEditActive: !state.isEditActive}))
  }

  toggleModal() {
    this.setState(state => ({isModalOpen: !state.isModalOpen}))
    this.setState({isEditActive: false})
  }

  toggleEditModal() {
    this.setState(state => ({
      editWindowOpen: !state.editWindowOpen,
      newItem: ''
    }))
  }



  handleInputChange(key, value) {
    this.setState({[key]: value})
  }

  handleCheckboxChange(item) {
    item.complited = !item.complited;
    this.setState(state => ({isDone: !state.isDone}));

    const itemList = [...this.state.itemList];
    localStorage.setItem('itemList', JSON.stringify(itemList))
  }



  daleteItem(id) {
    const itemList = [...this.state.itemList]
    const updatedItemList = itemList.filter(item => item.id !== id)
    
    this.setState({itemList: updatedItemList})

    localStorage.setItem('itemList', JSON.stringify(updatedItemList));
    const storageItemListLingth = JSON.parse(localStorage.getItem('itemList')).length;
    if(storageItemListLingth === 0) {
      localStorage.removeItem('itemList') 
    }

  }



  changeItem(item) {
    this.state.isEditActive &&
    this.setState(state => ({
      editWindowOpen: !state.editWindowOpen,
      newItem: item.value,
      changingItem: {
        index: this.state.itemList.indexOf(item),
        id: item.id,
        value: item.value,
        complited: item.complited
      }
    }))
  }

  addChangedItemToPage() {

    if (this.state.newItem.trim().length === 0) {
      alert('Введить что-нибудь');

    } else {
      const indexOfItem = this.state.changingItem.index;
      const newItem = {
        id: this.state.changingItem.id,
        value: this.state.newItem,
        complited: this.state.changingItem.complited
      }

      const newList = [...this.state.itemList]
      newList.splice(indexOfItem, 1, newItem)

      this.setState({
        newItem: '',
        itemList: newList,
        editWindowOpen: !this.state.editWindowOpen
      })

      localStorage.setItem('itemList', JSON.stringify(newList));
    }
  }

  addItemToPage() {

    if (this.state.newItem.trim().length === 0) {
      alert('Введить что-нибудь');

    } else {
      const newItem = {
        id: Number(Math.random().toFixed(10)) * Math.pow(10, 10),
        value: this.state.newItem,
        complited: false
      }

      const itemList = [...this.state.itemList]
      itemList.push(newItem)

      this.setState({
        newItem: '',
        itemList,
        isModalOpen: !this.state.isModalOpen
      })

      localStorage.setItem('itemList', JSON.stringify(itemList));
    }   
  }


  render() {
    return(

      <div className="container">

        <Header title="Сегодня">
          <Condition 
            isActive={this.state.itemList.length !== 0}
            type={1}>
              <Button
                tag="button"  
                doThis={this.toggleEdit} 
                buttonClass={"header__button"}>
                {this.state.isEditActive ? 'Отмена' : 'Править'}
              </Button>
          </Condition>
        </Header>

      <main className="main">

          <Condition 
            isActive={this.state.itemList.length === 0} 
            type = {1}>
              <h2 className="task-state">Список задач пуст</h2>
          </Condition>
            
          <List 
            itemList={this.state.itemList}
            isActive={this.state.isEditActive}
            handleCheckboxChange={this.handleCheckboxChange}
            daleteItem={this.daleteItem}
            changeItem={this.changeItem}
          />

          <Button
            tag="button" 
            doThis={this.toggleModal} 
            buttonClass={"button-circle"}>
              <span className="button-circle__circle"/>
          </Button>

          <Condition
            isActive={this.state.editWindowOpen}
            type = {1}>
              <Portal id='edit-window'>
                <ModalWindow
                  onClose={this.toggleEditModal}
                  handleInputChange={this.handleInputChange}
                  addItemToPage={this.addChangedItemToPage}
                  text={this.state.newItem}
                  textButton='Сохранить'
                  areaClass={'add-form__textarea_low-height'}> 
                </ModalWindow>
              </Portal>
          </Condition>

          <Condition 
            isActive={this.state.isModalOpen}
            type = {1}>
              <Portal id="modal">
                <ModalWindow 
                  onClose={this.toggleModal} 
                  handleInputChange={this.handleInputChange}
                  addItemToPage={this.addItemToPage}
                  text={this.state.newItem}
                  textButton="Добавить"
                  areaClass={"add-form__textarea_large-height"}>
                </ModalWindow>
              </Portal>
          </Condition>

        </main>
      </div> 
    )
  }
}

export default App


