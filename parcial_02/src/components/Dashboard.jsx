import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, removePost } from '../redux/slices/postsSlice';
import { addNotification } from '../redux/slices/notificationsSlice';
import { addDm, sendDm } from '../redux/slices/dmsSlice';
import Header from './Header';

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts.toArray());
  const dms = useSelector(state => state.dms.dms.toArray());

  const [postText, setPostText] = useState('');
  const [dmText, setDmText] = useState('');

  // Generar notificación al agregar un post
  useEffect(() => {
    if (posts.length > 0) {
      console.log('Posts changed, length:', posts.length, 'Last post:', posts[posts.length - 1]);
      dispatch(addNotification(`Nuevo post agregado: ${posts[posts.length - 1]}`));
    }
  }, [posts.length, dispatch]);

  // Generar notificación al agregar un DM
  useEffect(() => {
    if (dms.length > 0) {
      console.log('DMs changed, length:', dms.length, 'Last DM:', dms[dms.length - 1]);
      dispatch(addNotification(`Nuevo DM enviado: ${dms[dms.length - 1]}`));
    }
  }, [dms.length, dispatch]);

  return (
    <div className="container">
      <Header />
      <section className="section">
        <h2>Posts (Linked List)</h2>
        <div className="input-group">
          <input value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="New Post" />
          <button onClick={() => { dispatch(addPost(postText)); setPostText(''); }}>Add Post</button>
        </div>
        <ul>
          {posts.map((post, i) => (
            <li key={i}>{post} <button onClick={() => dispatch(removePost(post))}>Remove</button></li>
          ))}
        </ul>
      </section>
      <section className="section">
        <h2>DMs (Queue)</h2>
        <div className="input-group">
          <input value={dmText} onChange={(e) => setDmText(e.target.value)} placeholder="New DM" />
          <button onClick={() => { dispatch(addDm(dmText)); setDmText(''); }}>Add DM</button>
          <button onClick={() => dispatch(sendDm())}>Send First</button>
        </div>
        <ul>
          {dms.map((dm, i) => <li key={i}>{dm}</li>)}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;