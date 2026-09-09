"use client";

import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface AlertDialogContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const AlertDialog = ({
  open: controlledOpen,
  onOpenChange,
  children,
}: AlertDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === "function" ? value(open) : value;
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, open, onOpenChange]
  );

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within an AlertDialog");
  }
  return context;
};

export interface AlertDialogTriggerProps {
  children?: React.ReactNode;
  render?: React.ReactNode;
}

export const AlertDialogTrigger = ({
  children,
  render,
}: AlertDialogTriggerProps) => {
  const { setOpen } = useAlertDialog();

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (render as any).props?.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );
};

export interface AlertDialogPopupProps {
  from?: "bottom" | "center" | "top" | "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export const AlertDialogPopup = ({
  from = "bottom",
  className = "",
  children,
}: AlertDialogPopupProps) => {
  const { open, setOpen } = useAlertDialog();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Trigger entrance animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimating(true);
        });
      });
      document.body.style.overflow = "hidden";
    } else {
      setAnimating(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 250);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!mounted) return null;

  // Calculate transform according to `from` prop
  const getInitialTransform = () => {
    switch (from) {
      case "bottom":
        return "translate-y-10 scale-[0.96] opacity-0";
      case "top":
        return "-translate-y-10 scale-[0.96] opacity-0";
      case "left":
        return "-translate-x-10 scale-[0.96] opacity-0";
      case "right":
        return "translate-x-10 scale-[0.96] opacity-0";
      case "center":
      default:
        return "scale-90 opacity-0";
    }
  };

  const activeTransform = "translate-x-0 translate-y-0 scale-100 opacity-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with fade */}
      <div
        className={`fixed inset-0 bg-[#13221C]/60 backdrop-blur-sm transition-opacity duration-300 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Popup card with spring slide & scale animation */}
      <div
        className={`relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E4DDD0] text-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          animating ? activeTransform : getInitialTransform()
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export const AlertDialogHeader = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`space-y-2 mb-5 ${className}`}>{children}</div>;

export const AlertDialogTitle = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h2
    className={`text-xl sm:text-2xl font-black text-[#13221C] tracking-tight ${className}`}
  >
    {children}
  </h2>
);

export const AlertDialogDescription = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p className={`text-xs sm:text-sm text-[#5E5852] leading-relaxed ${className}`}>
    {children}
  </p>
);

export const AlertDialogFooter = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-6 pt-2 ${className}`}
  >
    {children}
  </div>
);

export const AlertDialogCancel = ({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { setOpen } = useAlertDialog();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-[#E4DDD0] bg-[#FAF8F5] hover:bg-[#EDE7DA] text-[#5E5852] text-xs sm:text-sm font-bold transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export const AlertDialogAction = ({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { setOpen } = useAlertDialog();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={`w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#0B3C2D] hover:bg-[#07291f] text-white text-xs sm:text-sm font-bold transition-all shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export interface BaseAlertDialogDemoProps {
  from: AlertDialogPopupProps["from"];
}

export const BaseAlertDialogDemo = ({ from }: BaseAlertDialogDemoProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button
          type="button"
          className="px-4 py-2 rounded-xl border border-[#E4DDD0] bg-white hover:bg-[#FAF8F5] text-sm font-semibold"
        >
          Open Dialog
        </button>
      </AlertDialogTrigger>
      <AlertDialogPopup from={from} className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
};

