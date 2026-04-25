export default function AddCertificate() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add Certificate</h1>
        <p className="mt-1 text-sm text-slate-500">Upload and manage official company certificates.</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 sm:p-8">
        <div className="space-y-6">
          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Certificate Description
            </label>
            <input
              type="text"
              placeholder="Enter certificate description"
              className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>

          {/* Upload Container */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Upload Document
            </label>
            <label className="block border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-xl p-10 text-center cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-colors group">
              <input type="file" hidden />
              <p className="text-slate-600 text-lg font-medium group-hover:text-blue-600 transition-colors">
                Drag & drop certificate here or
                <span className="text-blue-600"> browse</span>
              </p>
              <p className="text-slate-500 text-sm mt-2">
                PDF, JPG, PNG (max 10MB)
              </p>
            </label>
          </div>

          {/* Button */}
          <div className="pt-4 border-t border-slate-100">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-lg px-8 py-2.5 font-semibold shadow-sm">
              Upload Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
