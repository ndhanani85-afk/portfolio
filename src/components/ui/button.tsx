import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    let variantStyles = "bg-[#0B3C2D] text-white hover:bg-[#07291f] shadow-md";
    if (variant === "outline") {
      variantStyles = "border border-[#E4DDD0] bg-white hover:bg-[#FAF8F5] text-[#13221C]";
    } else if (variant === "ghost") {
      variantStyles = "bg-transparent hover:bg-[#FAF8F5] text-[#5E5852]";
    } else if (variant === "secondary") {
      variantStyles = "bg-[#FAF8F5] hover:bg-[#EDE7DA] text-[#5E5852] border border-[#E4DDD0]";
    }

    let sizeStyles = "px-4 py-2 text-sm";
    if (size === "sm") sizeStyles = "px-3 py-1.5 text-xs";
    if (size === "lg") sizeStyles = "px-6 py-3 text-base";

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-bold rounded-2xl transition-all disabled:opacity-50 disabled:pointer-events-none ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
