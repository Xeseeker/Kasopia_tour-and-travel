export default function AddCertificate() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Add Certificate</h1>
      <p className="text-gray-400 mb-8">Upload and manage certificates</p>

      {/* Card */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 space-y-6">
        {/* Description */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Certificate Description
          </label>
          <input
            type="text"
            placeholder="Enter certificate description"
            className="w-full bg-[#0B0F14] border border-[#1F2937] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Upload */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">
            Upload Certificate
          </label>

          <div className="border-2 border-dashed border-[#1F2937] rounded-xl p-8 text-center hover:border-blue-600 transition">
            <p className="text-gray-400">
              Drag & drop certificate here or
              <span className="text-blue-500 cursor-pointer"> browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              PDF, JPG, PNG (max 10MB)
            </p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold">
          Upload Certificate
        </button>
      </div>
    </div>
  );
}
