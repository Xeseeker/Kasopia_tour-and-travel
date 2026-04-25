import { NavLink } from "react-router-dom";
import { ImagePlus, Award, PenTool, LayoutList, ImageIcon, Settings } from "lucide-react";

const SideBar = () => {
  const links = [
    { to: "/admin/add-photo", label: "Add Photo", icon: ImagePlus },
    { to: "/admin/add-certificate", label: "Add Certificate", icon: Award },
    { to: "/admin/add-Blog", label: "Add Blog", icon: PenTool },
    { to: "/admin/Blogs", label: "View Blogs", icon: LayoutList },
    { to: "/admin/Gallery", label: "View Gallery", icon: ImageIcon },
    { to: "/admin/change-password", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen fixed inset-y-0 left-0 bg-slate-900 text-slate-300 flex flex-col z-40 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h2 className="text-xl font-bold font-display text-white tracking-wide">Kasopia Admin</h2>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="px-3 py-2 rounded-lg bg-slate-800/50 flex flex-col items-center text-xs text-slate-400">
          <p>Logged in securely</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
