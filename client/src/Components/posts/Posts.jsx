import Post from '../post/Post'
import './posts.css'

export default function Posts({ posts }) {
  return (
    <>
    <div className="heading">
      Recent Posts
    </div>
    <div className="posts">
      {posts.map((p)=>(
        <Post key = {p._id} post = {p}/>
      ))}
    </div>
    </>
  )
}
