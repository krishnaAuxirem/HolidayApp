import { useMemo, useState } from 'react';
import {
  PlaneTakeoff,
  LayoutDashboard,
  Calendar,
  Heart,
  History,
  Star,
  User,
  Bell,
  LogOut,
  Wallet,
  Download,
  Trash2,
  Camera,
  MapPinned,
  Settings,
  BookOpen,
  Clock3,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/hooks/useBooking';
import { useWishlist } from '@/hooks/useWishlist';
import { packages } from '@/data/packages';
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

type TravelerSection =
  | 'dashboard'
  | 'bookings'
  | 'wishlist'
  | 'tripHistory'
  | 'reviews'
  | 'profile'
  | 'notifications'
  | 'payments';

type PaymentStatus = 'paid' | 'refunded' | 'pending';

interface UserReview {
  id: string;
  type: 'package' | 'hotel';
  itemName: string;
  rating: number;
  comment: string;
}

interface UserNotification {
  id: string;
  title: string;
  category: 'booking' | 'payment' | 'offer' | 'reminder';
  read: boolean;
}

interface UserPayment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  refundStatus: string;
}

interface TravelerProfile {
  name: string;
  email: string;
  phone: string;
  profilePhoto: string;
  travelPreferences: string;
}

const defaultReviews: UserReview[] = [
  { id: 'r1', type: 'package', itemName: 'Goa Trip', rating: 4.5, comment: 'Great experience!' },
  { id: 'r2', type: 'hotel', itemName: 'Sea View Resort', rating: 4, comment: 'Nice stay and food.' },
];

const defaultNotifications: UserNotification[] = [
  { id: 'n1', title: 'Booking confirmation received for Goa Trip', category: 'booking', read: false },
  { id: 'n2', title: 'Payment confirmed for booking #b1', category: 'payment', read: false },
  { id: 'n3', title: 'Special offer: SUMMER20 is live now', category: 'offer', read: true },
  { id: 'n4', title: 'Trip reminder: Bali Luxury Escape in 7 days', category: 'reminder', read: true },
];

const defaultPayments: UserPayment[] = [
  { id: 'pay1', bookingId: 'b1', amount: 15000, status: 'paid', refundStatus: 'Not requested' },
  { id: 'pay2', bookingId: 'b2', amount: 22000, status: 'pending', refundStatus: 'Not requested' },
  { id: 'pay3', bookingId: 'b3', amount: 12000, status: 'refunded', refundStatus: 'Refund completed' },
];

