const asset = (name: string) =>
  `${import.meta.env.BASE_URL}student-compliance/${name}`;

const Icon = ({ name, size }: { name: string; size: number }) => (
  <span className="inline-flex shrink-0 overflow-hidden" style={{ width: size, height: size }}>
    <img src={asset(name)} alt="" width={size} height={size} className="block size-full" />
  </span>
);

const STATUS = {
  expiring: "bg-[#ffd4d4] text-[#b71c1c]",
  progress: "bg-[#d0e6ff] text-[rgba(0,0,0,0.87)]",
  start: "bg-[#d8d8d8] text-[rgba(0,0,0,0.87)]",
} as const;

type Requirement = {
  title: string;
  category: string;
  due: string;
  alert?: string;
  status: keyof typeof STATUS;
  statusLabel: string;
};

const REQUIREMENTS: Requirement[] = [
  {
    title: "COVID-19 Vaccination",
    category: "Health & Immunization",
    due: "Due on 05/01/2026",
    alert: "Expiring on 05/01/2026",
    status: "expiring",
    statusLabel: "Expiring",
  },
  {
    title: "CPR/BLS",
    category: "Certifications & trainings",
    due: "Due on 05/01/2026",
    alert: "Expired on 04/01/2026",
    status: "progress",
    statusLabel: "In Progress",
  },
  {
    title: "Flu (Influenza)",
    category: "Health & Immunization",
    due: "Due on 05/01/2026",
    status: "start",
    statusLabel: "Get Started",
  },
  {
    title: "Tetanus, Diphtheria and Pertussis (Tdap)",
    category: "Health & Immunization",
    due: "Due on 05/01/2026",
    status: "start",
    statusLabel: "Get Started",
  },
  {
    title: "Hepatitis B (HepB)",
    category: "Health & Immunization",
    due: "Due on 05/01/2026",
    status: "start",
    statusLabel: "Get Started",
  },
];

function ProfileCard() {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 bg-gradient-to-r from-[#fce7f3] via-[#f3e8ff] to-[#dbeafe] px-4 py-3">
        <p className="min-w-0 flex-1 text-[13px] leading-[1.35] text-[rgba(0,0,0,0.87)]">
          Finish your profile, a few details left
        </p>
        <button
          type="button"
          className="h-8 shrink-0 rounded bg-[#3f51b5] px-3 text-sm font-semibold text-white"
        >
          Complete
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={asset("teri.jpg")}
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-base font-semibold text-[rgba(0,0,0,0.87)]">Bailey, Teri</p>
            <p className="truncate text-[13px] text-[rgba(0,0,0,0.54)]">bailey.teri@umes.edu</p>
          </div>
        </div>
        <button type="button" aria-label="Edit profile" className="rounded-lg p-1.5 hover:bg-black/5">
          <Icon name="pencil.svg" size={18} />
        </button>
      </div>
    </section>
  );
}

