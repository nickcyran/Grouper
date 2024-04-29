import axios from 'axios';

const getUser = async (body) => {
    axios.get('http://localhost:9000/getUser/', body)
    .then(res => {
        if(res.username === body.username && res.password === body.password){
            console.log(res.data._id)
            localStorage.setItem('userID', res.data._id)
            return true;
        }
          else{
            alert('Wrong Credentials')
        }
    })
    .catch((err) => {
        console.error('Error in Login:', err);
    });
}

const createUser = async (body) => {
    const f_name = body.f_name;
    const l_name = body.l_name;
    const username = body.username;
    const password = body.password;
    
    axios.post('http://localhost:9000/createUser', {f_name, l_name, username, password})
    .then((res) => {
        if(!res.data){
            alert("Username is taken");
            return false;
        }
        else{
            return true;
        }
    })
    .catch((err) => {
        alert('Error in Signing Up: ' + err)}
    )

}

const getProfile = async (body) => {
    axios.get('http://localhost:9000/getProfile', {params: {body}})
    .then((res) => {
        localStorage.setItem("f_name", res.data.f_name)        
        localStorage.setItem("l_name", res.data.l_name)       
        localStorage.setItem("pfp", res.data.pfp)       
        localStorage.setItem("displayName", res.data.displayName)        
        localStorage.setItem("bio", res.data.bio)       
        localStorage.setItem("links", res.data.links)    

    })
    .catch((err) => {
        console.log(err)
    }
    )
}

const updateProfile = async (body) => {
    axios.post('http://localhost:9000/updateProfile', body)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        alert('Error in Updating: ' + err)}
    )
}

const updatePFP = async (body) => {
    axios.post('http://localhost:9000/updatePFP', body)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        alert('Error in Updating: ' + err)}
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

export {getUser, createUser, getProfile, updateProfile, updatePFP, AddFriend, GetFriends, CreateDirectMessage, GetDirectMessages}