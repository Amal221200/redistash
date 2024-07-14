import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { ReactNode } from 'react'
import { Button } from './ui/button';



const UploadWidgetButton = ({ children, onSuccess }: { children: ReactNode, onSuccess: (val: string) => void }) => {
    return (
        <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={(result, { widget }) => {
            onSuccess((result.info as CloudinaryUploadWidgetInfo).secure_url)
            widget.close()
        }}>
            {({ open }) => {
                return (
                    <Button onClick={() => open()} className="size-9 shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:text-white" size="icon" variant="ghost">
                        {children}
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}

export default UploadWidgetButton