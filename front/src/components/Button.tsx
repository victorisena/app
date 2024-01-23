interface ButtonProps {
    className?: string
    children: any
    onClick?: () => void
}

export default function Button(props : ButtonProps) {
    return (
        <button onClick={props.onClick} className={`
            bg-gradient-to-r from-gray-500 to-gray-600
            text-white px-4 py-2 rounded-md
            ${props.className}
        `}>
            {props.children}
        </button>
    )
}