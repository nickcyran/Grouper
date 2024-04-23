import { useEffect, useState } from "react";
import axios from "axios";
import { getProfile } from "../controllers/user";

function ProfileSettings(){
    const [profile_pic, setProfile_Pic] = useState('');
    const [display_name, setDisplay_Name] = useState('');
    const [biography, setBiography] = useState('');
    const [links, setLinks] = useState('');

    useEffect(() =>{
        var _id = localStorage.getItem('userID');
        getProfile(_id)
        setProfile_Pic(localStorage.getItem('PFP'));
        setDisplay_Name(localStorage.getItem('displayName'));
        setBiography(localStorage.getItem('bio'));
        setLinks(localStorage.getItem('links'));
    })

    const handleEdit = (event) =>{
        event.preventDefault();
        
    }

    return(
        <div className="Profile">
            <header className="Profile-header">
                <form>
                    <label> 
                        Profile Picture: {profile_pic}
                    </label>
                    <label>
                        Name: <input type="text" defaultValue={display_name} onChange={(e) => setDisplay_Name(e.target.value)}></input>
                    </label>
                    <label>
                        Biography: <input type="text-box" defaultValue={biography} onChange={(e) => setBiography(e.target.value)}></input>
                    </label>
                    <label>
                        Links: <input type="text" defaultValue={links} onChange={(e) => setLinks(e.target.value)}></input>
                    </label>
                </form>
                <button type="submit" onClick={(e) => handleEdit(e)}>Submit Edit</button>
            </header>
        </div>
    )
}

export default ProfileSettings;