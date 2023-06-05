const Blog = ({blog}) => (
  <div>
    Blog tile: {blog.title} &nbsp; Author: {blog.author}
    <div>
    {blog.url}
    </div>
  </div>  
)

export default Blog