import {FormControl, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Trash2} from "lucide-react";
import {ChangeEvent, useEffect, useState} from "react";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import {AutoFormInputComponentProps} from "../types";
import Image from "next/image";

export default function AutoFormFile({
                                         label,
                                         isRequired,
                                         fieldConfigItem,
                                         fieldProps,
                                         field,
                                     }: AutoFormInputComponentProps) {
    const {showLabel: _showLabel, ...fieldPropsWithoutShowLabel} = fieldProps;
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const [file, setFile] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isImage, setIsImage] = useState<boolean>(false);

    useEffect(() => {
        if (field.value) {
            // Check if the value is a valid image URL and set the appropriate state
            setFile(field.value);
            setFileName("Selected file");
            setIsImage(true);
        }
    }, [field.value]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setIsImage(file.type.startsWith("image/"));
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result as string);
                setFileName(file.name);
                field.onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveClick = () => {
        setFile(null);
        setFileName(null);
        setIsImage(false);
    };

    return (
        <FormItem>
            {showLabel && (
                <AutoFormLabel
                    label={fieldConfigItem?.label || label}
                    isRequired={isRequired}
                />
            )}
            {!file && (
                <FormControl>
                    <Input
                        type="file"
                        {...fieldPropsWithoutShowLabel}
                        onChange={handleFileChange}
                        value={""}
                    />
                </FormControl>
            )}
            {file && (
                <div className="flex flex-col gap-4 w-full space-y-2">
                    <div>
                        <div
                            className="flex  w-full flex-col items-start justify-between space-y-2 rounded-md bg-white/20 border p-2 dark:bg-white dark:text-black">
                            <div className="flex w-full flex-row items-center justify-between">
                                <p>{fileName}</p>
                                <button onClick={handleRemoveClick} aria-label="Remove file">
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {isImage && (
                        <div>
                            <Image
                                src={file}
                                width={200}
                                height={200}
                                alt={fileName || "Selected file"}
                                className="rounded-md"
                            />
                        </div>
                    )}
                </div>


            )}
            <AutoFormTooltip fieldConfigItem={fieldConfigItem}/>
            <FormMessage/>
        </FormItem>
    );
}
