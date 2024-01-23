interface InputProps {
  type?: "text" | "number" | "date" | 'file';
  accept?: string
  text?: string
  value?: any;
  className?: string
  readonly?: boolean
  onChangeValue?: (value: any) => void
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col">
      {props?.text ? <label className={`mb-2`}>{props.text}</label> : false}
      <input
        type={props.type ?? "text"}
        value={props.value}
        className={`
                    border border-gray-500 rounded-lg
                    focus:outline-none bg-gray-100
                    px-4 py-2 mb-2 focus:bg-white
                    ${props?.className}
                `}
        readOnly={props?.readonly || false}
        onChange={e => {
          props.onChangeValue?.(e.target.value)
        }}
        accept={props.accept}
      />
    </div>
  );
}
