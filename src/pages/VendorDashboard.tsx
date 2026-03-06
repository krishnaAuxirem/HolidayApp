import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  Package,
  CalendarCheck,
  Wallet,
  TicketPercent,
  FileText,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  Briefcase,
  CircleDollarSign,
  BadgePercent,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarInset,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';

type AdminSection =
  | 'dashboard'
  | 'users'
  | 'vendors'
  | 'packages'
  | 'bookings'
  | 'payments'
  | 'coupons'
  | 'blogs'
  | 'analytics'
  | 'notifications'
  | 'settings';

type UserStatus = 'active' | 'blocked';
type VendorStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
type PackageStatus = 'pending' | 'approved' | 'featured';
type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'dispute';
type PaymentStatus = 'paid' | 'refunded';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'traveler' | 'vendor' | 'admin';
  status: UserStatus;
  bookings: number;
}

interface VendorAccount {
  id: string;
  name: string;
  packages: number;
  status: VendorStatus;
  revenue: number;
}

interface PackageModeration {
  id: string;
  title: string;
  vendor: string;
  status: PackageStatus;
}

interface AdminBooking {
  id: string;
  user: string;
  packageName: string;
  status: BookingStatus;
  amount: number;
}

interface PaymentTransaction {
  id: string;
  bookingId: string;
  amount: number;
  commission: number;
  vendorPayment: number;
  status: PaymentStatus;
}

interface CouponDeal {
  id: string;
  code: string;
  discount: number;
  type: 'festival' | 'limited' | 'referral';
  active: boolean;
}

interface BlogItem {
  id: string;
  title: string;
  status: 'published' | 'draft';
}

interface AdminNotification {
  id: string;
  title: string;
  channel: 'email' | 'sms' | 'app';
  enabled: boolean;
}

const seedUsers: AdminUser[] = [
  { id: 'u1', name: 'Krishna', email: 'krishna@email.com', role: 'traveler', status: 'active', bookings: 5 },
  { id: 'u2', name: 'Rahul', email: 'rahul@email.com', role: 'traveler', status: 'active', bookings: 3 },
  { id: 'u3', name: 'Priya', email: 'priya@email.com', role: 'vendor', status: 'active', bookings: 0 },
  { id: 'u4', name: 'Test User', email: 'test@email.com', role: 'traveler', status: 'blocked', bookings: 1 },
];

const seedVendors: VendorAccount[] = [
  { id: 'v1', name: 'Goa Tours', packages: 12, status: 'approved', revenue: 14500 },
  { id: 'v2', name: 'Mountain Escape', packages: 8, status: 'pending', revenue: 8900 },
  { id: 'v3', name: 'Beach Bliss Travels', packages: 10, status: 'suspended', revenue: 6700 },
];

const seedPackageModeration: PackageModeration[] = [
  { id: 'p1', title: 'Goa Trip', vendor: 'Goa Tours', status: 'pending' },
  { id: 'p2', title: 'Manali Snow Tour', vendor: 'Mountain Escape', status: 'approved' },
  { id: 'p3', title: 'Bali Luxury Escape', vendor: 'Beach Bliss Travels', status: 'featured' },
];

const seedBookings: AdminBooking[] = [
  { id: 'b1', user: 'Rahul', packageName: 'Goa Trip', status: 'confirmed', amount: 450 },
  { id: 'b2', user: 'Krishna', packageName: 'Bali Luxury Escape', status: 'pending', amount: 980 },
  { id: 'b3', user: 'Test User', packageName: 'Manali Snow Tour', status: 'dispute', amount: 520 },
];

const seedPayments: PaymentTransaction[] = [
  { id: 't1', bookingId: 'b1', amount: 450, commission: 50, vendorPayment: 400, status: 'paid' },
  { id: 't2', bookingId: 'b2', amount: 980, commission: 120, vendorPayment: 860, status: 'paid' },
  { id: 't3', bookingId: 'b3', amount: 520, commission: 60, vendorPayment: 460, status: 'refunded' },
];

const seedCoupons: CouponDeal[] = [
  { id: 'c1', code: 'SUMMER20', discount: 20, type: 'festival', active: true },
  { id: 'c2', code: 'FLASH10', discount: 10, type: 'limited', active: true },
  { id: 'c3', code: 'REFER15', discount: 15, type: 'referral', active: false },
];

const seedBlogs: BlogItem[] = [
  { id: 'blog-1', title: 'Top 10 Beaches in India', status: 'published' },
  { id: 'blog-2', title: 'Budget Trip Guide for Europe', status: 'draft' },
  { id: 'blog-3', title: 'Monsoon Trekking Tips', status: 'published' },
];

