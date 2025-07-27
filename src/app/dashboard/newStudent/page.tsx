"use client";
import React from "react";

export default function NewStudentPage() {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-gray-500 text-sm mb-1">School / Adding Student</div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Mukunzi Ndahiro <br /> James
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
            Cancel
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow">
            Save
          </button>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-semibold mb-6">Basic info</h2>
            {/* Name */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Mukunzi Ndahiro James"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Description */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <div className="flex items-center gap-2 mb-2">
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>Normal text</option>
                  <option>Heading</option>
                </select>
                <button className="px-2 py-1 text-gray-500 hover:text-gray-700 text-lg">L</button>
                <button className="px-2 py-1 text-gray-500 hover:text-gray-700 text-lg">C</button>
                <button className="px-2 py-1 text-gray-500 hover:text-gray-700 text-lg">R</button>
                <button className="px-2 py-1 text-gray-500 hover:text-gray-700 font-bold">B</button>
                <button className="px-2 py-1 text-gray-500 hover:text-gray-700 italic">I</button>
              </div>
              <textarea
                rows={3}
                placeholder="Passionate about becoming an engineer. Raised by a single mother and currently at risk of dropping out due to school fees."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="text-xs text-gray-400 mt-1">50 character Left</div>
            </div>
            {/* Profile Picture */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Profile picture</label>
              <div className="w-48 h-48 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700 font-medium cursor-pointer">
                + Add a profile of student
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-xl font-semibold mb-6">Documents</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-2xl">🪪</span>
                  <span className="font-medium">Student Card</span>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow">
                  Upload
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-2xl">📄</span>
                  <span className="font-medium">Discipline report</span>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow">
                  Upload
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-2xl">📚</span>
                  <span className="font-medium">Academic Report</span>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Location Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <label className="block text-gray-700 font-medium mb-2">District</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Kicukiro</option>
              <option>Gasabo</option>
              <option>Nyarugenge</option>
            </select>
          </div>
          {/* More Info Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">More Info</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">School</label>
              <input
                type="text"
                placeholder="Enter school name here"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Age</label>
              <input
                type="number"
                placeholder="Enter age here"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Choose gender here</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Grade</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Choose grade here</option>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Needs Tags</label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Tuition</span>
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Uniform</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Books</span>
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">Exam Fees</span>
              </div>
            </div>
          </div>
          {/* Testimonials Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Testimonials</h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                <span>F</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Fred Kayiranga</div>
                <div className="text-gray-500 text-sm mb-1">Principal</div>
                <div className="text-gray-700 text-sm">
                  Maria is one of the brightest students I’ve taught — always engaged, always curious.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}