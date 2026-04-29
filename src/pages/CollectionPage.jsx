import { useState } from 'react'

function CollectionPage() {
    const [goHome, setGoHome] = useState(false)

    if (goHome) return <div onClick={() => window.location.reload()}>{window.location.reload()}</div>

    const fakeCollection = [
        { id: 1, animal: "여우상", percentage: 99, date: "2025-04-10" },
        { id: 2, animal: "고양이상", percentage: 78, date: "2025-04-12" },
        { id: 3, animal: "강아지상", percentage: 85, date: "2025-04-15" },
    ]

    const animalEmoji = {
        "여우상": "🦊",
        "고양이상": "🐱",
        "강아지상": "🐶",
        "곰상": "🐻",
    }

    return (
        <div className="min-h-screen bg-white">

            {/* 상단 네비게이션 */}
            <nav className="flex justify-between items-center px-8 py-4">
                <div className="text-orange-500 font-bold text-xl">🐾 동물상 테스트</div>
                <button className="text-gray-500">동물상이란?</button>
            </nav>

            <main className="flex flex-col items-center py-10 px-4">
                {/* 뒤로가기 버튼 */}
                <button
                    onClick={() => window.location.reload()}
                    className="self-start ml-4 mb-4 text-orange-500 font-bold text-lg"
                >
                    ← 처음으로
                </button>

                {/* 제목 */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">🐾 나의 도감</h1>

                {/* 카드 목록 */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {fakeCollection.map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
                            <span className="text-5xl mb-2">{animalEmoji[item.animal]}</span>
                            <p className="font-bold text-gray-800">{item.animal}</p>
                            <p className="text-orange-500 font-bold text-xl">{item.percentage}%</p>
                            <p className="text-gray-400 text-sm mt-1">{item.date}</p>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    )
}

export default CollectionPage