const seedNotifications: AdminNotification[] = [
  { id: 'n1', title: 'Festival sale email', channel: 'email', enabled: true },
  { id: 'n2', title: 'Booking status SMS', channel: 'sms', enabled: true },
  { id: 'n3', title: 'Limited offer announcement', channel: 'app', enabled: false },
];

function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const VendorDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [users, setUsers] = useLocalStorageState('holidayapp_admin_users', seedUsers as AdminUser[]);
  const [vendors, setVendors] = useLocalStorageState('holidayapp_admin_vendors', seedVendors as VendorAccount[]);
  const [moderationPackages, setModerationPackages] = useLocalStorageState<PackageModeration[]>(
    'holidayapp_admin_packages',
    seedPackageModeration
  );
  const [allBookings, setAllBookings] = useLocalStorageState<AdminBooking[]>('holidayapp_admin_bookings', seedBookings);
  const [payments, setPayments] = useLocalStorageState<PaymentTransaction[]>('holidayapp_admin_payments', seedPayments);
  const [coupons, setCoupons] = useLocalStorageState<CouponDeal[]>('holidayapp_admin_coupons', seedCoupons);
  const [blogs, setBlogs] = useLocalStorageState<BlogItem[]>('holidayapp_admin_blogs', seedBlogs);
  const [notifications, setNotifications] = useLocalStorageState<AdminNotification[]>(
    'holidayapp_admin_notifications',
    seedNotifications
  );

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [selectedUserHistory, setSelectedUserHistory] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(10);
  const [couponType, setCouponType] = useState<CouponDeal['type']>('festival');

  const [blogTitle, setBlogTitle] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementChannel, setAnnouncementChannel] = useState<AdminNotification['channel']>('email');

  const stats = useMemo(() => {
    const totalRevenue = payments.reduce((sum, item) => sum + item.amount, 0);
    return {
      totalUsers: users.length,
      totalVendors: vendors.length,
      totalPackages: moderationPackages.length,
      totalBookings: allBookings.length,
      totalRevenue,
      activeDeals: coupons.filter((item) => item.active).length,
    };
  }, [users, vendors, moderationPackages, allBookings, payments, coupons]);

  const monthlyAnalytics = [
    { month: 'Jan', bookings: 110, revenue: 16000 },
    { month: 'Feb', bookings: 140, revenue: 22000 },
    { month: 'Mar', bookings: 170, revenue: 28000 },
    { month: 'Apr', bookings: 150, revenue: 25000 },
  ];

  const renderStatusPill = (label: string) => (
    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{label}</span>
  );

  const handleEditUser = (id: string) => {
    const target = users.find((item) => item.id === id);
    if (!target) return;
    setEditUserId(id);
    setEditUserName(target.name);
    setEditUserEmail(target.email);
  };

  const saveUserEdit = () => {
    if (!editUserId) return;
    setUsers((current) =>
      current.map((item) =>
        item.id === editUserId ? { ...item, name: editUserName.trim(), email: editUserEmail.trim() } : item
      )
    );
    setEditUserId(null);
  };

  const resetSimulationData = () => {
    setUsers(seedUsers);
    setVendors(seedVendors);
    setModerationPackages(seedPackageModeration);
    setAllBookings(seedBookings);
    setPayments(seedPayments);
    setCoupons(seedCoupons);
    setBlogs(seedBlogs);
    setNotifications(seedNotifications);
  };

  return (
    <SidebarProvider className="pt-20 bg-background">
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader>
          <div className="px-2">
            <p className="text-xs font-medium text-sidebar-foreground/60">Admin Panel</p>
            <p className="text-sm font-semibold truncate">{user?.name ?? 'Admin User'}</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'users'} onClick={() => setActiveSection('users')}>
                <Users />
                <span>Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'vendors'} onClick={() => setActiveSection('vendors')}>
                <Building2 />
                <span>Vendors</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'packages'} onClick={() => setActiveSection('packages')}>
                <Package />
                <span>Packages</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'bookings'} onClick={() => setActiveSection('bookings')}>
                <CalendarCheck />
                <span>Bookings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'payments'} onClick={() => setActiveSection('payments')}>
                <Wallet />
                <span>Payments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'coupons'} onClick={() => setActiveSection('coupons')}>
                <TicketPercent />
                <span>Coupons</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'blogs'} onClick={() => setActiveSection('blogs')}>
                <FileText />
                <span>Blogs</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')}>
                <BarChart3 />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === 'notifications'}
                onClick={() => setActiveSection('notifications')}
              >
                <Bell />
                <span>Notifications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'settings'} onClick={() => setActiveSection('settings')}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-background">
        <div className="min-h-[calc(100vh-5rem)] flex flex-col">
          <section className="py-6 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 text-sm">All working sections are simulated with LocalStorage + dummy data.</p>
              </div>
            </div>
          </section>

          <section className="py-6 flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {activeSection === 'dashboard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Vendors</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalVendors}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <Package className="h-6 w-6 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Packages</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalPackages}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <CalendarCheck className="h-6 w-6 text-cyan-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <CircleDollarSign className="h-6 w-6 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{usd.format(stats.totalRevenue)}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <BadgePercent className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="text-sm text-gray-500">Active Deals</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeDeals}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'users' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
                  <table className="w-full text-sm min-w-[760px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Role</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.email}</td>
                          <td className="py-2 capitalize">{item.role}</td>
                          <td className="py-2">{renderStatusPill(item.status)}</td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => handleEditUser(item.id)}
                                className="px-2 py-1 rounded bg-blue-50 text-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  setUsers((current) =>
                                    current.map((userRow) =>
                                      userRow.id === item.id
                                        ? {
                                            ...userRow,
                                            status: userRow.status === 'active' ? 'blocked' : 'active',
                                          }
                                        : userRow
                                    )
                                  )
                                }
                                className="px-2 py-1 rounded bg-yellow-50 text-yellow-700"
                              >
                                {item.status === 'active' ? 'Block' : 'Unblock'}
                              </button>
                              <button
                                onClick={() => setUsers((current) => current.filter((userRow) => userRow.id !== item.id))}
                                className="px-2 py-1 rounded bg-red-50 text-red-700"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setSelectedUserHistory(item.name)}
                                className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                              >
                                Booking History
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {editUserId && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                      <p className="font-medium text-gray-900">Edit User Profile</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          value={editUserName}
                          onChange={(event) => setEditUserName(event.target.value)}
                          className="px-3 py-2 rounded border border-gray-300"
                          placeholder="Name"
                        />
                        <input
                          value={editUserEmail}
                          onChange={(event) => setEditUserEmail(event.target.value)}
                          className="px-3 py-2 rounded border border-gray-300"
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveUserEdit} className="px-3 py-2 rounded bg-blue-600 text-white">
                          Save
                        </button>
                        <button
                          onClick={() => setEditUserId(null)}
                          className="px-3 py-2 rounded bg-gray-200 text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedUserHistory && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium text-gray-900">{selectedUserHistory} - Booking History</p>
                        <button
                          onClick={() => setSelectedUserHistory(null)}
                          className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
                        >
                          Close
                        </button>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {allBookings
                          .filter((item) => item.user === selectedUserHistory)
                          .map((item) => (
                            <li key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                              <span>{item.packageName}</span>
                              {renderStatusPill(item.status)}
                            </li>
                          ))}
                        {allBookings.filter((item) => item.user === selectedUserHistory).length === 0 && (
                          <li className="text-gray-500">No bookings found for this user.</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'vendors' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendor Management</h2>
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">Vendor</th>
                        <th className="py-2">Packages</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Revenue</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.packages}</td>
                          <td className="py-2">{renderStatusPill(item.status)}</td>
                          <td className="py-2">{usd.format(item.revenue)}</td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  setVendors((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'approved' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-green-50 text-green-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  setVendors((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'rejected' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-red-50 text-red-700"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  setVendors((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'suspended' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-yellow-50 text-yellow-700"
                              >
                                Suspend
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeSection === 'packages' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Moderation</h2>
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">Package</th>
                        <th className="py-2">Vendor</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moderationPackages.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.title}</td>
                          <td className="py-2">{item.vendor}</td>
                          <td className="py-2">{renderStatusPill(item.status)}</td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  setModerationPackages((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'approved' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-green-50 text-green-700"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  setModerationPackages((current) =>
                                    current.map((row) =>
                                      row.id === item.id
                                        ? {
                                            ...row,
                                            title: `${row.title} (Edited)`,
                                          }
                                        : row
                                    )
                                  )
                                }
                                className="px-2 py-1 rounded bg-blue-50 text-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  setModerationPackages((current) => current.filter((row) => row.id !== item.id))
                                }
                                className="px-2 py-1 rounded bg-red-50 text-red-700"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  setModerationPackages((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'featured' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-purple-50 text-purple-700"
                              >
                                Feature
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeSection === 'bookings' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Management</h2>
                  <table className="w-full text-sm min-w-[760px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">User</th>
                        <th className="py-2">Package</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBookings.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.user}</td>
                          <td className="py-2">{item.packageName}</td>
                          <td className="py-2">{renderStatusPill(item.status)}</td>
                          <td className="py-2">{usd.format(item.amount)}</td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  setAllBookings((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'cancelled' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-red-50 text-red-700"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() =>
                                  setAllBookings((current) =>
                                    current.map((row) => (row.id === item.id ? { ...row, status: 'confirmed' } : row))
                                  )
                                }
                                className="px-2 py-1 rounded bg-green-50 text-green-700"
                              >
                                Resolve Dispute
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeSection === 'payments' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Management</h2>
                  <table className="w-full text-sm min-w-[900px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">Booking</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Commission</th>
                        <th className="py-2">Vendor Payment</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.bookingId}</td>
                          <td className="py-2">{usd.format(item.amount)}</td>
                          <td className="py-2">{usd.format(item.commission)}</td>
                          <td className="py-2">{usd.format(item.vendorPayment)}</td>
                          <td className="py-2">{renderStatusPill(item.status)}</td>
                          <td className="py-2">
                            <button
                              onClick={() =>
                                setPayments((current) =>
                                  current.map((row) => (row.id === item.id ? { ...row, status: 'refunded' } : row))
                                )
                              }
                              className="px-2 py-1 rounded bg-yellow-50 text-yellow-700"
                            >
                              Refund
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeSection === 'coupons' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Coupon / Deals Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        value={couponCode}
                        onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="Promo code"
                      />
                      <input
                        value={couponDiscount}
                        onChange={(event) => setCouponDiscount(Number(event.target.value))}
                        type="number"
                        min={1}
                        max={90}
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="Discount %"
                      />
                      <select
                        value={couponType}
                        onChange={(event) => setCouponType(event.target.value as CouponDeal['type'])}
                        className="px-3 py-2 rounded border border-gray-300"
                      >
                        <option value="festival">Festival</option>
                        <option value="limited">Limited</option>
                        <option value="referral">Referral</option>
                      </select>
                      <button
                        onClick={() => {
                          if (!couponCode.trim()) return;
                          setCoupons((current) => [
                            ...current,
                            {
                              id: `c-${Date.now()}`,
                              code: couponCode.trim(),
                              discount: couponDiscount,
                              type: couponType,
                              active: true,
                            },
                          ]);
                          setCouponCode('');
                          setCouponDiscount(10);
                          setCouponType('festival');
                        }}
                        className="px-3 py-2 rounded bg-blue-600 text-white"
                      >
                        Create Coupon
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                    <table className="w-full text-sm min-w-[680px]">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="py-2">Coupon</th>
                          <th className="py-2">Discount</th>
                          <th className="py-2">Type</th>
                          <th className="py-2">Status</th>
                          <th className="py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-2 font-medium">{item.code}</td>
                            <td className="py-2">{item.discount}%</td>
                            <td className="py-2 capitalize">{item.type}</td>
                            <td className="py-2">{renderStatusPill(item.active ? 'active' : 'inactive')}</td>
                            <td className="py-2">
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    setCoupons((current) =>
                                      current.map((row) =>
                                        row.id === item.id ? { ...row, active: !row.active } : row
                                      )
                                    )
                                  }
                                  className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                                >
                                  Toggle
                                </button>
                                <button
                                  onClick={() => setCoupons((current) => current.filter((row) => row.id !== item.id))}
                                  className="px-2 py-1 rounded bg-red-50 text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === 'blogs' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Management</h2>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        value={blogTitle}
                        onChange={(event) => setBlogTitle(event.target.value)}
                        className="flex-1 px-3 py-2 rounded border border-gray-300"
                        placeholder="Add blog post title"
                      />
                      <button
                        onClick={() => {
                          if (!blogTitle.trim()) return;
                          setBlogs((current) => [
                            ...current,
                            { id: `blog-${Date.now()}`, title: blogTitle.trim(), status: 'draft' },
                          ]);
                          setBlogTitle('');
                        }}
                        className="px-3 py-2 rounded bg-blue-600 text-white"
                      >
                        Add Blog
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                    <table className="w-full text-sm min-w-[680px]">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="py-2">Title</th>
                          <th className="py-2">Status</th>
                          <th className="py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-2">{item.title}</td>
                            <td className="py-2">{renderStatusPill(item.status)}</td>
                            <td className="py-2">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() =>
                                    setBlogs((current) =>
                                      current.map((row) =>
                                        row.id === item.id
                                          ? {
                                              ...row,
                                              title: `${row.title} (Edited)`,
                                            }
                                          : row
                                      )
                                    )
                                  }
                                  className="px-2 py-1 rounded bg-blue-50 text-blue-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    setBlogs((current) =>
                                      current.map((row) =>
                                        row.id === item.id
                                          ? {
                                              ...row,
                                              status: row.status === 'published' ? 'draft' : 'published',
                                            }
                                          : row
                                      )
                                    )
                                  }
                                  className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                                >
                                  Toggle Status
                                </button>
                                <button
                                  onClick={() => setBlogs((current) => current.filter((row) => row.id !== item.id))}
                                  className="px-2 py-1 rounded bg-red-50 text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSection === 'analytics' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow p-5">
                      <p className="text-sm text-gray-500">Booking Trends</p>
                      <p className="text-xl font-semibold text-gray-900 mt-1">Monthly bookings</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5">
                      <p className="text-sm text-gray-500">Revenue Graph</p>
                      <p className="text-xl font-semibold text-gray-900 mt-1">Growth analytics</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5">
                      <p className="text-sm text-gray-500">Vendor Performance</p>
                      <p className="text-xl font-semibold text-gray-900 mt-1">Top vendors overview</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Reports & Analytics</h2>
                    <div className="space-y-4">
                      {monthlyAnalytics.map((item) => {
                        const bookingWidth = `${Math.min(item.bookings / 2, 100)}%`;
                        const revenueWidth = `${Math.min(item.revenue / 300, 100)}%`;
                        return (
                          <div key={item.month} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-gray-800">{item.month}</span>
                              <span className="text-gray-600">
                                {item.bookings} bookings • {usd.format(item.revenue)}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-2 bg-blue-500" style={{ width: bookingWidth }} />
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-2 bg-green-500" style={{ width: revenueWidth }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification System</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        value={announcementTitle}
                        onChange={(event) => setAnnouncementTitle(event.target.value)}
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="Offer announcement title"
                      />
                      <select
                        value={announcementChannel}
                        onChange={(event) =>
                          setAnnouncementChannel(event.target.value as AdminNotification['channel'])
                        }
                        className="px-3 py-2 rounded border border-gray-300"
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="app">App</option>
                      </select>
                      <button
                        onClick={() => {
                          if (!announcementTitle.trim()) return;
                          setNotifications((current) => [
                            ...current,
                            {
                              id: `n-${Date.now()}`,
                              title: announcementTitle.trim(),
                              channel: announcementChannel,
                              enabled: true,
                            },
                          ]);
                          setAnnouncementTitle('');
                          setAnnouncementChannel('email');
                        }}
                        className="px-3 py-2 rounded bg-blue-600 text-white"
                      >
                        Send Notification
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                    <table className="w-full text-sm min-w-[700px]">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="py-2">Title</th>
                          <th className="py-2">Channel</th>
                          <th className="py-2">Status</th>
                          <th className="py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-2">{item.title}</td>
                            <td className="py-2 capitalize">{item.channel}</td>
                            <td className="py-2">{renderStatusPill(item.enabled ? 'enabled' : 'disabled')}</td>
                            <td className="py-2">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() =>
                                    setNotifications((current) =>
                                      current.map((row) =>
                                        row.id === item.id ? { ...row, enabled: !row.enabled } : row
                                      )
                                    )
                                  }
                                  className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                                >
                                  Toggle
                                </button>
                                <button
                                  onClick={() =>
                                    setNotifications((current) => current.filter((row) => row.id !== item.id))
                                  }
                                  className="px-2 py-1 rounded bg-red-50 text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <p className="text-sm text-gray-700">Email notifications enabled</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-gray-700">SMS alerts configured</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                      <Bell className="h-5 w-5 text-purple-600" />
                      <p className="text-sm text-gray-700">Offer announcements ready</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'settings' && (
                <div className="bg-white rounded-xl shadow p-5 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Admin Settings</h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Role: {user?.role ?? 'admin'}</p>
                    <p>Name: {user?.name ?? 'Admin User'}</p>
                    <p>Storage Mode: LocalStorage simulation (no backend)</p>
                  </div>
                  <button onClick={resetSimulationData} className="px-3 py-2 rounded bg-gray-900 text-white">
                    Reset Demo Data
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default VendorDashboard;
