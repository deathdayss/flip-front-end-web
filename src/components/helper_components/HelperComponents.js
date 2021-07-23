export const ForLoop = ({index, loopNum, LoopContent, PackingContent}) => {
    const Output = []
    for (let i = 0; i < loopNum; ++i) {
        Output.push(<LoopContent index = {i}  />)
    }
    if (PackingContent) {
        return <PackingContent index = {index} Output = {Output} />
    }
    else {
        return <>{Output }</>
    }
}