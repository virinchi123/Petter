import React,{useState} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';

const Form = props =>{

    const [formState,setFormState] = useState({
        id:'',
        name:'',
        password:'',
        showModal:false
    })

    const [paperCode,setPaperCode] = useState('Success')

    const nameChangedHandler = event =>{
        //console.log(event.target.value)
        setFormState({
            ...formState,
            name:event.target.value
        })
        //console.log(event.target.value)
    }

    const idChangedHandler = event => {
        setFormState({
            ...formState,
            id: event.target.value
        })
    }

    const passChangedHandler = event => {
        setFormState({
            ...formState,
            password: event.target.value
        })
    }

    const handleClose= props =>{
        setFormState({
            ...formState,
            showModal:false
        })
    }

    const handleOpen = props => {
        setFormState({
            ...formState,
            showModal: true
        })
    }

    const submitHandler = event => {
        let body = {
            id: formState.id,
            name: formState.name,
            photourls: [formState.password]
        }
        console.log(formState)
        axios.post('https://petstore.swagger.io/v2/pet', body, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('hi')
            console.log(res)
            if (res.status === 200) {
                let url = 'https://petstore.swagger.io/v2/pet/' + formState.id;
                axios.get(url, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res1 => {
                    console.log(res1)
                    handleOpen();
                })
            }
            else{
                setPaperCode(`Expected a status code of 200, but got ${res.status} instead!`);
                handleOpen();
            }
        }).catch(e => console.log(e))
    }

    return(
        <React.Fragment>
            <Container style={{display: 'flex',justifyContent:'center',alignItems: 'center',height:'80vh'}}>
                <Modal
                    open={formState.showModal}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableAutoFocus={true}
                    style={{width:'25vw',position:'absolute',left:'38vw',top:'20vh'}}
                >
                    <Paper style={{display:'flex',justifyContent:'center',padding:'20%'}}>
                        <Typography variant = 'h5'>{paperCode}</Typography>
                    </Paper>
                </Modal>
                <Paper style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',alignItems:'center',width:'50vh',margin:'auto',padding:'2.5% 5%',paddingTop:'2.5%'}}>
            {/*<Container style={{padding:'4% 10%',paddingTop:'4%',height:'100%'}}>
                <Paper style={{display: 'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems: 'center',padding:'1em 0',width:'50vh',position:'relative',left:'23vw'}}>*/}
                    <Typography variant='h3'>Add Pet</Typography>
                    <Divider style={{marginBottom:'5%'}}/>
                    <TextField id="outlined-basic1" label="ID" variant="outlined" style={{margin:'0.5em 0',marginBottom:'0.5em'}} onChange={idChangedHandler}/>
                    <TextField id="outlined-basic2" label="Name" variant="outlined" style={{ margin: '0.5em 0', marginBottom: '0.5em' }} onChange={nameChangedHandler}/>
                    <TextField id="outlined-basic3" type='password' label="Password" variant="outlined" style={{ margin: '0.5em 0', marginBottom: '1.5em' }} onChange={passChangedHandler}/>
                    <Button variant="contained" color="primary" onClick={submitHandler}>
                        Submit
</Button>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default Form;