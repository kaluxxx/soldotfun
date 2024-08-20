import {ChangeEvent, useState} from 'react';
import Image from "next/image";
import {Input} from "@/components/ui/input";

interface ProfileImageProps {
    field?: any
    imageSrc: string;
    onImageChange: (event: string) => void;
}

export function ProfileImage({imageSrc, onImageChange}: ProfileImageProps) {
    const [previewSrc, setPreviewSrc] = useState(imageSrc);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setPreviewSrc(URL.createObjectURL(file));
                onImageChange(base64);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="relative self-center">
            {previewSrc && (
                <Image
                    src={previewSrc}
                    alt="Profile"
                    className="w-16 h-16 object-cover rounded-full"
                    width={64}
                    height={64}
                    priority={true}
                    onClick={() => document.getElementById('fileInput')?.click()}
                />
            )}
            <Input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleImageChange}/>
        </div>
    );
}
