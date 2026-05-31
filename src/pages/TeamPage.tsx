import {
    CheckCircle2,
    Loader2,
    MoreHorizontal,
    Search,
    Shield,
    UserPlus,
    Users,
    Zap
} from "lucide-react";
import { useState } from "react";
import SummaryCard from "../components/global/SummaryCards";
import PageHeader from "../components/PageHeader";
import Table, { TableCell, TableRow } from "../components/Table";
import TeamInviteModal from "../components/TeamInviteModal";
import { useListUsersQuery } from "../features/users/usersApi";
import { Input, Button } from "antd";

export default function TeamPage() {
    const { data: membersData = [], isLoading: loading } = useListUsersQuery();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Away">(
        "All"
    );

    const members = membersData;

    const filteredMembers = members.filter(m => {
        const matchesSearch =
            m.displayName.toLowerCase().includes(search.toLowerCase()) ||
            (m.email && m.email.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus =
            statusFilter === "All" || m.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-3 mx-auto max-w-6xl p-4">
            <PageHeader
                title="Team Members"
                // description="Invite and manage roles for your team collaborators."
                action={
                    <button
                        onClick={() => setIsInviteModalOpen(true)}
                        className="button-primary flex items-center gap-2"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden md:block">Invite Member</span>
                    </button>
                }
            />

            <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-2">
                    {[
                        {
                            label: "Members",
                            value: members.length.toString(),
                            icon: Users,
                            color: "text-primary",
                            bg: "bg-primary/5"
                        },
                        {
                            label: "Active",
                            value: members
                                .filter(m => m.status === "Active")
                                .length.toString(),
                            icon: CheckCircle2,
                            color: "text-accent",
                            bg: "bg-accent/5"
                        },
                        {
                            label: "Limit",
                            value: "∞",
                            icon: Zap,
                            color: "text-amber-500",
                            bg: "bg-amber-500/5"
                        }
                    ].map((stat, i) => (
                        <SummaryCard key={i} stat={stat} />
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                        <Input
                            className="h-8! text-xs!"
                            type="text"
                            placeholder="Search members..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={e =>
                                setStatusFilter(e.target.value as any)
                            }
                            className="appearance-none h-8! flex items-center gap-2 rounded-lg border border-border bg-white px-3 text-muted text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer outline-none"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Away">Away</option>
                        </select>
                    </div>
                </div>

                <Table headers={["#", "Member", "Role", "Status", ""]}>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <TableRow key={member.uid}>
                                <TableCell className="w-8 text-muted">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="flex items-center gap-3">
                                    <div className="relative h-7 w-7 shrink-0 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-border">
                                        {member.photoURL ? (
                                            <img
                                                src={member.photoURL}
                                                alt={member.displayName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs md:text-sm font-semibold text-secondary">
                                                {member.displayName[0]}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-secondary">
                                            {member.displayName}
                                        </span>
                                        <span className="text-xs text-muted leading-none mt-0.5">
                                            {member.email ||
                                                "No email provided"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-xs  md:text-sm font-medium text-muted">
                                        {/* <Shield className="h-3 w-3" /> */}
                                        {member.role || "Member"}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className={`h-1.5 w-1.5 rounded-full ${member.status === "Away" ? "bg-amber-400" : "bg-accent"}`}
                                        />
                                        <span className="text-xs font-semibold text-secondary uppercase ">
                                            {member.status || "Active"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button size="small">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="py-12 text-center text-muted"
                            >
                                No members match your criteria
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </div>

            <TeamInviteModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />
        </div>
    );
}
