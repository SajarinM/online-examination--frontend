import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./Popup.scss";

const Popup = forwardRef(({ children }, ref) => {
	const [isVisible, setIsVisibile] = useState(false);

	function show() {
		setIsVisibile(true);
	}

	function close() {
		setIsVisibile(!isVisible);
	}

	// const childrenWithProps = React.Children.map(children, (child) => {
	// 	// checking isValidElement is the safe way and avoids a typescript error too
	// 	if (React.isValidElement(child)) {
	// 		return React.cloneElement(child, { show, close });
	// 	}
	// 	return child;
	// });
	
	useImperativeHandle(ref, () => ({
		show,
		close,
	}));

	return isVisible ? (
		<div ref={ref} className="popup">
			{children}
			<div className="popup__close" onClick={close}>
				&times;
			</div>
		</div>
	) : null;
});

Popup.displayName = "Popup";

export default Popup;
