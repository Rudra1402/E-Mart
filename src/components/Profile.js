import React, { useEffect, useState } from 'react'
import '../css/profile.css'
import dummy from '../images/dummy-user.png'
import { Link } from 'react-router-dom'

function Profile() {

    const [userArr, setUserArr] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const userLogout = () => {
        try {
            fetch('https://emart-pern-stack.herokuapp.com/logout')
                .then(r => r.json()).then(d => {
                    // setIsLoggedIn(d.loggedIn)
                    setIsLoggedIn(false)
                })
        } catch (e) {
            console.log(e.message);
        }
    }

    const deleteUser = async (id) => {
        try {
            const delUser = await fetch(`https://emart-pern-stack.herokuapp.com/deleteuser/${id}`, {
                method: "DELETE"
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetch('https://emart-pern-stack.herokuapp.com/login', { credentials: 'include' })
            .then(r => r.json())
            .then(d => {
                setIsLoggedIn(d.loggedIn)
                if (d.loggedIn && d.user.length > 0) {
                    setUserArr(d.user[0])
                } else {
                    userLogout()
                }
            })
    }, [])

    return (
        <>
            {isLoggedIn ? <div className='profile'>
                <img src={dummy} alt='' />
                <div className='name'>
                    <div className='categoryContain'>
                        <div className='head'>First Name</div>
                        <div className='fname val'>{userArr.fname}</div>
                    </div>
                    <div className='categoryContain'>
                        <div className='head'>Last Name</div>
                        <div className='lname val'>{userArr.lname}</div>
                    </div>
                </div>
                <div className='name'>
                    <div className='categoryContain'>
                        <div className='head'>Username</div>
                        <div className='username val'>{userArr.username}</div>
                    </div>
                    <div className='categoryContain'>
                        <div className='head'>Email ID</div>
                        <div className='email val'>{userArr.email}</div>
                    </div>
                </div>
                <div className='containBtns'>
                    <button onClick={userLogout}>Logout</button>
                    <Link to="/edit">Edit Profile</Link>
                    {userArr.auth === 1 ?
                        <Link to="/users">Manage Users</Link> :
                        <button onClick={() => {
                            deleteUser(userArr.uid)
                            userLogout()
                        }}>Delete Profile</button>}
                </div>
            </div> : <div className='profile'>
                <div className='des'>Please Login to View your Profile</div>
                <Link to="/login">Login</Link>
            </div>}
        </>
    )
}

export default Profile