import React from 'react'
import ReactHtmlParser from 'html-react-parser' // Import react-html-parser

export default function Preview({ content }: { content: string }) {
  return (
    <div className="preview-container">
      <h1>Preview</h1>
      <div className="preview-content">
        <p>{ReactHtmlParser(content)}</p>
      </div>
    </div>
  )
}
