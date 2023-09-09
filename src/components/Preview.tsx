import { htmlElementTags } from '@/types/htmlTags'

export default function Preview({ content }: { content: string }) {
  const renderSpecificElements = (
    htmlContent: string,
    elementTags: string[]
  ) => {
    let buttonRendered = false
    const elementsToRender = elementTags
      .map((tag) => {
        if (buttonRendered) {
          return null
        }

        const startIndex = htmlContent.indexOf(`<${tag}`)
        const endIndex = htmlContent.lastIndexOf(`</${tag}>`)

        if (startIndex !== -1 && endIndex !== -1) {
          const trimmedContent = htmlContent.substring(
            startIndex,
            endIndex + tag.length + 3
          )

          if (tag === 'button') {
            buttonRendered = true
          }

          return (
            <div
              key={tag}
              dangerouslySetInnerHTML={{ __html: trimmedContent }}
            />
          )
        }

        return null
      })
      .filter((element) => element !== null)

    return elementsToRender
  }

  return (
    <div className="preview-container">
      <h1>Preview</h1>
      <div className="preview-content">
        {renderSpecificElements(content, htmlElementTags)}
      </div>
    </div>
  )
}
