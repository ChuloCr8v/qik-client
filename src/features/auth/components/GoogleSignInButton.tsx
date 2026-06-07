import { Loader2 } from "lucide-react";
import { Button } from "antd";
interface GoogleSignInButtonProps {
    isLoading: boolean;
    onClick: () => void;
}

export function GoogleSignInButton({
    isLoading,
    onClick
}: GoogleSignInButtonProps) {
    return (
        <Button className="w-full" onClick={onClick} disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
                <img src="/google.webp" alt="Google" className="h-4 w-4" />
            )}
            Continue with Google
        </Button>
    );
}
