import React,{useState,useEffect}from "react";
import useStyles from "./styles";
import { TextField,Paper,Button,Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch,useSelector} from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
function Form({currentId,setCurrentId}){
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
  
    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);
  

    const clear = () => {
        setCurrentId(0);
        setPostData({
            creator:'',
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        });
    };


    const handleSubmit = async(event) => {
        event.preventDefault();
        if(currentId === 0){
            await dispatch(createPost(postData));
            clear();
            
        }else{
            await dispatch(updatePost(currentId,postData));
            clear();
        }
    };
   


 

    return (
        <Paper className={classes.paper} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(event)=>setPostData({...postData ,creator:event.target.value})} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event)=>setPostData({...postData ,title:event.target.value})} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event)=>setPostData({...postData ,message:event.target.value})} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData ,tags:event.target.value.split(',')})} />
            <div className={classes.fileInput}>
            <FileBase type="file" mutiple={false} onDone={({base64})=> setPostData({...postData,selectedFile:base64}) }/>
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;

