export default function Preview({ content }: { content: string }) {
  const trimHTMLTags = (htmlContent: string) => {
    const startIndex = htmlContent.indexOf('<')
    const endIndex = htmlContent.lastIndexOf('>')

    if (startIndex !== -1 && endIndex !== -1) {
      const trimmedContent = htmlContent.substring(startIndex, endIndex + 1)
      return trimmedContent
    }

    return htmlContent
  }

  const trimmedContent = trimHTMLTags(content)

  return (
    <div className="preview-container">
      <h1>Preview</h1>
      <div className="preview-content">
        <div dangerouslySetInnerHTML={{ __html: trimmedContent }} />
      </div>
    </div>
  )
}
