import React, { useState, useEffect } from "react";
import { Input, Spin } from "antd";
import CustomDrawer from "./CustomDrawer";
import { Camera, User as UserIcon, Building, FileText } from "lucide-react";
import { getAnimeAvatar } from "../lib/userUtils";
import { useAuth } from "../features/auth/AuthProvider";
import {
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation
} from "../features/users/usersApi";
import toast from "react-hot-toast";

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ProfileEditModal({
    isOpen,
    onClose,
    onSuccess
}: ProfileEditModalProps) {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [bio, setBio] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data } = useGetCurrentUserQuery(undefined, {
        skip: !user || !isOpen
    });
    const [updateUserProfile] = useUpdateCurrentUserMutation();

    useEffect(() => {
        if (isOpen && user && data) {
            setDisplayName(data.displayName || user.displayName || "");
            setPhotoURL(data.photoURL || user.photoURL || "");
            setBio(data.bio || "");
            setJobTitle(data.jobTitle || "");
        }
    }, [isOpen, user, data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!displayName.trim()) {
            setError("Display name is required");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            await updateUserProfile({
                displayName,
                photoURL,
                bio,
                jobTitle
            }).unwrap();
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to update profile");
            toast.error(err.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomDrawer
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Your Profile"
            icon={<UserIcon className="h-5 w-5 text-primary" />}
            onOk={() =>
                (
                    document.getElementById(
                        "profile-form"
                    ) as HTMLFormElement | null
                )?.requestSubmit()
            }
            okText="Save Changes"
            loading={loading}
            disabled={initialLoading}
        >
            <form
                id="profile-form"
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {initialLoading ? (
                    <div className="flex justify-center py-12">
                        <Spin />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center gap-4">
                            <div className="group relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md transform transition-transform hover:scale-105">
                                <img
                                    src={
                                        photoURL ||
                                        (user
                                            ? getAnimeAvatar(
                                                  user.email || user.uid
                                              )
                                            : "")
                                    }
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                                <div className="invisible group-hover:visible absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity">
                                    <Camera className="h-4 w-4 text-white" />
                                    <span className="text-xs font-bold text-white uppercase ">
                                        Change
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label>Display Name</label>
                                <Input
                                    required
                                    value={displayName}
                                    onChange={e =>
                                        setDisplayName(e.target.value)
                                    }
                                    placeholder="e.g. Alex Rivera"
                                    className="h-9! text-xs!"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label>Job Title</label>
                                <Input
                                    value={jobTitle}
                                    onChange={e => setJobTitle(e.target.value)}
                                    placeholder="e.g. Senior Product Designer"
                                    className="h-9! text-xs!"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label>Short Bio</label>
                                <Input.TextArea
                                    rows={3}
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    placeholder="Tell us a little about yourself... This will be used to develop better context for your Agendas"
                                    className="text-xs! pt-2!"
                                />
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                <label>Avatar URL</label>
                                <Input
                                    value={photoURL}
                                    onChange={e => setPhotoURL(e.target.value)}
                                    placeholder="https://images.unsplash.com/photo..."
                                    className="h-9! mb-2! text-xs!"
                                />
                                <p className="text-xs! md:text-sm! mt-4! text-muted">
                                    Use a direct link to an image (Unsplash,
                                    Google Photos, etc.)
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 p-3">
                                <p className="text-sm font-semibold text-red-500">
                                    {error}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </form>
        </CustomDrawer>
    );
}
