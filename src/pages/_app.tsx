import '../styles/globals.css'
import { useState } from 'react'
import Chat from '../components/Chat'
import Preview from '../components/Preview'

export default function App() {
  const [previewContent, setPreviewContent] = useState('')

  const updatePreviewContent = (content: string) => {
    setPreviewContent(content)
  }
  return (
    <>
      <div className="main">
        <div className="left-div">
          <Chat updatePreview={updatePreviewContent} />
        </div>
        <div className="right-div">
          <Preview content={previewContent} />
        </div>
      </div>
    </>
  )
}
