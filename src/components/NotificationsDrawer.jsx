import React from "react";
import { useData } from "../context/DataContext";
import { X, Bell, Check, Clock, Droplet, Building2, AlertTriangle } from "lucide-react";

export default function NotificationsDrawer({ isOpen, onClose }) {
  const { notifications, markNotificationRead, clearAllNotifications } = useData();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case "REQUEST":
        return <Droplet className="w-4 h-4 text-rose-500" />;
      case "EMERGENCY":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Building2 className="w-4 h-4 text-brand-600" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100 animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
            {notifications.some(n => !n.isRead) && (
              <span className="text-[10px] bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearAllNotifications}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium px-2 py-1"
              title="Mark all as read"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 stroke-[1.5] text-slate-300" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  notif.isRead
                    ? "bg-white border-slate-100 opacity-75"
                    : "bg-brand-50/40 border-brand-100/80 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-100 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
