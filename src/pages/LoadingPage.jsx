import { useEffect } from 'react'

function LoadingPage({ onFinish }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish()
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-24 h-24 border-8 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-8"></div>
            <p className="text-xl font-bold text-gray-700 mb-2">당신의 동물상을 분석중...</p>
            <p className="text-gray-400">얼굴을 확인하는 중...</p>
        </div>
    )
}

export default LoadingPage