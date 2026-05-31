import type { FormEvent } from "react";
import { Button, Input } from "antd";
import { Loader2, Mail, ShieldCheck } from "lucide-react";

interface CodeVerificationCardProps {
    email: string;
    code: string;
    devCode: string;
    isLoading: boolean;
    onCodeChange: (code: string) => void;
    onSubmit: (event: FormEvent) => void;
    onUseDifferentEmail: () => void;
}

export function CodeVerificationCard({
    email,
    code,
    devCode,
    isLoading,
    onCodeChange,
    onSubmit,
    onUseDifferentEmail
}: CodeVerificationCardProps) {
    return (
        <div className="-mt-24 w-full max-w-sm text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-500">
                <Mail className="h-8 w-8" />
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-secondary">
                    Check your email
                </h2>
                <p className="text-muted leading-relaxed">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-bold text-secondary">{email}</span>.
                </p>
            </div>
            {devCode && (
                <div className="rounded-2xl bg-slate-50 p-4 text-left">
                    <p className="text-sm font-bold uppercase  text-muted">
                        Local dev code
                    </p>
                    <p className="mt-1 font-mono text-2xl font-bold text-secondary">
                        {devCode}
                    </p>
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
                <Input.OTP
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="123456"
                    value={code}
                    onChange={event => onCodeChange(event.value)}
                />
                <Button disabled={isLoading} type="primary">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <ShieldCheck className="h-4 w-4" />
                    )}
                    Verify Code
                </Button>
            </form>
            <Button
                className="-mt-6!"
                onClick={onUseDifferentEmail}
                type="text"
            >
                Use a different email
            </Button>
        </div>
    );
}
