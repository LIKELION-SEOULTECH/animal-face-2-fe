import { useState } from 'react'
import CollectionPage from './CollectionPage'

function ResultPage({ gender, resultData }) {
    const [showCollection, setShowCollection] = useState(false)

    if (showCollection) return <CollectionPage />

    const animalEmoji = {
        "고양이상": "🐱",
        "강아지상": "🐶",
        "토끼상": "🐰"
    }

    // 실제 데이터 있으면 쓰고 없으면 가짜 데이터
    const result = resultData ? {
        animal: resultData.result.animalName,
        percentage: Math.round(resultData.result.confidence * 100),
        scores: resultData.result.scores.map(s => ({
            animal: s.animalName,
            percent: Math.round(s.score * 100)
        }))
    } : {
        animal: "여우상",
        percentage: 99,
        scores: [
            { animal: "여우상", percent: 99 },
            { animal: "고양이상", percent: 1 },
            { animal: "강아지상", percent: 0 },
        ]
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <div className="text-orange-500 font-bold text-xl">🐾 동물상 테스트</div>
                <span className="text-gray-500 font-bold">2팀</span>
            </nav>
            <main className="flex flex-col items-center py-10 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">🐾 동물상 결과</h1>
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <div className="text-6xl text-center mb-4">
                        {animalEmoji[result.animal] || "🐾"}
                    </div>
                    <h2 className="text-2xl font-bold text-orange-500 text-center mb-2">
                        {result.animal}
                    </h2>
                    <p className="text-5xl font-bold text-orange-500 text-center mb-6">
                        {result.percentage}%
                    </p>
                    <div className="flex flex-col gap-3">
                        {result.scores.map((item) => (
                            <div key={item.animal} className="flex items-center gap-3">
                                <span className="w-24 text-sm text-gray-600">
                                    {animalEmoji[item.animal]} {item.animal}
                                </span>
                                <div className="flex-1 bg-gray-100 rounded-full h-4">
                                    <div
                                        className="bg-orange-500 h-4 rounded-full"
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-8">{item.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition"
                    >
                        다시 검사하기
                    </button>
                    <button
                        onClick={() => setShowCollection(true)}
                        className="border-2 border-orange-500 text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition"
                    >
                        도감 보기
                    </button>
                </div>
            </main>
        </div>
    )
}

export default ResultPage