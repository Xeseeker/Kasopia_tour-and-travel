import { Upload } from "lucide-react";
import { useState } from "react";

export default function AddPhoto() {
  const [title, setTitle] = useState("");

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">Add Photo</h1>

      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8">
        {/* Title */}
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>

        <input
          type="text"
          placeholder="Enter a descriptive title for your photo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-8 bg-[#0B0F14] border border-[#1F2937] text-gray-200 placeholder-gray-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Upload */}
        <p className="text-sm font-medium text-gray-300 mb-3">Upload Photo</p>

        <label className="flex flex-col items-center justify-center w-full h-[320px] border-2 border-dashed border-[#1F2937] rounded-2xl cursor-pointer hover:border-blue-500 transition bg-[#0B0F14]/40">
          <input type="file" hidden />

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#1E293B] flex items-center justify-center mb-4">
              <Upload className="text-gray-300" size={26} />
            </div>

            <p className="text-gray-200 text-lg font-medium">
              Click to upload or drag & drop
            </p>

            <p className="text-gray-500 text-sm mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-6 mt-8">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-medium">
            <Upload size={18} />
            Upload Photo
          </button>

          <button className="text-gray-400 hover:text-gray-200 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