function ExxatOneCard() {
  return (
    <section
      className="w-full max-w-[332px] rounded-2xl border border-black/10 px-6 py-4"
      style={{
        backgroundImage:
          "linear-gradient(100deg, #f6f3ff 0%, #fde8f4 55%, #efe4fb 100%)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[18px] font-bold text-[rgba(0,0,0,0.87)]">
          Exxat <span className="text-[#e31c79]">One</span>
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#3f51b5]"
        >
          Open Now
          <span aria-hidden className="text-base leading-none">
            ↗
          </span>
        </button>
      </div>
      <p className="mt-2 text-sm font-semibold text-[rgba(0,0,0,0.87)]">
        Track your schedules and onboarding
      </p>
    </section>
  );
}

function AssistanceCard() {
  const items = [
    { title: "Get Support", body: "Raise a support ticket with us" },
    { title: "Chat with Agents", body: "Chat with one of our agents" },
    { title: "Ask Leo", body: "Get help from our AI Assistant" },
  ];
  return (
    <section className="rounded-2xl bg-white px-6 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <p className="text-base font-semibold text-[rgba(0,0,0,0.87)]">Need more assistance?</p>
      <p className="mt-0.5 text-xs text-[rgba(0,0,0,0.7)]">Here are some ways we can help!</p>
      <div className="mt-4 grid grid-cols-1 gap-0 sm:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`px-2 py-2 ${index < items.length - 1 ? "sm:border-r sm:border-black/10" : ""}`}
          >
            <p className="text-sm font-semibold text-[#3f51b5]">{item.title}</p>
            <p className="mt-1 text-xs text-[rgba(0,0,0,0.7)]">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppPromoCard() {
  return (
    <section
      className="relative h-[308px] w-full max-w-[332px] overflow-hidden rounded-2xl border border-black/10"
      style={{
        backgroundImage: "linear-gradient(180deg, #fde4ec 0%, #f6b7c9 100%)",
      }}
    >
      <p className="absolute left-[63px] top-[22px] w-[241px] text-[20px] font-semibold leading-[27px] text-[rgba(0,0,0,0.87)]">
        Make the most of your
        <br />
        on-site learning experience
      </p>
      <img
        src={asset("logo-88.png")}
        alt=""
        width={56}
        height={56}
        className="absolute left-[35px] top-[174px] size-14 rounded-lg object-cover"
      />
      <img
        src={asset("phone.png")}
        alt=""
        className="pointer-events-none absolute left-1/2 top-[151px] h-[447px] w-[206px] -translate-x-1/2 rounded-2xl object-cover"
      />
    </section>
  );
}

function MyComplianceCard() {
  return (
    <section className="w-full rounded-2xl border border-black/[0.12] bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="verified-user.svg" size={32} />
          <h2 className="text-lg font-semibold text-[rgba(0,0,0,0.87)]">My Compliance (20)</h2>
        </div>
        <button
          type="button"
          className="h-6 rounded border border-[#3f51b5] px-2 text-sm font-semibold text-[#3f51b5]"
        >
          View All
        </button>
      </div>

      <h3 className="mt-3 text-base font-semibold text-black">Overview</h3>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-black/[0.12] p-4">
        <div>
          <p className="text-xl font-semibold text-[rgba(0,0,0,0.87)]">15</p>
          <p className="text-sm text-[rgba(0,0,0,0.87)]">Total Mandatory requirements</p>
        </div>
        <span className="hidden h-10 w-px bg-black/10 sm:block" />
        <div className="min-w-[105px]">
          <div className="flex items-center gap-1">
            <p className="text-xl font-semibold text-[rgba(0,0,0,0.87)]">02</p>
            <Icon name="circle-check.svg" size={24} />
          </div>
          <p className="text-sm text-[rgba(0,0,0,0.87)]">Approved</p>
        </div>
        <span className="hidden h-10 w-px bg-black/10 sm:block" />
        <div className="min-w-[110px]">
          <div className="flex items-center gap-1">
            <p className="text-xl font-semibold text-[rgba(0,0,0,0.87)]">07</p>
            <Icon name="clock-nine.svg" size={24} />
          </div>
          <p className="text-sm text-[rgba(0,0,0,0.87)]">Pending Review</p>
        </div>
        <span className="hidden h-10 w-px bg-black/10 sm:block" />
        <div className="min-w-[102px]">
          <div className="flex items-center gap-1">
            <p className="text-xl font-semibold text-[rgba(0,0,0,0.87)]">06</p>
            <Icon name="diamond-exclamation.svg" size={24} />
          </div>
          <p className="text-sm text-[rgba(0,0,0,0.87)]">Need attention</p>
        </div>
      </div>

      <h3 className="mt-4 text-base font-semibold text-black">Requirements that Need Attention</h3>
      <div className="mt-4 overflow-hidden rounded-t-lg border border-b-0 border-black/[0.12]">
        {REQUIREMENTS.map((row) => (
          <div
            key={row.title}
            className="flex items-center gap-1 border-b border-black/[0.12] px-4 py-3 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-[23px] text-[rgba(0,0,0,0.87)]">{row.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="w-[126px] text-xs text-black">{row.category}</p>
                <span className="inline-flex items-center gap-1 text-xs text-black">
                  <Icon name="calendar.svg" size={16} />
                  {row.due}
                </span>
                {row.alert ? (
                  <span className="inline-flex items-center gap-1 text-xs text-[#981c1d]">
                    <Icon name="triangle-exclamation.svg" size={16} />
                    {row.alert}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className={`rounded-sm px-2 py-[3px] text-sm ${STATUS[row.status]}`}>
                {row.statusLabel}
              </span>
              <button type="button" aria-label={`Edit ${row.title}`}>
                <Icon name="pencil.svg" size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-end gap-4 rounded-b-xl border border-black/[0.12] bg-white px-2 py-1">
        <p className="text-sm text-[rgba(0,0,0,0.87)]">Items per page: 5</p>
        <span className="h-6 w-px bg-black/10" />
        <p className="text-sm text-[rgba(0,0,0,0.87)]">1 - 5 of 15</p>
        <div className="flex items-center gap-2">
          <Icon name="page-first.svg" size={24} />
          <Icon name="page-prev.svg" size={24} />
          <span className="inline-flex h-6 w-8 items-center justify-center rounded bg-[#3f51b5] text-sm font-semibold text-white">
            1
          </span>
          <span className="inline-flex h-6 w-8 items-center justify-center text-sm text-[rgba(0,0,0,0.87)]">
            2
          </span>
          <span className="inline-flex h-6 w-8 items-center justify-center text-sm text-[rgba(0,0,0,0.87)]">
            …
          </span>
          <Icon name="page-next.svg" size={24} />
          <Icon name="page-last.svg" size={24} />
        </div>
      </div>
    </section>
  );
}

export default function StudentComplianceDashboardScreen() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-[#f8f8f8]">
      <div className="mx-auto min-h-0 w-full min-w-0 max-w-[1600px]">
        <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 pb-12 pt-4 sm:px-6 xl:px-8">
          <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,332px)_minmax(0,1fr)_minmax(0,332px)] xl:gap-6 2xl:gap-8">
            <aside className="order-2 min-w-0 w-full max-w-md xl:order-1 xl:max-w-none">
              <ProfileCard />
            </aside>
            <div className="order-1 flex min-w-0 w-full flex-col gap-6 xl:order-2">
              <MyComplianceCard />
              <AssistanceCard />
            </div>
            <aside className="order-3 flex min-w-0 w-full max-w-md flex-col gap-6 xl:max-w-none">
              <ExxatOneCard />
              <AppPromoCard />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
