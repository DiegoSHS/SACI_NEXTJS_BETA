import { Toaster, useToaster } from 'react-hot-toast'

const Notify = () => {
    const { handlers } = useToaster()
    const { startPause, endPause } = handlers
    return (
        <div onMouseEnter={startPause} onMouseLeave={endPause}>
             <Toaster position='top-right'/>
        </div>
    )
}

export default Notify