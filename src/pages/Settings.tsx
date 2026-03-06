import { ShieldCheck, User, Bell, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 text-sm">Manage your account preferences and controls.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
            <User className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-900">Profile Settings</p>
              <p className="text-sm text-gray-600">Name, email and personal details for {user?.name ?? 'your account'}.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
            <Bell className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-semibold text-gray-900">Notification Settings</p>
              <p className="text-sm text-gray-600">Control booking alerts, offers and reminders.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-3">
            <Globe className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-gray-900">Regional Preferences</p>
              <p className="text-sm text-gray-600">Currency, language and location defaults.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
