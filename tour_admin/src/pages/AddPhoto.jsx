import { Upload } from "lucide-react";
import { useState } from "react";

export default function AddPhoto() {
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add Photo</h1>
        <p className="mt-1 text-sm text-slate-500">Upload a new photograph to the global gallery.</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 sm:p-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Photo Title
            </label>
            <input
              type="text"
              placeholder="Enter a descriptive title for your photo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Upload Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-[280px] border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-colors bg-slate-50/50 group">
              <input type="file" hidden />
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <p className="text-slate-700 text-lg font-medium group-hover:text-blue-600 transition-colors">
                  Click to upload or drag & drop
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm">
              <Upload size={18} />
              Save Photo
            </button>
            <button className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2.5 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
