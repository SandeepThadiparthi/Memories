import React from "react";
import useStyles from "./styles";
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from "@material-ui/core";
 import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
 import DeleteIcon from '@mui/icons-material/Delete';
 import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import {useDispatch} from "react-redux";
import { deletePost,likePost,getPosts } from "../../../actions/posts";
function Post({post,setCurrentId}){
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.tile}></CardMedia>
            <div className={classes.overlay}>
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:"white"}} size="small" onClick={()=> {setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
                {post.tags.map((tag)=>`#${tag} `)}
            </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom >{post.message}</Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>
             <Button size="small" color="primary" onClick={()=>{dispatch(likePost(post._id));dispatch(getPosts());}}>
                <ThumbUpAltIcon fontSize="small" />
                Like {post.likeCount}
             </Button>
             <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" />
                Delete
             </Button>
           </CardActions>
        </Card>
    )
}

export default Post;

