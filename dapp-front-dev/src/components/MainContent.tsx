import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function MainContent() {
  //1、获取签名和账户信息

  //2、添加分红用户

  //3、查看分红

  //4、领取分红

  return (
    <>
      {/* 标题 */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto border border-white/10 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-left">
            <p className="text-cyan-200 mb-2 flex items-center">
              <span className="font-semibold mr-2">🧾 分红管理表:</span>
            </p>
            {/* 操作表 */}
            <label className="block text-sm font-medium text-cyan-200 mb-2">
              添加单个分红用户
            </label>
            <input
              type="text"
              step=""
              value={""}
              onChange={() => {}}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入数量"
            />

            <label className="block text-sm font-medium text-cyan-200 mb-2">
              添加多个分红用户
            </label>
            <input
              type="text"
              step=""
              value={""}
              onChange={() => {}}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入多个用户"
            />
            <button
              onClick={() => {}}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-emerald-500/50"
            >
              分发分红
            </button>

            <label className="block text-sm font-medium text-cyan-200 mb-2">
              查看分红
            </label>
            <input
              type="text"
              step=""
              value={""}
              onChange={() => {}}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入需要查看的地址"
            />
            <button
              onClick={() => {}}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-emerald-500/50"
            >
              查看分红
            </button>

            <label className="block text-sm font-medium text-cyan-200 mb-2">
              领取分红
            </label>
            <input
              type="text"
              step=""
              value={""}
              onChange={() => {}}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入需要领取的地址"
            />
            <button
              onClick={() => {}}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-emerald-500/50"
            >
              领取分红
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
