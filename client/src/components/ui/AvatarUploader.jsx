import React from "react";

export default function AvatarUploader({ avatar, setAvatar }) {
return (
    <div className="flex flex-col items-center mb-2">
        <label htmlFor="avatar-upload" className="cursor-pointer group">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center overflow-hidden border-4 border-gray-700 shadow-lg group-hover:scale-105 transition-transform border-silver">
                {avatar ? (
                    <img
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar Preview"
                        className="object-cover w-full h-full"
                    />
                ) : (<svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        />
                    </svg>)}
                {/* Decorative ring */}
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-gray-600 pointer-events-none"></span>
                {/* Silver border overlay */}
                <span className="absolute inset-0 rounded-full border-2 border-[#c0c0c0c5] pointer-events-none"></span>
            </div>
            <input
                id="avatar-upload"
                name="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setAvatar(file);
                }}
            />
        </label>
        <span className="text-xs text-gray-400 mt-1">Upload Avatar</span>
    </div>
);
}
