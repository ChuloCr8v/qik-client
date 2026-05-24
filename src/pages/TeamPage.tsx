import React, {
  useState
} from 'react';
import PageHeader from '../components/PageHeader';
import Table, {
  TableRow,
  TableCell
} from '../components/Table';
import {
  UserPlus,
  Shield,
  MoreHorizontal,
  Loader2,
  Users,
  Zap,
  CheckCircle2,
  Search,
  Filter
} from 'lucide-react';
import {
  User
} from '../types';
import TeamInviteModal from '../components/TeamInviteModal';
import {
  useListUsersQuery
} from '../features/users/usersApi';

const DEMO_MEMBERS: User[] = [{
  uid: 'd1',
  displayName: 'John Doe',
  email: 'john@example.com',
  role: 'Owner',
  status: 'Active'
},
  {
    uid: 'd2',
    displayName: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'Active'
  },
  {
    uid: 'd3',
    displayName: 'Mike Ross',
    email: 'mike@example.com',
    role: 'Member',
    status: 'Away'
  },
  {
    uid: 'd4',
    displayName: 'Harvey Specter',
    email: 'harvey@example.com',
    role: 'Member',
    status: 'Active'
  },
];

export default function TeamPage() {
  const {
    data: membersData = [],
    isLoading: loading
  } = useListUsersQuery();
  const [isInviteModalOpen,
    setIsInviteModalOpen] = useState(false);
  const [search,
    setSearch] = useState('');
  const [statusFilter,
    setStatusFilter] = useState < 'All' | 'Active' | 'Away' > ('All');

  const members = membersData.length > 0 ? membersData: DEMO_MEMBERS;

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.displayName.toLowerCase().includes(search.toLowerCase()) ||
    (m.email && m.email.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
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
    <div className="space-y-4 mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Team Members"
        // description="Invite and manage roles for your team collaborators."
        action={
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="button-primary flex items-center gap-2"
          >
          <UserPlus className="h-4 w-4" />
          <span>Invite Member</span>
        </button>
        }
        />

      <div className="grid gap-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {[{
            label: 'Members', value: members.length.toString(), icon: Users, color: 'text-primary', bg: 'bg-primary/5'
          },
            {
              label: 'Active', value: (members.filter(m => m.status === 'Active').length).toString(), icon: CheckCircle2, color: 'text-accent', bg: 'bg-accent/5'
            },
            {
              label: 'Limit', value: '∞', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/5'
            },
          ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-2xl border border-border bg-white p-3 shadow-xs transition-all hover:shadow-md sm:p-5">
                <div className={`md:flex hidden h-8 w-8 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted sm:text-[10px]">
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold text-secondary sm:text-2xl">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-slate-50/50 py-2 pl-9 pr-4 text-xs font-medium focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="appearance-none h-full flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer outline-none"
            >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Away">Away</option>
          </select>
        </div>
      </div>

      <Table headers={['#', 'Member', 'Role', 'Status', '']}>
        {filteredMembers.length > 0 ? filteredMembers.map((member, index) => (
          <TableRow key={member.uid}>
            <TableCell className="w-8 text-muted font-semibold">{index + 1}</TableCell>
            <TableCell className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-border">
                {member.photoURL ? (
                  <img src={member.photoURL} alt={member.displayName} className="h-full w-full object-cover" />
              ): (
                <span className="text-sm font-semibold text-secondary">{member.displayName[0]}</span>
              )}
              {member.uid.startsWith('d') && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-[6px] text-white font-semibold uppercase">Demo</span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-secondary">{member.displayName}</span>
              <span className="text-xs text-muted leading-none mt-0.5">{member.email || 'No email provided'}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <Shield className="h-3 w-3" />
              {member.role || 'Member'}
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1.5">
              <div className={`h-1.5 w-1.5 rounded-full ${member.status === 'Away' ? 'bg-amber-400': 'bg-accent'}`} />
              <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest">{member.status || 'Active'}</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <button className="p-1 text-muted hover:text-primary transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </TableCell>
        </TableRow>
        )): (
        <TableRow>
          <TableCell colSpan={5} className="py-12 text-center text-muted">
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