import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function CommentCard(props){
    const { username, comment } = props;

    return <Box sx ={{backgroundColor: 'lightgray', borderRadius: 5, 
    fontSize: '16px', width: 'auto', height: 'auto', overflow:'column', margin:2}}>
            <Typography sx ={{margin:2}}>{username}</Typography>
            <Typography sx = {{margin:2}}>{comment}</Typography>
            </Box>
}
export default CommentCard;