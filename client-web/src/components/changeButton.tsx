import { ComponentProps } from "react";

export function ChangeButton(props: ComponentProps<"button">) {
  return (
    <button
      className="bg-transparent border border-white text-white text-xs py-2 px-12 rounded-lg font-semibold tracking-tight mt-2"
      {...props}
    >
      {props.value}
    </button>
  );
}
