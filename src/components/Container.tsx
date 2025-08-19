import { cn } from "@/lib/utils"

interface ContainerProps extends React.ComponentProps<"div"> {}
const Container = ({ children, ...props }:  ContainerProps) => {
  return (
    <div {...props} className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", props.className)}>{children}</div>
  )
}

export default Container