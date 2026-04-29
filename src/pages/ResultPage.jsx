import { useState } from 'react'
import CollectionPage from './CollectionPage'

function ResultPage({ gender }) {
    const [showCollection, setShowCollection] = useState(false)

    if (showCollection) return <CollectionPage />
    const fakeResult = {
        animal: "여우상",
        percentage: 99,
        description: "사람을 홀리는 매력을 가진 당신은 섹시한 매력을 가졌다. 우아한 외모에 뛰어난 센스의 성격을 가진 당신은 어딜가도 주목받는 주인공이다.",
        celebrities: ["태연(SNSD)", "사쿠라(LE SSERAFIM)", "아이사(BABYMONSTER)"],
        scores: [
            { animal: "🦊 여우상", percent: 99 },
            { animal: "🐱 고양이상", percent: 1 },
            { animal: "🐶 강아지상", percent: 0 },
            { animal: "🐻 곰상", percent: 0 },
        ]
    }

    return (
        <div className="min-h-screen bg-white">

            {/* 상단 네비게이션 */}
            <nav className="flex justify-between items-center px-8 py-4">
                <div className="text-orange-500 font-bold text-xl">🐾 동물상 테스트</div>
                <button className="text-gray-500">동물상이란?</button>
            </nav>

            <main className="flex flex-col items-center py-10 px-4">

                {/* 제목 */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">🐾 동물상 결과</h1>

                {/* 결과 카드 */}
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

                    {/* 동물상 이름 */}
                    <h2 className="text-2xl font-bold text-orange-500 text-center mb-2">
                        {fakeResult.animal}
                    </h2>
                    <p className="text-5xl font-bold text-orange-500 text-center mb-4">
                        {fakeResult.percentage}%
                    </p>
                    <p className="text-gray-600 text-center mb-6">{fakeResult.description}</p>

                    {/* 대표 연예인 */}
                    <p className="text-orange-500 font-bold text-center mb-2">대표 연예인</p>
                    <p className="text-gray-700 text-center mb-6">
                        {fakeResult.celebrities.join(', ')}
                    </p>

                    {/* 막대그래프 */}
                    <div className="flex flex-col gap-3">
                        {fakeResult.scores.map((item) => (
                            <div key={item.animal} className="flex items-center gap-3">
                                <span className="w-24 text-sm text-gray-600">{item.animal}</span>
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

                {/* 버튼들 */}
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
                    <button className="border-2 border-orange-500 text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition">
                        친구들에게 알려주기
                    </button>
                </div>

            </main>
        </div>
    )
}

export default ResultPage