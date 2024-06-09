import { ComponentProps } from "react";

export function EnterInput(props: ComponentProps<"input">) {
  return (
    <input
      className="bg-white/10 border-none m-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-white"
      required
      {...props}
    />
  );
}
