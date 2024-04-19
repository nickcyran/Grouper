import { PageContent, Messaging } from '.'

const Left = () => {
    return (
        <>
            Friends
        </>
    )
}

const Main = ({ group }) => {
    return (
        <>
            <Messaging group={group} />
        </>
    )
}

const Right = () => {
    return (
        <>
            User Profile
        </>
    )
}

const Friends = ({ group }) => {
    return <PageContent Left={Left} Main={Main} Right={Right} group={group} />
}

export default Friends;
