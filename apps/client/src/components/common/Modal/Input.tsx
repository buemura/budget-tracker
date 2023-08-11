interface InputProps {
  labelText: string;
  inputId: string;
  inputType: string;
  value: any;
  onChangeValue: (value: any) => void;
}

export function ModalInput({
  labelText,
  inputId,
  inputType,
  value,
  onChangeValue
}: InputProps) {
  if (inputType === 'checkbox') {
    return (
      <>
        <label htmlFor={inputId}>{labelText}</label>
        <input
          id={inputId}
          className="outline-none p-1"
          type={inputType}
          checked={value}
          onChange={() => onChangeValue((prev: any) => !prev)}
        />
      </>
    );
  }

  return (
    <>
      <label htmlFor={inputId}>{labelText}</label>
      <input
        id={inputId}
        className="outline-none p-1"
        type={inputType}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </>
  );
}
