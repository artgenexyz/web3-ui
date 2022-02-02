import ReactModal from 'react-modal'

type Props = {
    isOpen: boolean
}

function Popup(props: Props) {
    return (
        <ReactModal
            isOpen={props.isOpen}
        >
            <p>Sign the transaction...</p>
        </ReactModal>
    )
}

export default Popup