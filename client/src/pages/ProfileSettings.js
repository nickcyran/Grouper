const { useEffect, useState } = require("react")

function ProfileSettings(){
    const [profile_pic, setProfile_Pic] = useState(null);
    const [display_name, setDisplay_Name] = useState('');
    const [biography, setBiography] = useState('');
    const [links, setLinks] = useState('');

    useEffect(() =>{
        var user = localStorage.getItem('userID');
        axios.get('http://localhost:9000/getUserByID', { params: { id: user } })
        .then((res) =>{
            setProfile_Pic(res.data.profile.profile_pic);
            setDisplay_Name(res.data.profile.display_name);
            setBiography(res.data.profile.biography);
            setLinks(res.data.profile.links);
        })
        .catch((error) => {
            console.log('Error in getting Profile:', error);
        })
    })

    return(
        <div className="Profile">
            <header className="Profile-header">
                
            </header>
        </div>
    )
}

export default ProfileSettings;