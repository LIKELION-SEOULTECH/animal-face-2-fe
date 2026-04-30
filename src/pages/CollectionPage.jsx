import { useState, useEffect } from 'react'
import { getClientId } from '../utils/clientId'

function CollectionPage() {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        fetch(`http://3.35.119.62:8080/api/v1/collections?clientId=${getClientId()}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCollection(data.data.items)
                }
            })
            .catch(() => {
                // 서버 없을 때 가짜 데이터
                setCollection([
                    { animalType: "DOG", animalName: "강아지상", bestConfidence: 0.91, count: 2 },
                    { animalType: "CAT", animalName: "고양이상", bestConfidence: 0.82, count: 1 },
                    { animalType: "RABBIT", animalName: "토끼상", bestConfidence: 0, count: 0 },
                ])
            })
    }, [])

    const animalEmoji = {
        "강아지상": "🐶",
        "고양이상": "🐱",
        "토끼상": "🐰",
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <div className="text-orange-500 font-bold text-xl">🐾 동물상 테스트</div>
                <span className="text-gray-500 font-bold">2팀</span>
            </nav>
            <main className="flex flex-col items-center py-10 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">🐾 나의 도감</h1>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {collection.map((item) => (
                        <div
                            key={item.animalType}
                            className={`bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center ${item.count === 0 ? 'opacity-40' : ''}`}
                        >
                            <span className="text-5xl mb-2">{animalEmoji[item.animalName] || "🐾"}</span>
                            <p className="font-bold text-gray-800">{item.animalName}</p>
                            <p className="text-orange-500 font-bold text-xl">
                                {item.count === 0 ? '미획득' : `${Math.round(item.bestConfidence * 100)}%`}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                {item.count === 0 ? '?' : `${item.count}회 분석`}
                            </p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 text-orange-500 font-bold text-lg"
                >
                    ← 처음으로
                </button>
            </main>
        </div>
    )
}

export default CollectionPage