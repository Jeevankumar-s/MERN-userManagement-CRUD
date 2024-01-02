import { FaCreditCard } from "react-icons/fa";
import {Component} from 'react'

class UserItem extends Component{
    state = {
        userList :[],
    }

    compoundDidMount=()=>(
        this.gettingTheList()
    )

    gettingTheList=async()=>{
        const response = await fetch("url")
        const data = await response.json()
        const  updatedList = ''
        this.setState({userList:updatedList})
    }

    onDelete=(id)=>{
        const userList = this.state
        const selectedItem = userList.filter(each=>each.id !==id)
        this.setState({userList:selectedItem})
    }



    render(){
        const {userList} = this.state
        return(
            <h1>Hi</h1>
        )
    }

}
export default UserItem