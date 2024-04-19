import { PageContent, Messaging } from '.'

const Left = () => {
    return (
        <>
            channels
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
           Members
        </>
    )
}

const Group = ({ group }) => {
    return <PageContent Left={Left} Main={Main} Right={Right} group={group} />
}

export default Group;