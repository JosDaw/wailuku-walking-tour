import React, { useState, useEffect } from 'react'
import { remark } from 'remark'
import html from 'remark-html'

const MarkdownText = ({ content }) => {
  const [markupPreview, setMarkupPreview] = useState('')

  useEffect(() => {
    const processMarkdown = async () => {
      const processedContent = await remark().use(html).process(content)
      const contentHtml = processedContent.toString()
      setMarkupPreview(contentHtml)
    }

    processMarkdown()
  }, [content])

  return markupPreview ? (
    <div
      dangerouslySetInnerHTML={{ __html: markupPreview }}
      className="prose"
    />
  ) : null
}

export default MarkdownText
