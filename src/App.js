import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import { Notification } from "./components/Notification";
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log(blogs)

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   console.log('logging in with', username, password)

  //   try {
  //     const user = await loginService.login({
  //       username, password,
  //     })

  //     window.localStorage.setItem(
  //       'loggedNoteappUser', JSON.stringify(user)
  //     ) 

  //     blogService.setToken(user.token)
  //     setUser(user)
  //     setUsername('')
  //     setPassword('')
  //   } catch (exception) {
  //     setErrorMessage('Wrong credentials')
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000)
  //   }
  // }


  //  const handleBlogChange = async (event) => {
  //     console.log(event.target.value)
  //   }

  // const addBlog = (event) => {
  //   event.preventDefault();
  //   const blogObject = {
  //     content: newBlog,
  //     important: Math.random() < 0.5,
  //   }
  // }

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //         <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type="submit">login</button>
  //   </form>      
  // )


//  const blogForm = () => (
//     <form onSubmit={addBlog}>
//       <input
//         type="text"
//         placeholder='title'
//         value={newBlog}
//         onChange={handleBlogChange}
//       />
//       <button type="submit">save</button>
//     </form>  
//   )

const notifyWith = (message, type = "success") => {
  setNotification({ message, type })
  setTimeout(() => { setNotification(null) }, 3000)
}


  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <LoginForm
        notifyWith={notifyWith}
        user={user}
        setUser={setUser}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      
      {blogs.map(blog =>
        <BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} />
      )}
    </div>
  )
}



export default App