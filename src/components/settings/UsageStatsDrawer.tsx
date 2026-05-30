import { Empty, Progress, Skeleton, Statistic, Tag } from "antd";
import { Activity, BarChart3, CalendarClock, CheckCircle2, Sparkles, Users } from "lucide-react";
import type { ElementType } from "react";
import CustomDrawer from "../CustomDrawer";
import { useGetBillingUsageStatsQuery } from "../../features/billing/billingApi";

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const formatFeature = (feature: string) =>
  feature
    .toLowerCase()
    .split("_")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const percentage = (used: number, limit: number | null) => {
  if (limit === null || limit <= 0) return 100;
  return Math.min(Math.round((used / limit) * 100), 100);
};

export default function UsageStatsDrawer() {
  const { data, isLoading } = useGetBillingUsageStatsQuery();

  const aiPercent = data ? percentage(data.aiGenerations.used, data.aiGenerations.limit) : 0;
  const teamPercent = data ? percentage(data.teamMembers.used, data.teamMembers.limit) : 0;
  const hasUsageBreakdown = Boolean(data?.usageByFeature.length);
  const hasRecentUsage = Boolean(data?.recentUsage.length);

  return (
    <CustomDrawer
      title="Usage Stats"
      modalSubtitle="Live plan usage and account activity for this billing month."
      icon={<BarChart3 className="h-5 w-5" />}
      width={520}
      hideFooter
      maxHeight
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : !data ? (
        <Empty description="Usage data is not available" />
      ) : (
        <div className="space-y-4">
          <section className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-secondary">{data.plan.type} Plan</p>
                <p className="mt-1 text-sm text-muted">
                  {formatDate(data.period.from)} - {formatDate(data.period.to)}
                </p>
              </div>
              <Tag color={data.plan.status === "active" ? "green" : "gold"}>
                {data.plan.status}
              </Tag>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              <div className="flex justify-between gap-3">
                <span>Role</span>
                <span className="font-semibold capitalize text-secondary">{data.plan.role}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Renews</span>
                <span className="font-semibold text-secondary">{formatDate(data.plan.renewsAt)}</span>
              </div>
              {data.plan.pendingPlanType && (
                <div className="flex justify-between gap-3">
                  <span>Pending plan</span>
                  <span className="font-semibold text-secondary">{data.plan.pendingPlanType}</span>
                </div>
              )}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3">
            <MetricStat icon={CalendarClock} label="Meetings" value={data.meetings.total} />
            <MetricStat icon={Activity} label="This month" value={data.meetings.thisMonth} />
            <MetricStat icon={CheckCircle2} label="Completed" value={data.meetings.completed} />
            <MetricStat icon={Users} label="Scheduled" value={data.meetings.scheduled} />
          </div>

          <section className="rounded-2xl border border-border bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-secondary">AI generations</h3>
            </div>
            <Progress
              percent={aiPercent}
              status={aiPercent >= 100 && data.aiGenerations.limit !== null ? "exception" : "active"}
              strokeColor="#D97706"
            />
            <p className="mt-2 text-sm text-muted">
              <span className="font-bold text-secondary">{data.aiGenerations.used}</span>
              {" "}used of{" "}
              <span className="font-bold text-secondary">
                {data.aiGenerations.limit === null ? "unlimited" : data.aiGenerations.limit}
              </span>
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-secondary">Team seats</h3>
            </div>
            <Progress percent={teamPercent} strokeColor="#10B981" />
            <p className="mt-2 text-sm text-muted">
              <span className="font-bold text-secondary">{data.teamMembers.used}</span>
              {" "}used of{" "}
              <span className="font-bold text-secondary">{data.teamMembers.limit}</span>
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-white p-4">
            <h3 className="text-sm font-bold text-secondary">Usage by feature</h3>
            <div className="mt-3 space-y-2">
              {hasUsageBreakdown ? (
                data.usageByFeature.map(item => (
                  <div key={item.feature} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                    <span className="text-sm font-medium text-secondary">{formatFeature(item.feature)}</span>
                    <Tag color="blue">{item.count}</Tag>
                  </div>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No usage logged this month" />
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-4">
            <h3 className="text-sm font-bold text-secondary">Recent activity</h3>
            <div className="mt-3 space-y-2">
              {hasRecentUsage ? (
                data.recentUsage.map(item => (
                  <div key={item.id} className="rounded-xl border border-border px-3 py-2">
                    <p className="text-sm font-semibold text-secondary">{formatFeature(item.feature)}</p>
                    <p className="text-xs text-muted">{formatDate(item.createdAt)}</p>
                  </div>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No recent usage events" />
              )}
            </div>
          </section>
        </div>
      )}
    </CustomDrawer>
  );
}

function MetricStat({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <Statistic
        title={<span className="text-xs font-bold uppercase text-muted">{label}</span>}
        value={value}
        valueStyle={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}
      />
    </div>
  );
}
