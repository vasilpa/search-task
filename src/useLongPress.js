import { useCallback, useRef } from "react";

const useLongPress = (onLongPress, { shouldPreventDefault = true, delay = 300 } = {}, setCounter) => {
    const timeout = useRef();
    const target = useRef();

    const start = useCallback(
        event => {
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            

            timeout.current = setTimeout(() => {
                setCounter(5);
                timeout.current = setTimeout(() => {
                    onLongPress(event);
                }, delay);
            }, 200);
        },
        [onLongPress, delay, shouldPreventDefault, setCounter]
    );

    const clear = useCallback(() => {
            timeout.current && clearTimeout(timeout.current);
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }
        },[shouldPreventDefault]);

    return {
        onMouseDown: e => start(e),
        onTouchStart: e => start(e),
        onMouseUp: e => clear(e),
        onMouseLeave: e => clear(e, false),
        onTouchEnd: e => clear(e)
    };
};

const isTouchEvent = event => {
    return "touches" in event;
};

const preventDefault = event => {
    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;
