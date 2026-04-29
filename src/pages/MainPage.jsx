import { useState, useRef } from 'react'
import LoadingPage from './LoadingPage'
import ResultPage from './ResultPage'
import { getClientId } from '../utils/clientId'

function MainPage() {
    const [gender, setGender] = useState('여자')
    const fileInputRef = useRef(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [resultData, setResultData] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewImage(url)
        }
    }

    const handleAnalyze = async () => {
        if (!previewImage) {
            alert('사진을 먼저 선택해주세요!')
            return
        }
        setIsLoading(true)
        const formData = new FormData()
        formData.append('image', fileInputRef.current.files[0])
        formData.append('clientId', getClientId())
        try {
            const response = await fetch('http://localhost:8080/api/v1/analyses', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            if (data.success) {
                setResultData(data.data)
                setIsLoading(false)
                setShowResult(true)
            } else {
                setIsLoading(false)
                switch (data.code) {
                    case 'FACE_NOT_DETECTED':
                        alert('얼굴을 찾을 수 없어요! 얼굴이 잘 보이는 사진을 올려주세요.')
                        break
                    case 'INVALID_IMAGE_FILE':
                        alert('JPG, PNG, WEBP 형식만 가능해요.')
                        break
                    case 'IMAGE_TOO_LARGE':
                        alert('이미지 용량이 너무 커요! 더 작은 사진을 올려주세요.')
                        break
                    case 'AI_SERVER_ERROR':
                        alert('AI 서버에 문제가 생겼어요. 잠시 후 다시 시도해주세요.')
                        break
                    default:
                        alert(data.message)
                }
            }
        } catch (error) {
            alert('서버 연결에 실패했습니다.')
            setIsLoading(false)
        }
    }

    if (showResult) return <ResultPage gender={gender} resultData={resultData} />
    if (isLoading) return <LoadingPage onFinish={() => {
        setIsLoading(false)
        setShowResult(true)
    }} />

    return (
        <div className="min-h-screen bg-white">
            <nav className="flex justify-between items-center px-8 py-4">
                <div className="text-orange-500 font-bold text-xl">🐾 동물상 테스트</div>
                <button className="text-gray-500">동물상이란?</button>
            </nav>
            <main className="flex flex-col items-center py-10">
                <h1 className="text-4xl font-bold text-orange-500 mb-2">동물상 테스트</h1>
                <p className="text-gray-500 mb-6">얼굴로 보는 인공지능 동물상 테스트</p>
                <div className="flex gap-4 mb-8 text-sm text-gray-600">
                    <span>🐾 무료</span>
                    <span>🔒 개인정보 안전</span>
                    <span>⚡ 빠른 분석</span>
                </div>
                <div className="flex gap-2 mb-8 bg-gray-100 rounded-full p-1">
                    <button
                        onClick={() => setGender('여자')}
                        className={`px-6 py-2 rounded-full font-bold transition ${gender === '여자' ? 'bg-orange-500 text-white' : 'text-gray-500'}`}
                    >여자</button>
                    <button
                        onClick={() => setGender('남자')}
                        className={`px-6 py-2 rounded-full font-bold transition ${gender === '남자' ? 'bg-orange-500 text-white' : 'text-gray-500'}`}
                    >남자</button>
                </div>
                <div
                    onClick={() => fileInputRef.current.click()}
                    className="border-2 border-dashed border-orange-300 rounded-2xl w-80 h-60 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50"
                >
                    {previewImage ? (
                        <img src={previewImage} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                        <>
                            <div className="text-5xl mb-4">📷</div>
                            <p className="font-bold text-gray-700">얼굴 사진을 선택하세요!</p>
                            <p className="text-sm text-gray-400 mt-1">드래그 & 드롭 또는 클릭</p>
                        </>
                    )}
                </div>
                <button
                    onClick={handleAnalyze}
                    className="mt-6 bg-orange-500 text-white font-bold px-16 py-4 rounded-full text-lg hover:bg-orange-600 transition"
                >
                    분석 시작하기
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </main>
        </div>
    )
}

export default MainPage