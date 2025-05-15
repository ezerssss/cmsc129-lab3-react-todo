import clsx from "clsx";

function Button({ className, children, ...props }) {
    return (
        <button
            className={clsx(
                "rounded-lg py-2 px-4 cursor-pointer transition hover:scale-105 bg-black text-white text-sm disabled:cursor-default disabled:opacity-50",
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
