import { useEffect, useState } from "react";
import axios from "axios";

function ProfileSettings(){
    const [profile_pic, setProfile_Pic] = useState(null);
    const [display_name, setDisplay_Name] = useState('');
    const [biography, setBiography] = useState('');
    const [links, setLinks] = useState('');

    useEffect(() =>{
        var _id = localStorage.getItem('userID');
        console.log(_id);
        axios.get('http://localhost:9000/getProfile', { params: { _id } })
        .then((res) =>{
            setProfile_Pic(res.data.profile_pic);
            setDisplay_Name(res.data.display_name);
            setBiography(res.data.biography);
            setLinks(res.data.links);
        })
        .catch((error) => {
            console.log('Error in getting Profile:', error);
        })
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