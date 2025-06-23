import React from "react";
import CalendarIcon from "../icons/CalendarIcon";

const CustomDateInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ value, onClick, onChange, className, style, ...props }, ref) => (
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      className={className}
      readOnly
      style={{
        ...style,
        paddingRight: "2.5rem",
        cursor: "pointer",
      }}
      {...props}
    />
    <span
      style={{
        position: "absolute",
        right: "0.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
      onClick={onClick}
      tabIndex={-1}
    >
      <CalendarIcon />
    </span>
  </div>
));
CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
