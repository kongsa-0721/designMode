/**
 * Created by KongSa on 2022/9/20-9:35 AM.
 */
import React from "react";
import { createPortal } from "react-dom";

const Modal = (props: { message: string; isOpen: boolean; onClose: () => void }) => {
	const { message, isOpen, onClose } = props;
	if (!isOpen) return null;
	return createPortal(
		<div className='modal'>
			<span>{message}</span>
			<button onClick={onClose}>Close</button>
		</div>,
		document.body,
	);
};

function Protal() {
	const [open, setOpen] = React.useState(false);
	return (
		<div className='component'>
			<button onClick={() => setOpen(true)}>Open Modal</button>
			<Modal message='Hello World!' isOpen={open} onClose={() => setOpen(false)} />
		</div>
	);
}
export { Protal };
