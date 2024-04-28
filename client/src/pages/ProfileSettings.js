import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getProfile, updateProfile } from "../controllers/user";

function ProfileSettings(){
    const initialized = useRef(false);
    const [f_name, setFirstName] = useState('');
    const [l_name, setLastName] = useState('');
    const [pic, setProfile_Pic] = useState('');
    const [file, setFile] = useState()
    const [name, setDisplay_Name] = useState('');
    const [bio, setBiography] = useState('');
    const [links, setLinks] = useState([]);
    const _id = localStorage.getItem('userID');

    useEffect(() =>{
        if(!initialized.current){
            initialized.current = true;

            axios.get('http://localhost:9000/getProfile', {params: {_id}})
            .then((res) => {
                setFirstName(res.data.f_name)        
                setLastName(res.data.l_name)       
                setProfile_Pic(res.data.pfp)       
                setDisplay_Name(res.data.displayName)        
                setBiography(res.data.bio)       
                setLinks(res.data.links)
            })
            .catch((err) => {
                console.log(err)
            }
            )
        }
    })

    const handleEdit = (e, f_name, l_name, file, biography, links, display_name) =>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", file);
        axios.post('http://localhost:9000/updateProfile', { _id: _id, f_name, l_name, formdata, biography, links, display_name })
        .then((res) =>{
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className="Profile">
            <header className="Profile-header">
                <form encType='multipart/form-data'>
                    <label> 
                        Profile Picture: <img src={"http://localhost:9000/Images/" + pic}/> <input type = "file" onChange={(e) => setFile(e.target.files[0])}/>
                    </label>                    
                    <label>
                        First Name: <input type = "text" defaultValue={f_name} onChange={(e) => setFirstName(e.target.value)}/>
                    </label>
                    <label>
                        Last Name: <input type = "text" defaultValue={l_name} onChange={(e) => setLastName(e.target.value)}/>
                    </label>
                    <label>
                        Name: <input type="text" defaultValue={name} onChange={(e) => setDisplay_Name(e.target.value)}/>
                    </label>
                    <label>
                        Biography: <input type="text" defaultValue={bio} onChange={(e) => setBiography(e.target.value)}/>
                    </label>
                    <label>
                        Links: <input type="text" defaultValue={links} onChange={(e) => setLinks(e.target.value)}/>
                    </label>
                </form>
                <button type="submit" onClick={(e) => handleEdit(e,f_name, l_name, file, bio, links, name)}>Submit Edit</button>
            </header>
        </div>
    )
}

export default ProfileSettings;