import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth/index.js';
import { useContext } from 'react'
import CommentCard from './CommentCard.js';

function CommentList(){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    return <Box sx = {{overflow:'auto', maxHeight:400}}>
                <List id = "comment-cards">
                {
                store.currentList.comments.map((comment, index) => (
                    <CommentCard
                        username= {comment.username} 
                        comment = {comment.comment}
                    />
                ))  
            }                
            </List>
            </Box>
}

export default CommentList;