import {ReactNode} from "react";
import {FormItem} from "@/components/ui/form";
import {cn} from "@/lib/utils";

interface FieldWrapperProps {
    children: ReactNode;
    className?: string;
}
export default function FieldWrapper({children, className}: FieldWrapperProps) {
    return (
        <div className={cn("flex flex-row  items-center space-x-2 ", className)}>
            <FormItem className="flex w-full flex-col justify-start">
                {children}
            </FormItem>
        </div>
    );
}