import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './container.css'

const SearchContainer = () => {

    const [id, setId] = useState('')
    const [department, setDepartment] = useState('')
    const [ids, setIds] = useState([])
    const [user, setUser] = useState({})

    const hrId = ['1', '2', '3', '4', '5']
    const erId = ['6', '7', '8', '9', '10']

    const handleDept = (e) => {
        const val = e.target.value
        setDepartment(val)
        if (val === 'HR') {
            setIds(hrId)
        } else if (val === 'ENGINEERING') {
            setIds(erId)
        } else {
            setIds([])
        }
    }
    const handleId = (e) => {
        const val = e.target.value
        setId(val)
    }
    const showDetail = () => {
        const url = `https://reqres.in/api/users/${id}`
        axios.get(url)
            .then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    const clear = () => {
        setUser({})
    }

    return (
        <div className='row mt-4'>
            <div className='col-md-4'>
                <label>Department:-</label><br />
                <select value={department} onChange={handleDept}>
                    <option value=''>--select--</option>
                    <option value='HR'>HR</option>
                    <option value='ENGINEERING'>ENGINEERING</option>
                </select>
            </div>
            <div className='col-md-4'>
                <label>Employee Id:-</label><br />
                <select value={id} onChange={handleId}>
                    <option value=''>--select--</option>
                    {
                        ids.map((id, i) => {
                            return <option key={i}>{id}</option>
                        })
                    }
                </select>
            </div>
            <div className='col-md-4'>
                <Button id='button' variant="info" onClick={showDetail}>ShowDetails</Button>
                <Button id='button' variant="info" onClick={clear}>Clear</Button>
            </div>
            {user.data && <div id='card' className='row mt-5'>
                <div className='col-md-12'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={user.data.avatar} alt='image here' />
                        <Card.Body>
                            <Card.Title>{user.data.first_name} {user.data.last_name}</Card.Title>
                            <Card.Text>
                                <p>Employee Id:- {user.data.id}</p>
                                <p>Email:- {user.data.email}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>}
        </div>
    )
}
export default SearchContainer