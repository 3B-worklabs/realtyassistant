import { ShieldCheck, UserCog, UserPlus, Users } from 'lucide-react';
import { DashboardShell } from '@/components/DashboardShell';
import { StaticModulePage } from '@/components/StaticModulePage';

export default function UsersPage() {
  return (
    <DashboardShell>
      <StaticModulePage
        eyebrow="User management"
        title="Control teams, roles, permissions, branches, and manager-level visibility."
        description="This static admin screen shows how the brokerage can manage staff access before authentication and permissions are connected."
        primaryAction="Invite user"
        stats={[
          { label: 'Active users', value: '24', detail: 'Across sales, rentals, finance', icon: Users },
          { label: 'Roles', value: '06', detail: 'Admin, manager, executive, finance', icon: ShieldCheck },
          { label: 'Invites sent', value: '05', detail: 'Awaiting first login', icon: UserPlus },
          { label: 'Access reviews', value: '03', detail: 'Permission updates pending', icon: UserCog }
        ]}
        tableBadge="Team"
        tableTitle="User access directory"
        columns={[
          { key: 'user', label: 'User' },
          { key: 'role', label: 'Role' },
          { key: 'branch', label: 'Branch' },
          { key: 'lastSeen', label: 'Last active' },
          { key: 'status', label: 'Status' }
        ]}
        rows={[
          { user: 'Omkar Tillu', role: 'Super Admin', branch: 'Mumbai HQ', lastSeen: 'Now', status: 'Active' },
          { user: 'Neha Sharma', role: 'Sales Manager', branch: 'Bandra', lastSeen: '18 min ago', status: 'Active' },
          { user: 'Rahul Nair', role: 'Rental Executive', branch: 'Powai', lastSeen: '42 min ago', status: 'Active' },
          { user: 'Aisha Khan', role: 'Marketing Lead', branch: 'Remote', lastSeen: 'Today', status: 'Active' }
        ]}
        activities={[
          { time: '09:40 AM', title: 'Role updated', detail: 'Neha received manager access for sales reports.' },
          { time: '12:25 PM', title: 'Invite accepted', detail: 'New finance user completed initial setup.' },
          { time: '05:40 PM', title: 'Permission review', detail: 'Marketing export access queued for admin approval.' }
        ]}
        panels={[
          { title: 'Login success', value: '99.2%', detail: 'Across active users' },
          { title: 'Locked users', value: '01', detail: 'Needs admin reset' },
          { title: 'Branch teams', value: '04', detail: 'Mumbai coverage groups' }
        ]}
      />
    </DashboardShell>
  );
}
