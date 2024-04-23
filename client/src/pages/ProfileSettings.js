import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getProfile, updateProfile } from "../controllers/user";

function ProfileSettings(){
    const initialized = useRef(false);
    const [pic, setProfile_Pic] = useState('');
    const [name, setDisplay_Name] = useState('');
    const [bio, setBiography] = useState('');
    const [link, setLinks] = useState('');
    const _id = localStorage.getItem('userID');

    useEffect(() =>{
        if(!initialized.current){
            initialized.current = true;
            getProfile(_id);
            setProfile_Pic(localStorage.getItem('PFP'));
            setDisplay_Name(localStorage.getItem('displayName'));
            setBiography(localStorage.getItem('bio'));
            setLinks(localStorage.getItem('links'));
        }
    })

    const handleEdit = (e, profile_pic, biography, links, display_name) =>{
        e.preventDefault();
        updateProfile({ _id: _id, profile_pic, biography, links, display_name })
    }

    return(
        <div className="Profile">
            <header className="Profile-header">
                <form>
                    <label> 
                        Profile Picture: {pic}
                    </label>
                    <label>
                        Name: <input type="text" defaultValue={name} onChange={(e) => setDisplay_Name(e.target.value)}></input>
                    </label>
                    <label>
                        Biography: <input type="text" defaultValue={bio} onChange={(e) => setBiography(e.target.value)}></input>
                    </label>
                    <label>
                        Links: <input type="text" defaultValue={link} onChange={(e) => setLinks(e.target.value)}></input>
                    </label>
                </form>
                <button type="submit" onClick={(e) => handleEdit(e, pic, bio, link, name)}>Submit Edit</button>
            </header>
        </div>
    )
}

export default ProfileSettings;