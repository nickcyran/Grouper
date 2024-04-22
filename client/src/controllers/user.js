import axios from 'axios';

const getUser = async (body) => {
    axios.post('http://localhost:9000/getUser/', body)
    .then(res => {
        if(res.username === body.username && res.password === body.password){
            localStorage.clear()
            localStorage.setItem('userID', res.data._id)
            return true;
        }
          else{
            alert('Wrong Credentials')
        }
    })
    .catch((err) => {
        console.log("Error in Login: " + err);
    });
}

const createUser = async (body) => {
    console.log(body.username)
    const f_name = body.f_name;
    const l_name = body.l_name;
    const username = body.username;
    const password = body.password
    axios.post('http://localhost:9000/createUser', {f_name, l_name, username, password})
    .then((res) => {
        return true;
    })
    .catch((err) => {
        alert('Error in Signing Up: ' + err)}
    )

}

const AddFriend = (body) => {
    axios.post('http://localhost:9000/addFriend/', body)
    .then(res => {
        return res.data;
    })
    .catch((err) => {
        console.error('Error in adding Friend:', err);
    });
}

const GetFriends = async (user) => {
    try {
        const response = await axios.get('http://localhost:9000/getFriends/', { params: { id: user } });
        return response.data;
    } catch (error) {
        console.error('Error in getting friends:', error);
        return []; 
    }
};

const GetDirectMessages = async (user) => {
    try {
        const response = await axios.get('http://localhost:9000/getDirectMessages/', { params: { id: user } });
        return response.data;
    } catch (error) {
        console.error('Error in getting DMs:', error);
        return []; 
    }
};

const CreateDirectMessage = async (body) => {
    axios.post('http://localhost:9000/createDirectMessage/', body)
    .then(res => {
        return res.data;
    })
    .catch((err) => {
        console.error('Error in creating DM:', err);
    });
};

export {getUser, createUser, AddFriend, GetFriends, CreateDirectMessage, GetDirectMessages}