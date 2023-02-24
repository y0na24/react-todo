import { Component } from 'react'

import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'Dmitriy G.', salary: 800, increase: false, rise: false, id: 1 },
        { name: 'Nikita K.', salary: 1000, increase: false, rise: false, id: 2 },
        { name: 'Matvey K.', salary: 1200, increase: false, rise: false, id: 3 },
      ],
      term: '',
      filter: 'all',
    }
    this.maxId = 4
  }

  deleteItem = id => {
    this.setState(({ data }) => {
      const newArr = data.filter(item => item.id !== id)

      return {
        data: newArr,
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: Number(salary),
      increase: false,
      rise: false,
      id: this.maxId++,
    }
    this.setState(({ data }) => {
      return {
        data: [...data, newItem],
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {
            ...item,
            [prop]: !item[prop],
          }
        }
        return item
      }),
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = term => {
    this.setState({ term })
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise)
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000)
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  render() {
    const { data, term, filter } = this.state
    const employees = data.length
    const increased = data.filter(item => item.increase === true).length
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)

    return (
      <div className='app'>
        <AppInfo employees={employees} increased={increased} />

        <div className='search-panel'>
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
        </div>

        <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp} />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    )
  }
}

export default App