function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  const wrappedSetValue: React.Dispatch<React.SetStateAction<T>> = (nextValue) => {
    setValue((currentValue) => {
      const resolvedValue =
        typeof nextValue === 'function' ? (nextValue as (prev: T) => T)(currentValue) : nextValue;
      localStorage.setItem(key, JSON.stringify(resolvedValue));
      return resolvedValue;
    });
  };

  return [value, wrappedSetValue] as const;
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const TravelerDashboard = () => {
  const { user, logout } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const { wishlist, removeFromWishlist } = useWishlist();
  const [activeSection, setActiveSection] = useState<TravelerSection>('dashboard');

  const profileStorageKey = `holidayapp_profile_${user?.id ?? 'traveler'}`;
  const reviewsStorageKey = `holidayapp_reviews_${user?.id ?? 'traveler'}`;
  const notificationsStorageKey = `holidayapp_notifications_${user?.id ?? 'traveler'}`;
  const paymentsStorageKey = `holidayapp_payments_${user?.id ?? 'traveler'}`;
  const recentViewedStorageKey = `holidayapp_recent_viewed_${user?.id ?? 'traveler'}`;

  const [profile, setProfile] = useLocalStorageState<TravelerProfile>(profileStorageKey, {
    name: user?.name ?? 'Krishna',
    email: user?.email ?? 'krishna@email.com',
    phone: '+91 XXXXXXX',
    profilePhoto: '',
    travelPreferences: 'Beach, Mountains, Family friendly',
  });
  const [reviews, setReviews] = useLocalStorageState<UserReview[]>(reviewsStorageKey, defaultReviews);
  const [notifications, setNotifications] = useLocalStorageState<UserNotification[]>(
    notificationsStorageKey,
    defaultNotifications
  );
  const [payments, setPayments] = useLocalStorageState<UserPayment[]>(paymentsStorageKey, defaultPayments);
  const [recentViewedPackages] = useLocalStorageState<string[]>(recentViewedStorageKey, [
    'Santorini Sunset Romance',
    'Bali Adventure Escape',
    'Manali Tour',
  ]);

  const [newReviewType, setNewReviewType] = useState<UserReview['type']>('package');
  const [newReviewItem, setNewReviewItem] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const upcomingTrips = bookings.filter((item) => item.status === 'confirmed').length;

  const wishlistPackages = useMemo(
    () => packages.filter((item) => wishlist.includes(item.id)),
    [wishlist]
  );

  const completedTrips = bookings.filter((item) => new Date(item.travelDate) < new Date());

  const markAllNotificationsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <SidebarProvider className="pt-20 bg-background">
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader>
          <div className="px-2">
            <p className="text-xs font-medium text-sidebar-foreground/60">Traveler Panel</p>
            <p className="text-sm font-semibold truncate">{profile.name}</p>
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
              <SidebarMenuButton isActive={activeSection === 'bookings'} onClick={() => setActiveSection('bookings')}>
                <Calendar />
                <span>My Bookings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'wishlist'} onClick={() => setActiveSection('wishlist')}>
                <Heart />
                <span>Wishlist</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeSection === 'tripHistory'}
                onClick={() => setActiveSection('tripHistory')}
              >
                <History />
                <span>Trip History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'reviews'} onClick={() => setActiveSection('reviews')}>
                <Star />
                <span>Reviews</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'profile'} onClick={() => setActiveSection('profile')}>
                <User />
                <span>Profile</span>
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
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeSection === 'payments'} onClick={() => setActiveSection('payments')}>
                <Wallet />
                <span>Payments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm" onClick={logout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm">
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
              <PlaneTakeoff className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-gray-600 text-sm">All sections are simulated with LocalStorage + React Context.</p>
              </div>
            </div>
          </section>

          <section className="py-6 flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {activeSection === 'dashboard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <PlaneTakeoff className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Upcoming Trips</p>
                      <p className="text-2xl font-bold text-gray-900">{upcomingTrips}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <Heart className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="text-sm text-gray-500">Saved Packages</p>
                      <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
                    <Clock3 className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Recently Viewed</p>
                      <p className="text-2xl font-bold text-gray-900">{recentViewedPackages.length}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'profile' && (
                <div className="bg-white rounded-xl shadow p-5 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Management</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <input
                        value={profile.name}
                        onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                        className="w-full mt-1 px-3 py-2 rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <input
                        value={profile.email}
                        onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
                        className="w-full mt-1 px-3 py-2 rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <input
                        value={profile.phone}
                        onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))}
                        className="w-full mt-1 px-3 py-2 rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Profile Photo URL</label>
                      <input
                        value={profile.profilePhoto}
                        onChange={(event) =>
                          setProfile((current) => ({ ...current, profilePhoto: event.target.value }))
                        }
                        className="w-full mt-1 px-3 py-2 rounded border border-gray-300"
                        placeholder="Paste image URL"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Travel Preferences</label>
                    <textarea
                      value={profile.travelPreferences}
                      onChange={(event) =>
                        setProfile((current) => ({ ...current, travelPreferences: event.target.value }))
                      }
                      className="w-full mt-1 px-3 py-2 rounded border border-gray-300 min-h-24"
                    />
                  </div>
                  {profile.profilePhoto && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Camera className="h-4 w-4" />
                      <span>Profile photo uploaded</span>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'bookings' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Management</h2>
                  <table className="w-full text-sm min-w-[760px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">Package</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.packageTitle}</td>
                          <td className="py-2">{new Date(item.travelDate).toLocaleDateString()}</td>
                          <td className="py-2">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => cancelBooking(item.id)}
                                className="px-2 py-1 rounded bg-red-50 text-red-700"
                              >
                                Cancel
                              </button>
                              <button className="px-2 py-1 rounded bg-gray-100 text-gray-700">Track Status</button>
                              <button className="px-2 py-1 rounded bg-green-50 text-green-700 inline-flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                Invoice
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {bookings.length === 0 && <p className="text-gray-500 text-sm">No bookings available.</p>}
                </div>
              )}

              {activeSection === 'wishlist' && (
                <div className="bg-white rounded-xl shadow p-5 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Wishlist</h2>
                  {wishlistPackages.length === 0 ? (
                    <p className="text-sm text-gray-500">No saved packages.</p>
                  ) : (
                    <div className="space-y-2">
                      {wishlistPackages.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-wrap items-center justify-between gap-3 p-3 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.destination}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Book Now</button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="px-3 py-1.5 rounded bg-red-50 text-red-700 text-sm inline-flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'reviews' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews & Ratings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <select
                        value={newReviewType}
                        onChange={(event) => setNewReviewType(event.target.value as UserReview['type'])}
                        className="px-3 py-2 rounded border border-gray-300"
                      >
                        <option value="package">Package</option>
                        <option value="hotel">Hotel</option>
                      </select>
                      <input
                        value={newReviewItem}
                        onChange={(event) => setNewReviewItem(event.target.value)}
                        className="px-3 py-2 rounded border border-gray-300"
                        placeholder="Item name"
                      />
                      <input
                        type="number"
                        min={1}
                        max={5}
                        step={0.5}
                        value={newReviewRating}
                        onChange={(event) => setNewReviewRating(Number(event.target.value))}
                        className="px-3 py-2 rounded border border-gray-300"
                      />
                      <button
                        onClick={() => {
                          if (!newReviewItem.trim() || !newReviewComment.trim()) return;
                          setReviews((current) => [
                            ...current,
                            {
                              id: `rev-${Date.now()}`,
                              type: newReviewType,
                              itemName: newReviewItem.trim(),
                              rating: newReviewRating,
                              comment: newReviewComment.trim(),
                            },
                          ]);
                          setNewReviewItem('');
                          setNewReviewRating(5);
                          setNewReviewComment('');
                        }}
                        className="px-3 py-2 rounded bg-blue-600 text-white"
                      >
                        Add Review
                      </button>
                    </div>
                    <textarea
                      value={newReviewComment}
                      onChange={(event) => setNewReviewComment(event.target.value)}
                      className="w-full mt-3 px-3 py-2 rounded border border-gray-300 min-h-20"
                      placeholder="Write review"
                    />
                  </div>

                  <div className="bg-white rounded-xl shadow p-5 space-y-3">
                    {reviews.map((item) => (
                      <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <p className="font-medium text-gray-900">
                            {item.itemName} • <span className="capitalize">{item.type}</span>
                          </p>
                          <p className="text-sm text-amber-600 font-semibold">⭐ {item.rating} / 5</p>
                        </div>
                        <p className="text-sm text-gray-600">{item.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'tripHistory' && (
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip History</h2>
                  {completedTrips.length === 0 ? (
                    <p className="text-sm text-gray-500">No completed trips yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {completedTrips.map((item) => (
                        <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                          <p className="font-medium text-gray-900">{item.packageTitle}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(item.travelDate).toLocaleDateString()} • {item.destination}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="bg-white rounded-xl shadow p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                    <button onClick={markAllNotificationsRead} className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-sm">
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-lg border ${
                          item.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'payments' && (
                <div className="bg-white rounded-xl shadow p-5 overflow-auto">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payments / Invoices</h2>
                  <table className="w-full text-sm min-w-[820px]">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2">Booking</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Payment Status</th>
                        <th className="py-2">Refund Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.bookingId}</td>
                          <td className="py-2">{inr.format(item.amount)}</td>
                          <td className="py-2 capitalize">{item.status}</td>
                          <td className="py-2">{item.refundStatus}</td>
                          <td className="py-2">
                            <button className="px-2 py-1 rounded bg-green-50 text-green-700 inline-flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              Download Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow p-4 flex items-center gap-2 text-sm text-gray-700">
                  <MapPinned className="h-4 w-4 text-blue-600" />
                  Guest: Browse website
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex items-center gap-2 text-sm text-gray-700">
                  <PlaneTakeoff className="h-4 w-4 text-green-600" />
                  Traveler: Book trips
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex items-center gap-2 text-sm text-gray-700">
                  <BookOpen className="h-4 w-4 text-amber-600" />
                  Vendor: Add packages
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex items-center gap-2 text-sm text-gray-700">
                  <User className="h-4 w-4 text-purple-600" />
                  Admin: Control platform
                </div>
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TravelerDashboard;
