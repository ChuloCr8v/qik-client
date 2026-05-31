import {
    CheckCircle2,
    MoreHorizontal,
    Search,
    UserPlus,
    Users,
    Zap
} from "lucide-react";
import { useState } from "react";
import SummaryCard from "../components/global/SummaryCards";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import TeamInviteModal from "../components/TeamInviteModal";
import { useListUsersQuery } from "../features/users/usersApi";
import { Button, Empty, Input, Select, Spin, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { User } from "../types";

type TeamRow = User & { id: string };

export default function TeamPage() {
    const { data: membersData = [], isLoading: loading } = useListUsersQuery();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Away">(
        "All"
    );

    const members: TeamRow[] = membersData.map(member => ({
        ...member,
        id: member.uid
    }));

    const filteredMembers = members.filter(m => {
        const matchesSearch =
            m.displayName.toLowerCase().includes(search.toLowerCase()) ||
            (m.email && m.email.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus =
            statusFilter === "All" || m.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const columns: ColumnsType<TeamRow> = [
        {
            title: "Member",
            dataIndex: "displayName",
            render: (_value, member) => (
                <div className="flex items-center gap-3">
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
                            {member.email || "No email provided"}
                        </span>
                    </div>
                </div>
            )
        },
        {
            title: "Role",
            dataIndex: "role",
            render: role => (
                <span className="text-xs md:text-sm font-medium text-muted">
                    {role || "Member"}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            render: status => (
                <Tag
                    color={status === "Away" ? "warning" : "success"}
                    className="m-0! inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]! font-semibold uppercase"
                >
                    <div
                        className={`h-1.5 w-1.5 rounded-full ${status === "Away" ? "bg-amber-400" : "bg-accent"}`}
                    />
                    {status || "Active"}
                </Tag>
            )
        },
        {
            title: "Actions",
            key: "actions",
            align: "right",
            render: () => (
                <Button
                    type="text"
                    size="small"
                    icon={<MoreHorizontal className="h-4 w-4" />}
                />
            )
        }
    ];

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-3 mx-auto max-w-6xl p-4">
            <PageHeader
                title="Team Members"
                // description="Invite and manage roles for your team collaborators."
                action={
                    <Button
                        type="primary"
                        icon={<UserPlus className="h-4 w-4" />}
                        onClick={() => setIsInviteModalOpen(true)}
                    >
                        <span className="hidden md:block">Invite Member</span>
                    </Button>
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
                        <Input
                            prefix={<Search className="h-3.5 w-3.5 text-muted" />}
                            type="text"
                            placeholder="Search members..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onChange={value => setStatusFilter(value)}
                        className="w-36"
                        options={[
                            { label: "All Status", value: "All" },
                            { label: "Active", value: "Active" },
                            { label: "Away", value: "Away" }
                        ]}
                    />
                </div>

                {filteredMembers.length > 0 ? (
                    <Table columns={columns} dataSource={filteredMembers} />
                ) : (
                    <div className="rounded-xl border border-border bg-white py-12">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No members match your criteria"
                        />
                    </div>
                )}
            </div>

            <TeamInviteModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />
        </div>
    );
}
