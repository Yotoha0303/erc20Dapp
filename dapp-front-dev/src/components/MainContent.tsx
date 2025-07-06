export default function MainContent(){
    
    return(
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold">分红功能</h3>
            </div>
            <div className="text-center py-8">
                <p className="text-blue-200 text-lg">分红功能正在开发中...</p>
                <div className="mt-4">
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <span className="text-yellow-300">🚧 敬请期待</span>
                    </div>
                </div>
            </div>
        </div>
    );
}