import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    label,
    value,
    disabled,
}) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }

        reader.readAsDataURL(file);

    }, [handleChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            "image/png": [],
            "image/jpeg": [],
            "image/gif": [],
            "image/svg+xml": [],
        }
    });

    return (
        <div {...getRootProps({
            className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700"
        })}>
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image
                            src={base64}
                            height="200"
                            width="200"
                            alt="Upload Image"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, or JPG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </div> 
                )
            }
        </div>
    );
};

export default ImageUpload;