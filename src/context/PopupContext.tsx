import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface PopupContextValue {
    isModalOpen: boolean;
    isDrawerOpen: boolean;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    openDrawer: (content: ReactNode) => void;
    closeDrawer: () => void;
}

const PopupContext = createContext<PopupContextValue | null>(null);

export function PopupProvider({ children }: { children: ReactNode }) {
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [drawerContent, setDrawerContent] = useState<ReactNode>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const value = useMemo(
        () => ({
            isModalOpen,
            isDrawerOpen,
            openModal: (content: ReactNode) => {
                setModalContent(content);
                setIsModalOpen(true);
            },
            closeModal: () => {
                setIsModalOpen(false);
                setTimeout(() => setModalContent(null), 200);
            },
            openDrawer: (content: ReactNode) => {
                setDrawerContent(content);
                setIsDrawerOpen(true);
            },
            closeDrawer: () => {
                setIsDrawerOpen(false);
                setTimeout(() => setDrawerContent(null), 200);
            },
        }),
        [isDrawerOpen, isModalOpen]
    );

    return (
        <PopupContext.Provider value={value}>
            {children}
            {modalContent}
            {drawerContent}
        </PopupContext.Provider>
    );
}

export function usePopup() {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error("usePopup must be used within PopupProvider");
    }
    return context;
}
