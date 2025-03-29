import LoaderText from '../LoaderText/index.tsx'
interface IProps {
    label?: string
}
const LoaderPage = (props: IProps) => {
    return (
        <div>
            {props.label}
            <LoaderText/>
        </div>
    )
}

export default LoaderPage
