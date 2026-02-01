"use client";

import { useState } from "react";
import { uploadImage } from "@/app/admin/actions/upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadImage(formData);
            if (res.error) {
                console.error(res.error);
                alert("Upload failed");
            } else if (res.url) {
                onChange(res.url);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsUploading(false);
        }
    };

    if (value) {
        return (
            <div className="relative w-full h-60 rounded-md overflow-hidden border border-input">
                <div className="absolute top-2 right-2 z-10">
                    <Button type="button" onClick={onRemove} variant="destructive" size="icon">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <Image
                    fill
                    style={{ objectFit: "cover" }}
                    alt="Image"
                    src={value}
                    sizes="(max-width: 768px) 100vw, 400px"
                />
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center">
            <label className="
                w-full h-60 
                flex flex-col items-center justify-center 
                border-2 border-dashed border-input rounded-md 
                cursor-pointer hover:bg-accent/50 transition
            ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                    ) : (
                        <>
                            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                            <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Cliquez pour téléverser</span>
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF (Max 4MB)</p>
                        </>
                    )}
                </div>
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onUpload}
                    disabled={isUploading}
                />
            </label>
        </div>
    );
}
