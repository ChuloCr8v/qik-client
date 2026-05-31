import type { FormEvent } from "react";
import { Loader2, LogIn, Mail } from "lucide-react";
import { Button, Input } from "antd";
interface EmailSignInFormProps {
    email: string;
    isLoading: boolean;
    onEmailChange: (email: string) => void;
    onSubmit: (event: FormEvent) => void;
}

export function EmailSignInForm({
    email,
    isLoading,
    onEmailChange,
    onSubmit
}: EmailSignInFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <label>Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                    <Input
                        required
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={event => onEmailChange(event.target.value)}
                    />
                </div>
            </div>
            <Button
                loading={isLoading}
                type="primary"
                className="w-full"
                disabled={isLoading}
                onClick={onSubmit}
            >
              
                Send Sign-In Code
            </Button>
        </form>
    );
}
